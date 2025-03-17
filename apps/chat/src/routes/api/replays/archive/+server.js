import { error } from "@sveltejs/kit";
import db from "$lib/server/database";

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
  const session = cookies.get("session");

  if (!session) {
    throw error(401, "Invalid session");
  }

  let replays = [];
  try {
    const res = await db.query(
      `
        SELECT *
        FROM replays
        WHERE account = $1::uuid
        AND archived_at IS NOT NULL
        ORDER BY id DESC
      `,
      [session],
    );

    replays =
      res.rows?.map(({ id, prompt, url }) => ({ id, prompt, url })) ?? [];
  } catch (err) {
    console.error("Error querying database: ", err);
    throw error(500, "Error loading replays");
  }

  return new Response(JSON.stringify({ replays }));
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ cookies, request }) {
  const session = cookies.get("session");

  if (!session) {
    throw error(401, "Invalid session");
  }

  // TODO: zod this shit
  const body = await request.json();

  try {
    await db.query(
      `
        UPDATE replays
        SET archived_at = NOW()
        WHERE id = ANY($1::uuid[])
      `,
      [body],
    );
  } catch (err) {
    console.error("Error querying database: ", err);
    throw error(500, "Error archiving replays");
  }

  return new Response();
}

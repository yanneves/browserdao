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

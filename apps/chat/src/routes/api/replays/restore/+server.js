import { error } from "@sveltejs/kit";
import database from "$lib/server/database";

/** @type {import('./$types').RequestHandler} */
export async function PUT({ cookies, request }) {
  const session = cookies.get("session");

  if (!session) {
    throw error(401, "Invalid session");
  }

  // TODO: zod this shit
  const body = await request.json();

  try {
    const sql = database();

    await sql`
      UPDATE replays
      SET archived_at = NULL
      WHERE id = ANY(${body})
    `;
  } catch (err) {
    console.error("Error querying database: ", err);
    throw error(500, "Error archiving replays");
  }

  return new Response();
}

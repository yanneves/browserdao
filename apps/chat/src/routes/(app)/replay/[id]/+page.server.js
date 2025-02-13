import { error } from "@sveltejs/kit";
import db from "$lib/server/database";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, cookies }) => {
  const { id } = params;

  const session = cookies.get("session");

  if (!session) {
    throw error(401, "Invalid session");
  }

  let replay = null;
  try {
    const res = await db.query(
      `
        SELECT *
        FROM replays
        WHERE account = $1::uuid
        AND id = $2::uuid
        ORDER BY id DESC
        LIMIT 1;
      `,
      [session, id],
    );

    replay = res.rows?.map(({ id, prompt, url }) => ({ id, prompt, url }))[0];
  } catch (err) {
    console.error("Error querying database: ", err);
    throw error(500, "Error loading replay");
  }

  return { replay };
};

import { error, redirect } from "@sveltejs/kit";
import database from "$lib/server/database";
import { v7 as uuidv7 } from "uuid";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, cookies }) => {
  const { key } = params;

  // Check invite key is in expected format
  if (!/^\w+-\w+-\w+$/.test(key)) {
    console.warn("Invite queried with invalid key: ", key);
    throw redirect(307, "/invite/invalid");
  }

  // Connect database and begin transaction
  const sql = database();

  const account = await sql.begin(async (sql) => {
    let data;
    try {
      data = await sql`
        SELECT id, account
        FROM invites
        WHERE id = ${key}
        FOR UPDATE;
      `;
    } catch (err) {
      console.error("Error querying database: ", err);
      throw error(500, "Error locating invite");
    }

    const [invite] = data;

    if (!invite) {
      console.warn("Invite queried with unregistered key: ", key);
      throw redirect(307, "/invite/invalid");
    }

    // If no account already exists, create a new one
    if (invite.account === null) {
      const id = uuidv7();
      invite.account = id;

      try {
        await sql`
          INSERT INTO accounts (id, balance)
          VALUES (${id}, 100);
        `;

        await sql`
          UPDATE invites
          SET account = ${id}
          WHERE id = ${key} AND account IS NULL;
        `;
      } catch (err) {
        console.error("Error querying database: ", err);
        throw error(500, "Error processing invite");
      }
    }

    return invite.account;
  });

  cookies.set("session", account, { path: "/" });
  throw redirect(307, "/");
};

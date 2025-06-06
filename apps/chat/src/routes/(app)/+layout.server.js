import { redirect } from "@sveltejs/kit";
import database from "$lib/server/database";

export const load = async ({ cookies }) => {
  const session = cookies.get("session");

  if (!session) {
    console.warn("Encountered invalid session");
    throw redirect(307, "/invite/invalid");
  }

  let balance = 0;
  try {
    const sql = database();
    const data = await sql`
      SELECT balance
      FROM accounts
      WHERE id = ${session};
    `;

    const [account] = data;
    balance = account.balance;
  } catch (err) {
    console.error("Non-fatal error querying account balance: ", err);
  }

  return { session, balance };
};

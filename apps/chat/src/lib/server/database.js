import { DATABASE_URL } from "$env/static/private";
import pg from "pg";

export default new pg.Pool({ connectionString: DATABASE_URL });

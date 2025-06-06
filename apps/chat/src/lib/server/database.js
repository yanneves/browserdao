import { DATABASE_URL } from "$env/static/private";
import postgres from "postgres";

export default () => postgres(DATABASE_URL, { max: 5, fetch_types: false });

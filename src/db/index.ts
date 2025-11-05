import { config } from "dotenv";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { account, session, user, verification } from "./schema/auth";

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});
export const db = drizzle(pool, {
  schema: { user, session, account, verification },
});

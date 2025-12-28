import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { account, session, user, verification } from "./schema/auth";
import { todo } from "./schema/todos";

config();

const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(client, {
  schema: { user, session, account, verification, todo },
});

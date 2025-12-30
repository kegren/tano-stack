import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { account, rateLimit, session, user, verification } from "@/db/schema/auth";
import { todo } from "@/db/schema/todos";
import { env } from "./env";

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
  schema: { user, session, account, verification, rateLimit, todo },
});

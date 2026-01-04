import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  account,
  rateLimit,
  session,
  user,
  verification,
} from "@/db/schema/auth";
import { todo } from "@/db/schema/todos";
import { env } from "@/lib/server/env";

const client = postgres(env.DATABASE_URL, {
  max: 10, // Maximum connections
  idle_timeout: 20, // Seconds before idle connection is closed
  connect_timeout: 10, // Connection timeout in seconds
  prepare: false, // Disable prepared statements for serverless
});

export const db = drizzle(client, {
  schema: { user, session, account, verification, rateLimit, todo },
});

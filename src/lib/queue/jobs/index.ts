import type { PgBoss } from "pg-boss";
import { registerAuthJobs } from "./auth/send-verification-email.worker";

export async function registerAllJobs(queue: PgBoss) {
  await registerAuthJobs(queue);
}

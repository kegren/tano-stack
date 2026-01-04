import type { PgBoss } from "pg-boss";
import { registerEmailJobs } from "@/features/jobs/definitions/email.job";

export const registerJobs = async (boss: PgBoss) => {
  await registerEmailJobs(boss);
};

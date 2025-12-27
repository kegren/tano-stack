import type { PgBoss } from "pg-boss";
import { registerExampleJobs } from "./example";

export const registerJobs = async (boss: PgBoss) => {
  await registerExampleJobs(boss);  
};

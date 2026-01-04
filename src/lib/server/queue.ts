import { PgBoss } from "pg-boss";
import { registerJobs } from "@/features/jobs/register";

let boss: PgBoss | null = null;

async function createQueue(databaseUrl: string) {
  boss = new PgBoss(databaseUrl);

  boss.on("error", (error) => {
    // Wire up to your error tracking system here
    console.error(error);
  });

  await boss.start();

  await registerJobs(boss);

  console.log("[pg-boss] Queue started");
  return boss;
}

export async function initQueue() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!boss) {
    boss = await createQueue(process.env.DATABASE_URL as string);
  }

  return boss;
}

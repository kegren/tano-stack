import { config } from "dotenv";
import { PgBoss } from "pg-boss";
import { registerAllJobs } from "./jobs";

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

let boss: PgBoss | null = null;

async function createQueue() {
  boss = new PgBoss(process.env.DATABASE_URL as string);

  boss.on("error", (error) => {
    // Wire up to your error tracking system here
    console.error(error);
  });

  await boss.start();

  await registerAllJobs(boss);

  console.log("[pg-boss] Queue started");
  return boss;
}

export async function initQueue() {
  if (!boss) {
    boss = await createQueue();
  }

  return boss;
}

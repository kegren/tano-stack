import { PgBoss } from "pg-boss";
import { registerAllJobs } from "./jobs";

type InitQueueOptions = {
  databaseUrl: string;
};

let boss: PgBoss | null = null;

async function createQueue(databaseUrl: string) {
  boss = new PgBoss(databaseUrl);

  boss.on("error", (error) => {
    // Wire up to your error tracking system here
    console.error(error);
  });

  await boss.start();

  await registerAllJobs(boss);

  console.log("[pg-boss] Queue started");
  return boss;
}

export async function initQueue(options: InitQueueOptions) {
  if (!boss) {
    boss = await createQueue(options.databaseUrl);
  }

  return boss;
}

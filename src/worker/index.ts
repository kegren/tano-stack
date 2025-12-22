import { getQueue } from "@/lib/queue";
import { registerQueueJobs } from "@/lib/queue/jobs";

export async function startQueueWorker() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const boss = await getQueue({
    databaseUrl: process.env.DATABASE_URL as string,
  });

  await registerQueueJobs(boss);

  console.log("[pg-boss] Queue worker started");
}

startQueueWorker().catch((error) => {
  console.error("[pg-boss] Error starting queue worker", error);
  process.exit(1);
});

import { initQueue } from "@/lib/queue";
import { registerAllJobs } from "@/lib/queue/jobs";
import "dotenv/config"

type StartQueueWorkerOptions = {
  databaseUrl: string;
};  

export async function startQueueWorker(options: StartQueueWorkerOptions) {
  const boss = await initQueue({ databaseUrl: options.databaseUrl });

  await registerAllJobs(boss);
  console.log("[pg-boss] Queue worker started");
}

startQueueWorker({ databaseUrl: process.env.DATABASE_URL as string }).catch((error) => {
  console.error("[pg-boss] Error starting queue worker", error);
  process.exit(1);
});

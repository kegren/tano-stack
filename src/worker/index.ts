import { initQueue } from "@/lib/queue";
import "dotenv/config";

export async function startQueueWorker() {
  await initQueue();
  console.log("[pg-boss] Queue worker started");
}

startQueueWorker().catch((error) => {
  console.error("[pg-boss] Error starting queue worker", error);
  process.exit(1);
});

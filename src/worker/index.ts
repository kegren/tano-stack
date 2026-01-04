import { initQueueWorker, shutdownQueue } from "@/lib/server/queue";

async function startWorker() {
  await initQueueWorker();
  console.log("[pg-boss] Queue worker started and listening for jobs");
}

// Graceful shutdown handlers
process.on("SIGTERM", async () => {
  console.log("[pg-boss] Received SIGTERM, shutting down...");
  await shutdownQueue();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("[pg-boss] Received SIGINT, shutting down...");
  await shutdownQueue();
  process.exit(0);
});

startWorker().catch((error) => {
  console.error("[pg-boss] Error starting queue worker:", error);
  process.exit(1);
});

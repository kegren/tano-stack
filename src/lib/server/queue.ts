import { PgBoss } from "pg-boss";
import { registerJobs } from "@/features/jobs/register";

let producerClient: PgBoss | null = null;
let workerClient: PgBoss | null = null;

function getDatabaseUrl(): string {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return process.env.DATABASE_URL;
}

/**
 * Get a queue client for enqueueing jobs (producer mode).
 * This is lightweight - it only connects to pg-boss without registering handlers.
 * Safe to use in the main app process.
 */
export async function getQueueClient(): Promise<PgBoss> {
  if (producerClient) {
    return producerClient;
  }

  producerClient = new PgBoss(getDatabaseUrl());

  producerClient.on("error", (error) => {
    console.error("[pg-boss] Producer client error:", error);
  });

  await producerClient.start();

  console.log("[pg-boss] Producer client connected");
  return producerClient;
}

/**
 * Initialize the queue worker (worker mode).
 * This connects to pg-boss AND registers all job handlers.
 * Should only be called from the dedicated worker process.
 */
export async function initQueueWorker(): Promise<PgBoss> {
  if (workerClient) {
    return workerClient;
  }

  workerClient = new PgBoss(getDatabaseUrl());

  workerClient.on("error", (error) => {
    console.error("[pg-boss] Worker error:", error);
  });

  await workerClient.start();
  await registerJobs(workerClient);

  console.log("[pg-boss] Worker initialized with job handlers");
  return workerClient;
}

/**
 * Gracefully shutdown queue connections.
 * Call this on process termination.
 */
export async function shutdownQueue(): Promise<void> {
  const shutdownPromises: Promise<void>[] = [];

  if (producerClient) {
    shutdownPromises.push(producerClient.stop());
    producerClient = null;
  }

  if (workerClient) {
    shutdownPromises.push(workerClient.stop());
    workerClient = null;
  }

  await Promise.all(shutdownPromises);
  console.log("[pg-boss] Queue connections closed");
}

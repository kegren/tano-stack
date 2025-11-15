// Server entry point for TanStack Start
// This is where process-level infrastructure (like queues, DB, logging) is initialized.

import handler from "@tanstack/react-start/server-entry";
import { initQueue } from "./lib/queue";

// TODO: Import your queue initialization function once it's implemented.
// Example:
// import { initQueue } from "@/lib/queue";

// Initialize the queue once at process start.
// This should set up PgBoss, register workers, and start processing jobs.
// Make sure `initQueue` is idempotent and safe to call during server startup/reloads.
// void initQueue();

console.log("Server entry point");

initQueue().catch((error) => {
  console.error("Error initializing queue", error);
  process.exit(1);
});

const server = {
  // Nitro expects `fetch` to be either sync or async; TanStack's handler already
  // returns `Response | Promise<Response>`, so we just forward it through.
  fetch(request: Request) {
    // Delegate all incoming requests to TanStack Start's default server handler.
    return handler.fetch(request);
  },
};

export default server;

// Server entry point for TanStack Start
// This is where process-level infrastructure (like queues, DB, logging) is initialized.

import handler from "@tanstack/react-start/server-entry";
import { initQueue } from "./lib/queue";

// Initialize the queue once at process start.
initQueue().catch((error) => {
  // @todo: use structured logging
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

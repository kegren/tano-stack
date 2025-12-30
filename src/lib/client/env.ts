import { z } from "zod";

// console.log(import.meta.env);

export const env = z
  .object({
    VITE_TURNSTILE_SITE_KEY: z.string(),
    VITE_NODE_ENV: z.enum(["development", "production"]).default("development"),
  })
  .parse(import.meta.env);

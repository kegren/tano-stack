import { UseSend } from "usesend-js";
import { env } from "@/lib/server/env";

export const useSend = new UseSend(env.USESEND_API_KEY, env.USESEND_BASE_URL);

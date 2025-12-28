import { UseSend } from "usesend-js";

export const useSend = new UseSend(process.env.USESEND_API_KEY as string);

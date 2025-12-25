import { initQueue } from "@/lib/queue";
import {
  AUTH_JOBS,
  type SendVerificationEmailPayload,
} from "./send-verification-email.worker";
import "dotenv/config";

export async function enqueueSendVerificationEmail(
  payload: SendVerificationEmailPayload
) {
  const boss = await initQueue({ databaseUrl: process.env.DATABASE_URL as string });
  await boss.send(AUTH_JOBS.SEND_VERIFICATION_EMAIL, payload);
}

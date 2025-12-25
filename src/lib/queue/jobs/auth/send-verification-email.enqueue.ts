import { initQueue } from "@/lib/queue";
import {
  AUTH_JOBS,
  type SendVerificationEmailPayload,
} from "./send-verification-email.worker";

export async function enqueueSendVerificationEmail(
  payload: SendVerificationEmailPayload
) {
  const boss = await initQueue();
  await boss.send(AUTH_JOBS.SEND_VERIFICATION_EMAIL, payload);
}

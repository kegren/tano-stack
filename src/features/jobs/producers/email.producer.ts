import {
  SEND_VERIFICATION_EMAIL,
  type SendVerificationEmailPayload,
} from "@/features/jobs/definitions/email.job";
import { getQueueClient } from "@/lib/server/queue";

export async function enqueueSendVerificationEmail(
  payload: SendVerificationEmailPayload
) {
  const client = await getQueueClient();

  await client.send(SEND_VERIFICATION_EMAIL, payload, {
    priority: 1, // Higher priority for verification emails
  });
}

import type { PgBoss } from "pg-boss";
import { z } from "zod";
import VerifyEmail from "@/components/emails/verify-email";
import { sendEmail } from "@/lib/email/send-email";

export const SEND_VERIFICATION_EMAIL = "email.send-verification";

export const SendVerificationEmailPayload = z.object({
  userId: z.string(),
  email: z.email(),
  name: z.string(),
  verifyUrl: z.url(),
});

export type SendVerificationEmailPayload = z.infer<
  typeof SendVerificationEmailPayload
>;

export async function registerEmailJobs(boss: PgBoss) {
  await boss.createQueue(SEND_VERIFICATION_EMAIL, {
    retryLimit: 3,
    retryDelay: 60, // 1 minute between retries
    retryBackoff: true, // Exponential backoff
    expireInSeconds: 3600, // Job expires after 1 hour
  });

  await boss.work<SendVerificationEmailPayload>(
    SEND_VERIFICATION_EMAIL,
    async ([job]) => {
      const payload = SendVerificationEmailPayload.parse(job.data);

      await sendEmail({
        to: payload.email,
        subject: "Verify your email",
        template: (
          <VerifyEmail name={payload.name} verifyUrl={payload.verifyUrl} />
        ),
      });

      return { sent: true, timestamp: new Date().toISOString() };
    }
  );
}

export async function enqueueSendVerificationEmail(
  boss: PgBoss,
  payload: SendVerificationEmailPayload
) {
  await boss.send(SEND_VERIFICATION_EMAIL, payload, {
    priority: 1, // Higher priority for verification emails
  });
}

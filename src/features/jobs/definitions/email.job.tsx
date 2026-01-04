import type { PgBoss } from "pg-boss";
import { z } from "zod";
import VerifyEmail from "@/components/emails/verify-email";
import { sendEmail } from "@/lib/email/send-email";

export const SEND_VERIFICATION_EMAIL = "email.send-verification";

export const SendVerificationEmailPayload = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    name: z.string(),
  }),
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

      try {
        await sendEmail({
          to: payload.user.email,
          subject: "Verify your email",
          template: (
            <VerifyEmail
              name={payload.user.name}
              verifyUrl={payload.verifyUrl}
            />
          ),
        });

        return { sent: true, timestamp: new Date().toISOString() };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }
  );
}

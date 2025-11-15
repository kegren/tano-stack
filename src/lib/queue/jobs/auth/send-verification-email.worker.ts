import type { PgBoss } from "pg-boss";
import { Resend } from "resend";
import VerifyEmail from "@/components/emails/verify-email";

export const AUTH_JOBS = {
  SEND_VERIFICATION_EMAIL: "auth.sendVerificationEmail",
} as const;

export type SendVerificationEmailPayload = {
  user: {
    email: string;
    name: string;
  };
  url: string;
};

export async function registerAuthJobs(boss: PgBoss) {
  await boss.createQueue(AUTH_JOBS.SEND_VERIFICATION_EMAIL);

  await boss.work<SendVerificationEmailPayload>(
    AUTH_JOBS.SEND_VERIFICATION_EMAIL,
    async ([job]) => {
      if (!job.data) {
        throw new Error("Missing job data");
      }

      const { user, url } = job.data;
      const resend = new Resend(process.env.RESEND_API_KEY);

      // TODO: log start/end as needed

      const { data, error } = await resend.emails.send({
        from: "kenny@email.humpyfun.com",
        to: user.email,
        subject: "Verify your email",
        react: VerifyEmail({ name: user.name, verifyUrl: url }),
      });

      if (error) {
        // TODO: structured logging
        throw new Error(error.message);
      }

      // Optionally return details / metrics
      return { messageId: data?.id };
    }
  );
}

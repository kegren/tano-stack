import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { Resend } from "resend";
import VerifyEmail from "@/components/emails/verify-email";
import { db } from "@/db";
import { RESEND_FROM_EMAIL } from "../constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("Sending verification email to", user.email);
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: user.email,
        subject: "Verify your email",
        react: VerifyEmail({ name: user.name, verifyUrl: url }),
      });
    },
    sendOnSignUp: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  plugins: [reactStartCookies(), admin()],
});

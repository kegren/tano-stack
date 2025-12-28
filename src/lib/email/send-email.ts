import { render } from "@react-email/components";
import type { ReactElement } from "react";
import { useSend } from "./use-send";

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  template: ReactElement;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  template,
  from,
}: SendEmailOptions) {
  const html = await render(template);

  return useSend.emails.send({
    from: from ?? (process.env.EMAIL_FROM as string) ?? "noreply@yourdomain.com",
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
}

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type VerifyEmailProps = {
  name: string;
  verifyUrl: string;
};

export default function VerifyEmail({ name, verifyUrl }: VerifyEmailProps) {
  return (
    <Html dir="ltr" lang="en">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
            <Section>
              <Text className="mb-[24px] text-center font-bold text-[32px] text-gray-900">
                Verify Your Email Address
              </Text>

              <Text className="mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                Hi {name || "there"},
              </Text>

              <Text className="mb-[32px] text-[16px] text-gray-700 leading-[24px]">
                Thank you for signing up! To complete your registration and
                secure your account, please verify your email address by
                clicking the button below.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  className="box-border rounded-[8px] bg-blue-600 px-[32px] py-[16px] font-semibold text-[16px] text-white no-underline"
                  href={verifyUrl || "#"}
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="mb-[24px] text-[14px] text-gray-600 leading-[20px]">
                If the button above doesn't work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className="mb-[32px] break-all text-[14px] text-blue-600">
                {verifyUrl || `${SITE_URL}/verify?token=abc123`}
              </Text>

              <Hr className="my-[32px] border-gray-200" />

              <Text className="mb-[16px] text-[14px] text-gray-600 leading-[20px]">
                This verification link will expire in 24 hours for security
                reasons. If you didn't create an account, you can safely ignore
                this email.
              </Text>

              <Text className="mb-[32px] text-[14px] text-gray-600 leading-[20px]">
                If you have any questions, feel free to contact our support
                team.
              </Text>

              <Hr className="my-[32px] border-gray-200" />

              <Section className="text-center">
                <Text className="m-0 mb-[8px] text-[12px] text-gray-500">
                  © 2025 {SITE_NAME}. All rights reserved.
                </Text>
                <Text className="m-0 mb-[8px] text-[12px] text-gray-500">
                  {SITE_URL}
                </Text>
                <Text className="m-0 text-[12px] text-gray-500">
                  <a className="text-gray-500 no-underline" href="/">
                    Unsubscribe
                  </a>{" "}
                  |
                  <a
                    className="ml-[8px] text-gray-500 no-underline"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

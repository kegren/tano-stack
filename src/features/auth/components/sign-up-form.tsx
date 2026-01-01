import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { authKeys } from "@/features/auth/api/auth-queries";
import {
  type SignUpSchema,
  signUpDefaultValues,
  signUpSchema,
} from "@/features/auth/types/auth-types";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/client/auth-client";
import { env } from "@/lib/client/env";

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileSiteKey = env.VITE_TURNSTILE_SITE_KEY;

  const resetTurnstile = () => {
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: async (data: SignUpSchema) => {
      if (!turnstileToken) {
        toast.error("Performing security check. Please wait...");
        return;
      }

      await authClient.signUp.email(
        {
          ...data,
        },
        {
          headers: { "x-turnstile-token": turnstileToken },
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.session() });

            resetTurnstile();
            navigate({ to: "/dashboard" });

            toast.success("Sign up successful");
          },
          onError: (error) => {
            resetTurnstile();
            toast.error("Sign up failed", {
              description: error.error.message,
            });
          },
        }
      );
    },
  });

  const form = useAppForm({
    defaultValues: signUpDefaultValues,
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: ({ value }) => {
      if (isPending) {
        return;
      }

      signUpMutate(value as SignUpSchema);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField name="name">
          {(field) => <field.TextField icon={<User />} label="Full Name" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField icon={<Mail />} label="Email" />}
        </form.AppField>

        {/* <Field className="grid grid-cols-2 gap-4"> */}
        <form.AppField name="password">
          {(field) => (
            <field.TextField icon={<Lock />} label="Password" type="password" />
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => (
            <field.TextField
              icon={<Lock />}
              label="Confirm Password"
              type="password"
            />
          )}
        </form.AppField>
        {/* </Field> */}
        <form.AppForm>
          <form.SubscribeButton
            isLoading={isPending || turnstileToken === null}
            label="Create Account"
            loadingLabel={
              turnstileToken === null
                ? "Verifying security..."
                : "Creating account..."
            }
          />
        </form.AppForm>
      </FieldGroup>

      {turnstileSiteKey ? (
        <div className="mt-4 flex justify-center">
          <Turnstile
            onError={resetTurnstile}
            onExpire={resetTurnstile}
            onSuccess={setTurnstileToken}
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
          />
        </div>
      ) : null}
    </form>
  );
}

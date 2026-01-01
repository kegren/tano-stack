import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { authKeys } from "@/features/auth/api/auth-queries";
import SocialAuthButtons from "@/features/auth/components/social-auth-buttons";
import {
  type SignInSchema,
  signIndefaultValues,
  signInSchema,
} from "@/features/auth/types/auth-types";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/client/auth-client";
import { env } from "@/lib/client/env";

export default function SignInForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileSiteKey = env.VITE_TURNSTILE_SITE_KEY;

  const resetTurnstile = () => {
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const { mutate: signInMutate, isPending } = useMutation({
    mutationFn: async (data: SignInSchema) => {
      if (!turnstileToken) {
        toast.error("Performing security check. Please wait...");
        return;
      }

      await authClient.signIn.email(
        {
          ...data,
        },
        {
          headers: { "x-turnstile-token": turnstileToken },
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: authKeys.session(),
            });

            resetTurnstile();
            navigate({ to: "/dashboard" });

            toast.success("Sign in successful");
          },
          onError: (error) => {
            resetTurnstile();
            toast.error("Sign in failed", {
              description: error.error.message,
            });
          },
        }
      );
    },
  });

  const form = useAppForm({
    defaultValues: signIndefaultValues,
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: ({ value }) => {
      if (isPending) {
        return;
      }
      signInMutate(value);
    },
  });

  return (
    <div className="space-y-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField name="email">
            {(field) => <field.TextField icon={<Mail />} label="Email" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.TextField
                icon={<Lock />}
                label="Password"
                type="password"
              />
            )}
          </form.AppField>
          <form.AppForm>
            <form.SubscribeButton
              isLoading={isPending || turnstileToken === null}
              label="Sign In"
              loadingLabel={
                turnstileToken === null
                  ? "Verifying security..."
                  : "Signing in..."
              }
            />
          </form.AppForm>
        </FieldGroup>

        <Turnstile
          onError={resetTurnstile}
          onExpire={resetTurnstile}
          onSuccess={setTurnstileToken}
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
        />
      </form>
      <SocialAuthButtons />
    </div>
  );
}

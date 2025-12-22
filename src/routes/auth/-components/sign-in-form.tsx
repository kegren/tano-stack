import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/features/auth/auth-client";
import { useAppForm } from "@/hooks/form";

const signInSchema = z.object({
  email: z.email("Email must be a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const defaultValues: z.input<typeof signInSchema> = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInMutate, isPending } = useMutation({
    mutationFn: async (data: SignInSchema) => {
      await authClient.signIn.email(
        {
          ...data,
          //callbackURL: "/dashboard", // uncomment this to redirect to dashboard after sign in with needing to run the query client invalidate queries manually
        },
        {
          onSuccess: () => {
            console.log("sign in successful");
            // manually remove query data to clear the cache and refetch
            queryClient.removeQueries({
              queryKey: ["user"],
            });
            navigate({ to: "/dashboard" });
            toast.success("Sign in successful");
          },
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              toast.error("Sign in failed", {
                description: "Please verify your email",
              });
              return;
            }

            toast.error("Sign in failed", {
              description: "Please try again",
            });
          },
        }
      );
    },
  });

  const form = useAppForm({
    defaultValues,
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
            <field.TextField icon={<Lock />} label="Password" type="password" />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubscribeButton
            isLoading={isPending}
            label="Sign In"
            loadingLabel="Signing in..."
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}

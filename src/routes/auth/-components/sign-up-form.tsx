import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/auth-client";

const signUpSchema = z
  .object({
    email: z.email("Email must be a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"), // 8 is a magic number, extract it to a constant
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"), // 8 is a magic number, extract it to a constant
    name: z.string().min(2, "Name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const defaultValues: z.input<typeof signUpSchema.shape> = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: async (data: SignUpSchema) => {
      await authClient.signUp.email(
        {
          ...data,
          callbackURL: "/auth/email-verified",
        },
        {
          onSuccess: () => {
            // manually remove query data to clear the cache and refetch
            queryClient.removeQueries({
              queryKey: ["user"],
            });
            navigate({ to: "/auth/verify-email" });
            toast.success("Sign up successful");
          },
          onError: () => {
            toast.error("Sign up failed", {
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
            isLoading={isPending}
            label="Create Account"
            loadingLabel="Creating account..."
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}

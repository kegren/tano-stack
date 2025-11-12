import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@/features/auth/sign-up/pages";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUp,
});

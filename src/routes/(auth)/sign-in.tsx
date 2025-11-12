import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/features/auth/sign-in/pages'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
});

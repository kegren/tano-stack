import { createFileRoute } from '@tanstack/react-router'
import { VerifyEmail } from '@/features/auth/verify-email/pages'

export const Route = createFileRoute('/(auth)/verify-email')({
  component: VerifyEmail,
})

import { createServerFn } from "@tanstack/react-start";
import { authOrRedirectMiddleware } from "@/features/auth/auth-middleware";

export const getAuthSessionOrRedirect = createServerFn({ method: "GET" })
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ context }) => ({ user: context.user }));
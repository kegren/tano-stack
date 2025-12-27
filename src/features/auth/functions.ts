import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { authOrRedirectMiddleware } from "@/features/auth/auth-middleware";
import { auth } from "./auth";

export const getAuthSessionOrRedirect = createServerFn({ method: "GET" })
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ context }) => ({ user: context.user }));

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });
    return session; // returns { user, session } or null
  }
);

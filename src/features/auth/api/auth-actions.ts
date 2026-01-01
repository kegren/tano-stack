import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/server/auth";
import { authOrRedirectMiddleware } from "@/lib/server/middleware";

export const getAuthSessionOrRedirect = createServerFn({ method: "GET" })
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ context }) => ({ user: context.user }));

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });
    return session;
  }
);

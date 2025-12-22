import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/features/auth/auth";

export const authOrRedirectMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(),
  });

  if (!session) {
    throw redirect({
      to: "/auth/sign-in",
      replace: true,
    });
  }

  return next({ context: { user: session.user } });
});

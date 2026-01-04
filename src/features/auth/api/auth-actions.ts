import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { user } from "@/db/schema/auth";
import { auth } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { authOrRedirectMiddleware } from "@/lib/server/middleware";

export const getAuthSessionOrRedirect = createServerFn({ method: "GET" })
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ context }) => ({ user: context.user }));

export const checkEmailExists = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.email() }))
  .handler(async ({ data }) => {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, data.email),
    });
    return { exists: !!existingUser };
  });

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });
    return session;
  }
);

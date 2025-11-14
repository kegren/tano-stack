import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import type { User } from "@/db/schema/auth";
import type { authClient } from "./auth-client";
import { authQueryOptions } from "./queries";

export async function ensureAuthedUser(
  queryClient: QueryClient
): Promise<User> {
  const user = await queryClient.ensureQueryData({
    ...authQueryOptions(),
    revalidateIfStale: true,
  });

  if (!user) {
    throw redirect({ to: "/auth/sign-in" });
  }

  return user as User;
}

type RequireAuthenticatedOptions = {
  client: typeof authClient;
};

export async function requireAuthenticated({
  client,
}: RequireAuthenticatedOptions) {
  const { data: session } = await client.getSession();

  if (!session) {
    throw redirect({
      to: "/auth/sign-in",
      replace: true,
    });
  }
}

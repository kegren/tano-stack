import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import type { User } from "@/db/schema/auth";
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
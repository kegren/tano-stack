import type { QueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { getSession } from "@/features/auth/api/auth-actions";

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

export const authSessionQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.session(),
    queryFn: () => getSession(),
    staleTime: 60 * 1000, // 60 seconds - client won't refetch if data is fresher
    gcTime: 5 * 60 * 1000, // 5 minutes - keep in cache for background refetches
  });

export async function ensureAuthReturnUser(queryClient: QueryClient) {
  const session = await queryClient.ensureQueryData(authSessionQueryOptions());

  if (!session) {
    throw redirect({
      to: "/auth/sign-in",
      replace: true,
    });
  }

  return session.user;
}

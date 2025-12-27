import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authSessionQueryOptions } from "@/features/auth/queries";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    // ensureQueryData will:
    // 1. Return cached data if fresh (within staleTime)
    // 2. Only fetch from server if stale or missing
    const session = await context.queryClient.ensureQueryData(
      authSessionQueryOptions()
    );

    if (!session) {
      throw redirect({
        to: "/auth/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }

    return { user: session.user };
  },
});

function RouteComponent() {
  return <Outlet />;
}

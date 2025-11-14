import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ensureAuthedUser } from "@/lib/auth/guards";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ context }) => {
    const user = await ensureAuthedUser(context.queryClient);
    return { user };
  },
  component: AppLayout,
  pendingComponent: () => <div>Loading...</div>,
});

function AppLayout() {
  return <Outlet />;
}

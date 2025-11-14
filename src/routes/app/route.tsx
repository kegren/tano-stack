import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuthenticated } from "@/lib/auth/guards";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ context }) => {
    await requireAuthenticated({ client: context.authClient });
  },
  component: AppLayout,
  pendingComponent: () => <div>Loading...</div>,
});

function AppLayout() {
  return <Outlet />;
}

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getAuthSessionOrRedirect } from "@/features/auth/functions";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => await getAuthSessionOrRedirect(),
});

function RouteComponent() {
  return <Outlet />;
}

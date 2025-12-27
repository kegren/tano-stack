import { createFileRoute, rootRouteId } from "@tanstack/react-router";
import { DefaultNotFound } from "@/components/default-not-found";

export const Route = createFileRoute("/$")({
  component: () => <DefaultNotFound isNotFound={true} routeId={rootRouteId} />
});

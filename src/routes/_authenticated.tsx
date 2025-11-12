import { createFileRoute } from "@tanstack/react-router";
import { ensureAuthedUser } from "@/lib/auth/guards";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const user = await ensureAuthedUser(context.queryClient);

    return { user };
  },
});

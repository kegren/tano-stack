import { Chrome, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/client/auth-client";

type Provider = "github" | "google";

export default function SocialAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const signIn = async (provider: Provider) => {
    try {
      setLoadingProvider(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch {
      toast.error("Social sign in failed", {
        description:
          "Make sure the provider is configured (client id/secret) and try again.",
      });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative py-1">
        <Separator />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground text-xs">
          or
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="cursor-pointer"
          disabled={loadingProvider !== null}
          onClick={() => signIn("github")}
          type="button"
          variant="outline"
        >
          <Github className="mr-2 size-4" />
          Continue with GitHub
        </Button>
        <Button
          className="cursor-pointer"
          disabled={loadingProvider !== null}
          onClick={() => signIn("google")}
          type="button"
          variant="outline"
        >
          <Chrome className="mr-2 size-4" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}

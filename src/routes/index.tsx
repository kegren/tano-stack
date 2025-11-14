import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Logo />
        </div>

        {/* Hero Content */}
        <h1 className="mb-6 font-bold text-4xl text-foreground tracking-tight sm:text-6xl">
          Build your next project faster with tano-stack
        </h1>

        <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
          Built with TanStack Start, TanStack Query, Better Auth, Drizzle ORM,
          and modern React ecosystem tools.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link to="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>

        {/* GitHub Link */}
        <p className="mt-8 text-muted-foreground text-sm">
          Open source and free to use.{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="https://github.com/kegren/tano-stack"
            rel="noopener noreferrer"
            target="_blank"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

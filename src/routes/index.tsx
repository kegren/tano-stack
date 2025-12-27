import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6">
      <ThemeToggle />
      <div className="mx-auto w-full max-w-3xl space-y-10 text-center sm:space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        {/* Hero Content */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="font-semibold text-3xl text-foreground sm:text-5xl lg:text-6xl">
            Build modern web apps
            <br className="hidden sm:block" /> faster with tano-stack
          </h1>

          <p className="mx-auto max-w-xl text-muted-foreground text-sm sm:text-base lg:text-lg">
            Minimalist, batteries-included TanStack starter with TypeScript.
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {/* Framework */}
            <Badge variant="default">TanStack Start</Badge>
            <Badge variant="default">TanStack Router</Badge>
            <Badge variant="default">TanStack Query</Badge>
            <Badge variant="default">TanStack Form</Badge>

            {/* Database */}
            <Badge variant="secondary">PostgreSQL</Badge>
            <Badge variant="secondary">postgres.js</Badge>
            <Badge variant="secondary">drizzle-orm</Badge>

            {/* Auth */}
            <Badge variant="secondary">better-auth</Badge>

            {/* UI */}
            <Badge variant="outline">React 19</Badge>
            <Badge variant="outline">React Compiler</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">shadcn/ui</Badge>

            {/* Email */}
            <Badge variant="outline">react-email</Badge>
            <Badge variant="outline">useSend</Badge>

            {/* Queue */}
            <Badge variant="outline">pg-boss</Badge>

            {/* DX */}
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Vite</Badge>
            <Badge variant="outline">Bun</Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Button asChild className="w-full sm:w-auto" size="lg">
            <Link to="/auth/sign-up">Sign Up</Link>
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto"
            size="lg"
            variant="outline"
          >
            <Link to="/auth/sign-in">Sign In</Link>
          </Button>
        </div>

        {/* GitHub Link */}
        <p className="text-muted-foreground text-xs sm:text-sm">
          <a
            className="underline-offset-4 hover:underline"
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

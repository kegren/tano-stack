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
            tano-stack
            <br className="hidden sm:block" /> my go-to web app starter
          </h1>

          <p className="mx-auto max-w-xl text-muted-foreground text-sm sm:text-base lg:text-lg">
            Built so I can stop wiring auth, DB, and jobs from scratch every time I start a new idea.
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
            <Badge variant="default">TanStack DB</Badge>

            {/* Database */}
            <Badge variant="secondary">PostgreSQL</Badge>
            <Badge variant="secondary">postgres.js</Badge>
            <Badge variant="secondary">drizzle-orm</Badge>

            {/* Auth */}
            <Badge variant="secondary">better-auth</Badge>
            <Badge variant="secondary">Cloudflare Turnstile</Badge>

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

        {/* Key Features */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🌓</div>
              <h3 className="font-medium">Dark/Light Mode</h3>
              <p className="text-muted-foreground text-sm">Theme toggle included, no extra setup rabbit hole</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">⚡</div>
              <h3 className="font-medium">Fast UI by Default</h3>
              <p className="text-muted-foreground text-sm">Optimistic updates so the app feels snappy</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🔄</div>
              <h3 className="font-medium">Background Jobs</h3>
              <p className="text-muted-foreground text-sm">Emails and async work handled by a worker process</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🏊</div>
              <h3 className="font-medium">Database Ready</h3>
              <p className="text-muted-foreground text-sm">Postgres + pooling already wired up</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">📊</div>
              <h3 className="font-medium">Type-Safe Database</h3>
              <p className="text-muted-foreground text-sm">Drizzle and TanStack tools keep types honest</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🔐</div>
              <h3 className="font-medium">Auth That Ships</h3>
              <p className="text-muted-foreground text-sm">Email + social auth with the safety bits in place</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">✅</div>
              <h3 className="font-medium">CI Included</h3>
              <p className="text-muted-foreground text-sm">Lint, test, and build checks on pushes and PRs</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🔑</div>
              <h3 className="font-medium">Social Auth</h3>
              <p className="text-muted-foreground text-sm">Google/GitHub sign-in ready when you need it</p>
            </div>
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
            Curious? Peek at the repo
          </a>
        </p>
      </div>
    </div>
  );
}

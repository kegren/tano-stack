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
            A full-stack starter I built after testing different approaches. Practical, type-safe, and not over-engineered.
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
              <p className="text-muted-foreground text-sm">Seamless theme switching with next-themes</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">⚡</div>
              <h3 className="font-medium">Optimistic Updates</h3>
              <p className="text-muted-foreground text-sm">Instant UI feedback with TanStack DB</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🔄</div>
              <h3 className="font-medium">Background Jobs</h3>
              <p className="text-muted-foreground text-sm">Email sending & async tasks with pg-boss</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🏊</div>
              <h3 className="font-medium">Connection Pooling</h3>
              <p className="text-muted-foreground text-sm">Efficient PostgreSQL connection management</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">📊</div>
              <h3 className="font-medium">Type-Safe Database</h3>
              <p className="text-muted-foreground text-sm">Drizzle ORM + TanStack Query for full type safety</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🔐</div>
              <h3 className="font-medium">Secure by Default</h3>
              <p className="text-muted-foreground text-sm">Rate limiting, CAPTCHA, and session security</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">✅</div>
              <h3 className="font-medium">CI/CD Ready</h3>
              <p className="text-muted-foreground text-sm">Automated testing, linting, and build checks</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="text-2xl">🔑</div>
              <h3 className="font-medium">Social Auth</h3>
              <p className="text-muted-foreground text-sm">Email + Google/GitHub sign in ready</p>
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
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

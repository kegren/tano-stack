# 🏝️ tano-stack

My personal full-stack starter I put together after trying out a bunch of different stacks. It's got everything I need for most projects without being overly complicated.

## What's Inside

- **⚡ TanStack Start** — File-based routing, server functions, and SSR that just work
- **🔐 Better Auth** — Rock-solid authentication with email verification and social logins
- **🗃️ Drizzle + PostgreSQL + TanStack DB** — Type-safe queries, effortless migrations, connection pooling
- **📧 React Email + useSend** — Transactional emails that look professional and send reliably
- **🎨 shadcn/ui** — Beautiful, accessible components that feel custom-built
- **⚙️ pg-boss** — Background jobs using your existing Postgres database
- **🛡️ Cloudflare Turnstile** — Bot protection that doesn't annoy real users
- **🌓 Dark/Light Mode** — Seamless theme switching built-in
- **🔧 Bun + Vite** — Development that's actually fast and enjoyable

## CI/CD

[![CI](https://github.com/kegren/tano-stack/actions/workflows/ci.yml/badge.svg)](https://github.com/kegren/tano-stack/actions/workflows/ci.yml)

Automated quality checks run on every commit:
- **Linting** — Code style and logic checks with Ultracite
- **Testing** — Unit tests with Vitest
- **Build** — Production build verification

## Modern Features

- **🎨 Dark/Light Mode** — Theme switching with `next-themes` and CSS variables
- **⚡ Optimistic Updates** — Instant UI feedback with TanStack DB's mutation features
- **🏊 Connection Pooling** — Efficient PostgreSQL connection management with `postgres.js`
- **📊 Type-Safe Everything** — TanStack Query provides additional type safety on top of Drizzle
- **🔄 Background Processing** — Email sending and async tasks with `pg-boss`
- **🛡️ Security First** — Rate limiting, CAPTCHA, CSRF protection, and secure sessions
- **📱 Mobile-First UI** — Responsive design with Tailwind CSS and shadcn/ui
- **🔑 Social Auth** — Email + Google/GitHub sign in with Better Auth
- **🚀 Production Ready** — Built-in error boundaries, loading states, and performance optimizations

## Quick Start

```bash
# Get the code
git clone https://github.com/kegren/tano-stack
cd tano-stack

# Install everything
bun install

# Set up your environment
cp .env.example .env
# Add your database URL, auth secrets, and API keys

# Push schema to database
bun db:push

# Start building
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) and you'll have a full-stack app running with auth, database, and email ready to go.

## Deploy to Railway

This template is designed for Railway with two services: a web app and a background worker.

### Prerequisites
- [Railway account](https://railway.app)
- PostgreSQL database (Railway provides this)

### 1. Database Setup
Create a PostgreSQL database in Railway and copy the `DATABASE_URL`.

### 2. Deploy Web Service
```bash
# Fork this repo and connect to Railway
# Set these environment variables:
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-secret-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
USE_SEND_API_KEY=your-usesend-api-key

# Railway will auto-detect and deploy using:
# Build command: bun run build
# Start command: bun run start
```

### 3. Deploy Background Worker
Create a second service in Railway with the same repo but different start command:

```bash
# In Railway service settings:
# Build command: bun run build
# Start command: bun run worker:start
```

### Architecture
- **Web Service**: Handles HTTP requests, auth, and UI
- **Worker Service**: Processes background jobs (email sending, etc.)
- **Database**: Shared PostgreSQL instance

### Environment Variables
Both services need the same `DATABASE_URL`. The web service needs all auth/API keys, while the worker only needs database access.

Railway's free tier works great for getting started!

## Project Structure

```
src/
├── features/     # Feature modules (auth, todos, etc.)
├── components/   # Shared UI components
├── routes/       # File-based routing with TanStack Router
├── lib/          # Utilities, auth config, email setup
├── db/           # Database schema and migrations
└── worker/       # Background job processing
```

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server + background worker |
| `bun dev:web` | Dev server only (port 3000) |
| `bun dev:worker` | Background worker only |
| `bun build` | Production build |
| `bun serve` | Preview production build |
| `bun start` | Start production server |
| `bun worker:start` | Start background worker |
| `bun test` | Run test suite |
| `bun typecheck` | TypeScript type checking |
| `bun lint` | Code linting |
| `bun lint:fix` | Auto-fix linting issues |
| `bun db:generate` | Generate Drizzle migrations |
| `bun db:migrate` | Run pending migrations |
| `bun db:push` | Push schema changes directly |
| `bun db:pull` | Pull schema from database |
| `bun db:studio` | Open Drizzle Studio GUI |
| `better-auth:generate` | Update auth schema |
| `better-auth:secret` | Generate new auth secret |

## Contributing

Love that you're interested! This started as my personal toolkit, but I'm excited to see how others use and improve it. PRs welcome.

## License

MIT © [kegren](https://github.com/kegren)
## tano-stack

🏝️ An opinionated **TanStack Start** starter that puts the **TanStack** ecosystem – Router, Query, Form, Devtools – front and center, running on **Bun**, **React 19.2**, and **React Compiler 1.0**, with batteries-included auth, queues, emails, and a clean tailwind/shadcn/ui-powered interface.

If you want to go from zero to “email-verified user in a dashboard” in minutes instead of days, this template is for you.

---

### What’s inside

- **Runtime & tooling**: Bun, Vite, Nitro, TypeScript, React Compiler 1.0 (via Babel plugin)
- **Routing & data**: TanStack Start, TanStack Router, TanStack Query, SSR query integration
- **Database**: PostgreSQL + Drizzle ORM + Drizzle Kit
- **Auth**: Better Auth (email + password, required email verification, admin plugin)
- **Queues**: pg-boss + Postgres-backed background jobs
- **Email**: Resend + React email templates
- **UI & styling**: Tailwind CSS v4, shadcn/ui, Radix primitives, Lucide icons
- **Forms & state**: TanStack React Form (with ergonomic hooks & field components)
- **DX**: TanStack Devtools (Router + Query), Vitest, Testing Library, Biome + Ultracite

---

### Quick start

#### 1. Install dependencies

```bash
bun install
```

#### 2. Configure environment

Create a `.env` file in the project root and set:

- **`DATABASE_URL`** – Postgres connection string  
  Example: `postgres://user:password@localhost:5432/tano_stack`
- **`RESEND_API_KEY`** – Resend API key for sending emails
- **`BETTER_AUTH_URL`** – Base URL for Better Auth (e.g. `http://localhost:3000`)

These power Drizzle, Better Auth, pg-boss, and the Resend email worker.

#### 3. Prepare the database

Drizzle is configured in `drizzle.config.ts` and `src/db`:

```bash
# Push schema directly (great for local dev)
bun db:push

# or, generate + run migrations
bun db:generate
bun db:migrate
```

You can inspect your DB with:

```bash
bun db:studio
```

#### 4. Run the dev server

```bash
bun dev
```

This runs the Vite dev server on `http://localhost:3000`.  
All shadcn/ui components are installed in `src/components/ui`, but thanks to Vite’s tree-shaking, **only the components you import are actually bundled**.

---

### Auth, email, and jobs (the fun stuff)

- **Sign up** at `/auth/sign-up`  
  Better Auth handles email + password and requires email verification.
- On successful sign up, a **pg-boss job** is enqueued to send a verification email via Resend.
- The worker in `src/lib/queue/jobs/auth/send-verification-email.worker.ts` sends a React email using the template in `src/components/emails/verify-email.tsx`.
- Users land on `/auth/verify-email` while they check their inbox, and `/auth/email-verified` once they’re confirmed.

Queue setup lives in:

- `src/lib/queue/index.ts` – initializes pg-boss and registers jobs
- `src/lib/queue/jobs` – individual job definitions and workers

The queue is initialized once in `src/server.ts` when the Nitro server starts.

---

### Configuration constants

Core app metadata and email settings are centralized in `src/lib/constants.ts`:

- `SITE_NAME`, `SITE_URL`, and `SITE_DESCRIPTION` are used for things like document titles, metadata, and sharing.
- `RESEND_FROM_EMAIL` controls the `"from"` address for transactional emails sent via Resend.

Update these values to match your app’s branding and domain before going to production.

---

### Routing, forms, and UI

- **Routing**: File-based TanStack Router under `src/routes`, with the root layout in `src/routes/__root.tsx`.
- **Router config**: `src/router.tsx` wires up the router, query client, and SSR query integration.
- **Forms**: `src/hooks/form.ts` exposes a TanStack Form-powered `useAppForm` hook plus opinionated field components (`TextField`, `SelectField`, etc.).
- **UI**: shadcn/ui components live in `src/components/ui` and are used across auth and app pages.

To add another shadcn/ui component:

```bash
bunx --bun shadcn@latest add button
```

Replace `button` with the component name you want. The new component will be generated into `src/components/ui`, ready to import.

---

### Scripts

All commands are Bun-first:

- **`bun dev`** – Start the Vite dev server.
- **`bun build`** – Build the app for production (client + server).
- **`bun serve`** – Preview the production build.
- **`bun start`** – Run the compiled Nitro server from `.output/server/index.mjs`.
- **`bun test`** – Run tests with Vitest.
- **`bun db:generate` / `bun db:migrate` / `bun db:push` / `bun db:pull` / `bun db:studio`** – Drizzle schema + tooling.
- **`bun better-auth:generate`** – Generate Better Auth schema into `src/db/schema/auth.ts`.

---

### Contributing

Contributions are very welcome – whether it’s improving DX, adding features, or polishing the UI.

1. **Fork** the repo and create a new branch.
2. **Set up** your `.env` and Postgres database.
3. **Run** `bun dev` and make your changes.
4. **Add tests** where it makes sense (`bun test`).
5. **Open a PR** with a clear description of what you changed and why.

If you spot something confusing, open an issue – if one person is confused, others probably are too.

---

### License

This template is released under the **MIT License**, a simple and permissive open-source license.

- You can use it in commercial and open-source projects.
- You can modify, fork, and redistribute it.
- You must keep the copyright and license notice.

Add a `LICENSE` file at the project root with the standard MIT text and your name (or organization) and year to make this explicit.
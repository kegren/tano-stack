# tano-stack

My personal starter for building web apps with the stack I actually use.  
Not trying to be everything for everyone, just a solid setup that saves me from redoing the same plumbing every weekend.

## Tech Stack

- TanStack Start (React, SSR, file-based routing)
- Better Auth (email + social login)
- Drizzle ORM + PostgreSQL
- TanStack Query + TanStack DB
- Tailwind CSS v4 + shadcn/ui
- pg-boss (background jobs)
- React Email + useSend
- Bun + Vite

## CI/CD

[![CI](https://github.com/kegren/tano-stack/actions/workflows/ci.yml/badge.svg)](https://github.com/kegren/tano-stack/actions/workflows/ci.yml)

GitHub Actions runs on pushes to `main` and on PRs:

- lint (`bun lint`)
- tests (`bun test`)
- build (`bun run build`)

If something breaks, CI yells first so production does not have to.

## Features

- Auth flows ready to go (email verification + social)
- Type-safe DB setup with Drizzle migrations
- Web + worker split for background processing
- Turnstile support for bot protection
- Dark/light theme toggle
- Production build + test setup out of the box

## Quick Start

```bash
git clone https://github.com/kegren/tano-stack
cd tano-stack
bun install
cp .env.example .env
bun db:push
bun dev
```

Then open `http://localhost:3000`.

## PRs (Welcomed)

If you spot something weird, clunky, or just mildly annoying, PRs are very welcome.  
Small fixes, big improvements, and opinionated tweaks all appreciated.

## License

MIT © [kegren](https://github.com/kegren)
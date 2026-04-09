# Agent notes

Project context for coding agents. For the full skill catalog and paths, run `npx @tanstack/intent@latest list`. For TanStack DB React hooks (`useLiveQuery`, etc.), use `node_modules/@tanstack/react-db/skills/react-db/SKILL.md` alongside `db-core`.

<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.
skills:
  - task: "TanStack Start: Vite plugin, root route shell, server functions, middleware, server routes, execution model, deployment"
    load: "node_modules/@tanstack/start-client-core/skills/start-core/SKILL.md"
  - task: "TanStack Router: route trees, file routing, loaders, data loading, navigation, search params, SSR"
    load: "node_modules/@tanstack/router-core/skills/router-core/SKILL.md"
  - task: "Protected routes, beforeLoad, redirects, auth context, and layout routes (e.g. authenticated areas)"
    load: "node_modules/@tanstack/router-core/skills/router-core/auth-and-guards/SKILL.md"
  - task: "TanStack DB: collections, live queries, optimistic mutations, adapters, and sync"
    load: "node_modules/@tanstack/db/skills/db-core/SKILL.md"
  - task: "Cloudflare Turnstile: widget setup, tokens, and forms"
    load: "node_modules/@marsidev/react-turnstile/skills/basic-setup/SKILL.md"
<!-- intent-skills:end -->

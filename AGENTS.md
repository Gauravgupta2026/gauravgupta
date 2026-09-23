# AGENTS.md

> This file contains project facts only. Global coding, safety, communication,
> and learning-mode rules still apply.

## At a glance

| Area | Choice |
| --- | --- |
| Runtime | Node.js with TypeScript 5 in strict mode |
| Framework | Next.js 16.2.9 App Router with React 19.2.4 |
| Styling | Tailwind CSS v4 through `@tailwindcss/postcss` |
| Motion | Framer Motion 13 with `LazyMotion` and `domAnimation` |
| Analytics | PostHog browser analytics and error tracking |
| Package manager | npm with lockfile version 3 |
| Data | Typed modules under `src/content/`; no database or application API |

Design tokens and generated Tailwind utilities are defined in
`src/app/globals.css`.

## Commands

| Task | Command | Notes |
| --- | --- | --- |
| Clean install | `npm ci` | Uses the committed lockfile |
| Development | `npm run dev` | Defaults to `http://localhost:3000` |
| Production build | `npm run build` | Includes framework type validation |
| Production server | `npm run start` | Requires a completed build |
| Lint | `npm run lint` | Runs ESLint |
| Typecheck | `npx tsc --noEmit` | Standalone TypeScript validation |

There is currently no automated test command or test suite.

Deployment targets Vercel through `vercel.json`. The linked Vercel project,
deployment trigger, and live URL are not documented in the repository.

## Architecture

This is a single Next.js App Router application. Routes and metadata live in
`src/app/`. Reusable page sections and UI primitives live in `src/components/`.
Typed modules in `src/content/` supply the landing page, indexes, articles, and
statically generated detail routes.

Components are server components by default. Add a `"use client"` boundary only
for interactions, animation, browser state, or analytics.

### Directory map

| Path | Responsibility |
| --- | --- |
| `src/app/` | Routes, root layout, metadata, sitemap, robots, and global CSS |
| `src/components/sections/` | Page-scale sections such as navigation, hero, work, story, notes, galleries, and footers |
| `src/components/ui/` | Reusable presentation and interaction primitives |
| `src/components/article/` | Rendering for typed article content blocks |
| `src/content/` | Source-controlled portfolio copy and data; there is no CMS |
| `public/` | Shipped photos, local fonts, icons, and static assets |
| `design-reference/`, `inspo/` | Legacy visual assets; use only when explicitly referenced by `DESIGN_SYSTEM.md` |
| `scripts/analytics-reviewer/` | PostHog signal collection and Linear issue automation using server-side secrets |

### Routes

- `/`
- `/about`
- `/work`
- `/labs`
- `/projects/[slug]`
- `/notes/[slug]`

## Design source of truth

For GPT implementation work, read `DESIGN_SYSTEM.md` before changing visual or
interaction code. It is the authoritative source for typography, color, spacing,
layout, motion, responsive behavior, and accessibility.

If the final landing-page PDF is attached in the active thread, use it as a
visual reference alongside `DESIGN_SYSTEM.md`. Do not infer design decisions from
legacy assets or unrelated project documentation.

## Environments

### Local

Run `npm ci`, then `npm run dev`. Copy `.env.example` to `.env.local` only when
metadata, analytics, or reviewer integrations are needed. The site runs without
PostHog when `NEXT_PUBLIC_POSTHOG_KEY` is unset.

### Staging

No dedicated staging environment or URL is documented in the repository.

### Production

Production is configured for Vercel. Set `NEXT_PUBLIC_SITE_URL` to the canonical
origin so metadata, Open Graph URLs, `robots.txt`, and `sitemap.xml` do not use
the localhost fallback. The production domain is not recorded in the repository.

### Analytics secrets

The following values belong only in `.env.local` or deployment secrets and must
never use the `NEXT_PUBLIC_` prefix:

- `POSTHOG_PERSONAL_API_KEY`
- `POSTHOG_PROJECT_ID`
- `LINEAR_API_KEY`
- `LINEAR_TEAM`

## Known sharp edges

1. **Turbopack root:** `next.config.ts` pins the root to this repository. Removing
   it can make Next.js find a lockfile above the repo and scan most of the home
   folder, causing very slow startup and reloads.
2. **Framer Motion bundle:** the root layout enables `LazyMotion` in strict mode.
   Client motion components must import `m`, not the full `motion` API, unless the
   feature-loading strategy is deliberately changed.
3. **PostHog pageviews:** App Router pageviews are captured manually. Do not also
   enable automatic pageview capture, or hard navigations may be counted twice.

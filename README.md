# Gaurav Gupta — Portfolio

Personal portfolio site: landing page, case studies, notes, and labs.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- next/font
- Framer Motion
- PostHog (analytics, optional)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`. The PostHog
key is optional. The site runs without it.

```bash
npm run lint    # ESLint
npm run build   # production build + typecheck
```

## CI/CD

- **CI:** GitHub Actions (`.github/workflows/ci.yml`) runs `verify` on every pull
  request and on pushes to `main`. It runs `npm run lint` and `npm run build`.
- **CD:** Vercel deploys. Each PR gets a Preview URL. A merge to `main` deploys
  to Production.
- Run `npm run lint && npm run build` locally before you open a PR.

## Structure

- `src/app` — routes (`/`, `/work`, `/labs`, `/notes/[slug]`, `/projects/[slug]`, `/about`)
- `src/components` — shared UI and page sections
- `src/content` — copy and data for projects, notes, and articles

See `CLAUDE.md` for the design system and project conventions.

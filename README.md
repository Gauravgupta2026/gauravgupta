# Gaurav Gupta — Portfolio

Personal portfolio site: landing page, case studies, notes, and labs.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- next/font

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build + typecheck
```

## Structure

- `src/app` — routes (`/`, `/work`, `/labs`, `/notes/[slug]`, `/projects/[slug]`, `/about`)
- `src/components` — shared UI and page sections
- `src/content` — copy and data for projects, notes, and articles

See `CLAUDE.md` for the design system and project conventions.

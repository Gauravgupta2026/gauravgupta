# Portfolio — Gaurav Gupta

Production rebuild of a final design (reference: `design-reference/re-design inspo/*.dc.html`
— `Landing`, `Work`, `Labs`, `Notes`, `Wylde` [project case study template]). Stack:
**Next.js 16 App Router · TypeScript · Tailwind v4 · next/font**. The design is final —
reproduce it faithfully and keep it responsive. Do not redesign.

> **2026-09-03: full redesign.** The design system below replaces the old cream/blue
> system entirely (dark theme, red accent, Inter body font). No About page exists yet
> in the new reference files — the old `/about` page stays as-is until a new design
> for it is supplied.

> Next.js 16 has breaking changes vs. older versions — see `AGENTS.md` and
> `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Stack notes
- Tailwind **v4** — config is CSS-based in `src/app/globals.css` via `@theme`. There is
  no `tailwind.config.js`. Add design tokens as `--color-*` / `--font-*` there; Tailwind
  generates the utilities (`--color-blue` → `bg-blue`, `text-blue`, `border-blue`).
- Fonts loaded with `next/font/google` in `src/app/layout.tsx`, exposed as CSS vars
  `--font-newsreader` / `--font-jetbrains`, mapped to `font-display` / `font-mono`.

## Design System

### Colors (Tailwind tokens)
| Token        | Hex       | Use                                          |
|--------------|-----------|-----------------------------------------------|
| `bg`         | `#0B0B0B` | page background                              |
| `ink`        | `#F3F3F3` | primary text                                 |
| `white`      | `#FFFFFF` | headings / high-emphasis text                |
| `red`        | `#D10000` | **signature** accent — logo mark, links, CTAs |
| `lilac`      | `#BDBBFF` | link hover / secondary accent                |
| `lilac-soft` | `#D6D5FF` | link hover, lighter step                     |
| `soft-ink`   | `#DCDCDC` | secondary headings                           |
| `mute`       | `#8A8A8A` | nav labels, meta text                        |
| `mute-2`     | `#929292` | body copy on dark                            |
| `mute-3`     | `#7C7C7C` | quieter meta                                 |
| `faint`      | `#5C5C5C` | numerals, faint labels                       |
| `border`     | `#1E1E1E` | card borders                                 |
| `border-2`   | `#1C1C1C` | row dividers                                 |
| `divider`    | `#414141` | section rule lines                           |
| `surface`    | `#0D0D0D` | raised card surface on bg (e.g. dropdown menu)|

### Typography
- **Display — Newsreader (serif), weight 300.** Headings only (h1/h2), roman not italic
  this time. Tight tracking `-0.008em`. Utility: `font-display`.
- **Body — Inter.** System-ui fallback. Body copy 16–18px, line-height ~29px on longer text.
- **UI / labels — JetBrains Mono.** Nav, meta, numerals, status tags. Uppercase,
  letter-spacing ~0.06–0.2em. Utility: `font-mono`.
- **Logo mark — Allison (cursive), ~46px, red.** "GG" wordmark, top-left of nav.

### Layout
- Design canvas **1512px**, side padding **230.5px** both sides at that width — scale
  proportionally down to the existing max-content token: max width **1180px**
  (`max-w-shell`), side padding **48px desktop / 22px mobile** (`--side-pad`).
- Mobile breakpoint: **768px** — single column. Hit targets ≥44px.

### Interactions (match reference)
- Nav is `position: fixed`, fades/shifts on scroll direction.
- **WORK** nav item opens a hover dropdown: dark card (`surface` bg, `border` outline,
  16px radius, heavy drop shadow), listing project links.
- Link hover: `mute` → `ink`/`white`, or `lilac` → `lilac-soft` for inline text links.
- Reveal-on-scroll for section headings (`data-reveal` indices in the reference).
- **Respect `prefers-reduced-motion`** — reveals show immediately, transitions off.

## Page structure — 5 templates, 3 build phases
Source files: `design-reference/re-design inspo/{Landing,Work,Labs,Notes,Wylde}.dc.html`.

**Phase 1 — Landing** (`Landing.dc.html`, 623 lines): nav (GG logo · WORK · LABS ·
SAY HELLO), WORK hover dropdown, hero, and sections down the page marked by
`data-reveal="5"` through `data-reveal="12"` — read the file in order, don't assume
old section names carry over.

**Phase 2 — Work + Labs** (`Work.dc.html`, `Labs.dc.html`, + `Wylde.dc.html` as the
project template): `/work` is a numbered list of case studies (num · title · status —
"WRITE-UP IN PROGRESS" or "CASE STUDY"), linking out to project pages. `Wylde.dc.html`
is the full case-study template other projects will reuse. `/labs` is a lighter page,
same nav shell.

**Phase 3 — Notes** (`Notes.dc.html`, 192 lines): standalone, same nav shell.

**About — not in scope yet.** No `About.dc.html` exists in the new reference. Keep the
old `/about` page and its old design-system values (cream/blue) untouched until a new
design file is supplied — do not force it into the dark theme prematurely.

## Routes
- `/` — landing (Phase 1).
- `/work` — case study index (Phase 2).
- `/labs` — experiments/labs page (Phase 2).
- `/projects/[slug]` — case study template, built from `Wylde.dc.html` (Phase 2).
- `/notes/[slug]` — article reader (Phase 3). Content in `src/content/articles.ts`.
- `/about` — **untouched**, old cream/blue design, until new reference is supplied.

## Content / data
- Placeholders for portrait & app screenshots (user swaps real assets) → `public/`.
- Project copy is kept verbatim from the reference (user edits later).
- Notes are data-driven (`src/content/`).

## Workflow
- Build **section by section**; pause for review after each.
- After a section, check the rendered result against the reference image/design.
- `npm run dev` to preview, `npm run build` to typecheck/validate.
- Each phase (Landing / Work+Labs / Notes) is built in its own worktree branched off
  `Gauravgupta2026/re-design`, then merged back into `re-design`, which merges into
  `main` once all phases land.

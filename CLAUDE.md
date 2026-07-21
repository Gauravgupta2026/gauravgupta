# Portfolio — Gaurav Gupta

Production rebuild of a final design (reference: `inspo/Portfolio.dc.html` landing,
`inspo/project.html` case study, `inspo/about.png` about page). Stack: **Next.js 16
App Router · TypeScript · Tailwind v4 · next/font**. The design is final — reproduce it
faithfully and keep it responsive. Do not redesign.

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
| Token        | Hex       | Use                                  |
|--------------|-----------|--------------------------------------|
| `cream`      | `#FAF6EC` | page background                      |
| `ink`        | `#14130F` | primary text                         |
| `blue`       | `#1B16EE` | **signature** electric-blue accent   |
| `blue-deep`  | `#130FB4` | CTA gradient end                     |
| `blue-tint`  | `#F1F0FE` | hover background / soft surfaces      |
| `soft-ink`   | `#6F6B62` | muted body text                      |
| `mute`       | `#9A958A` | quiet labels / meta                  |
| `gold`       | `#E8C24A` | secondary accent ("APM Roles" tag)   |
| `card`       | `#FDFBF6` | raised card surface on cream         |

### Typography
- **Display — Newsreader (serif).** Italic 400 for headings & eyebrows; roman 500 for
  titles (project names, process step titles). Tight tracking `-0.01em` on large heads.
  Utility: `font-display`.
- **UI / body / labels — JetBrains Mono.** Body 11–13px. Labels 9–11px, uppercase,
  letter-spacing 0.18–0.24em. Utility: `font-mono`.

### Layout
- Max content width **1180px** (`max-w-shell`), side padding **48px desktop / 22px mobile**
  (`--side-pad`, applied via the `Shell` container).
- Vertical rhythm between sections: ~120–150px desktop, ~90px mobile.
- Mobile breakpoint: **768px** — everything collapses to single column. Hit targets ≥44px.

### Interactions (match reference)
- Smooth scrolling site-wide (`scroll-behavior:smooth`).
- Section reveal: fade + 28px rise via IntersectionObserver (`<Reveal>` → `.reveal`/
  `.is-visible`, easing `cubic-bezier(.16,.7,.2,1)`, ~0.9s).
- Project center image: scroll-driven `clip-path: inset(...)` wipe reveal bottom→top.
- Row hovers: `blue-tint` background + slide / arrow reveal.
- Notes rows: source icon (Substack / Medium / on-site) fades in on hover.
- Live status dots & "currently exploring": `blink` keyframe pulse (`.animate-blink`).
- **Respect `prefers-reduced-motion`** — reveals show immediately, pulses/animations off.

### Reusable components (`src/components/ui`)
Eyebrow · SignalCard (3 variants: stats / exploring / stack) · ProjectCard · ProcessRow ·
NoteRow · ExperimentRow (status dot) · Button (primary/ghost) · Chip · EditorialLink.

## Page structure (single landing page, `src/app/page.tsx`)
1. Nav — logo left, ABOUT center, WORK right
2. Hero — **DO NOT redesign.** Desktop: photo left + text right, bottom-aligned on one
   floor (blue panel). Mobile: photo top → name → description → tags. "Looking for APM
   Roles" tag is gold; name is Newsreader italic.
3. Meta bar — Socials · BLR · Send an email
4. Projects & Case Study — featured + more cards (same card style); center image wipe.
   Project cards show a tech-stack row with icons from `/public/icons` (`StackItem`
   `{ name, slug? }`; `slug` → `/icons/<slug>.svg`, else a dot).
5. How I Work — process rows.
6. Notes — article rows, source-icon hover reveal. Article data in `src/content`.
7. CTA band (blue gradient) + Footer.

> The "Work, in signals" and Experiments sections were removed. The intro splash
> is documented on the `animate-opening` branch, not here.

## Routes
- `/` — landing (sections above).
- `/about` — rebuilt from `inspo/about.png`.
- `/notes/[slug]` — long-form article reader (block-based body, inline images).
  Content in `src/content/articles.ts`. Prose set in Newsreader for readability.
- `/projects/[slug]` — case study: breadcrumb, offset photo gallery, tech
  stack / stakeholders, statement pull-quote, optional proof bar (demo / Loom /
  eval sheet / feedback), then the framework narrative spine, wide showcase,
  "Next Project" cards, contact band. Content in `src/content/projectDetails.ts`
  — two templates keyed by `kind`: `"ai"` (Real Problem → Before/After → AI
  Workflow → Evaluation → Guardrails → Business) and `"craft"` (swaps the AI
  blocks for a single Process block). Framework source: `case-study-must-have.md`.
  Uses the lighter, rounded `PhotoFrame` treatment, our color tokens, and
  **blue** as the accent (the reference mock used a rust accent — kept on-brand).
- Shared: `ContactBand` (About + project pages). Mobile side padding is **28px**.
- Hero blue panel is `min-h-[82vh]`, content vertically centered on desktop.

## Content / data
- Placeholders for portrait & app screenshots (user swaps real assets) → `public/`.
- Project copy is kept verbatim from the reference (user edits later).
- Notes are data-driven (`src/content/`).

## Workflow
- Build **section by section**; pause for review after each.
- After a section, check the rendered result against the reference image/design.
- `npm run dev` to preview, `npm run build` to typecheck/validate.

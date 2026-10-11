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
- Recurring patterns reused across pages — build each once, share the component:
  - **Hover-to-color grayscale image tile** (Labs grid, Wylde BTS/triptych images):
    grayscale + contrast/brightness filter at rest, full color + slight scale on hover.
  - **Accordion** (Wylde FAQ): click toggles max-height/opacity, rotates a "+" to "×".
  - **Lightbox** (Labs): full-screen blurred backdrop, click-outside or Esc to close.
  - **Contact form** (Notes, Wylde footer): FROM input + message textarea + SEND button,
    with focus/filled/empty visual states — same shape both places, extract one component.
  - **Footer dither/clock**: canvas-like ASCII animation plus a live IST clock; treat as
    a self-contained client component since it depends on `requestAnimationFrame` and
    `setInterval`.

## Page structure — 5 templates, 3 build phases
Source files: `design-reference/re-design inspo/{Landing,Work,Labs,Notes,Wylde}.dc.html`.
Shared nav shell on every page: `GG` (Allison, red) · WORK · LABS · SAY HELLO, fixed
position, hides on scroll-down and fades back in ~240ms after scroll settles. On
Landing only, **WORK** opens a hover dropdown (dark card, `surface` bg, `border`
outline, 16px radius, heavy shadow) listing 3 projects with thumbnail, title, sub-label,
number, plus an "All selected work" CTA and MY STORY / SAY HELLO row.

**Phase 1 — Landing** (`Landing.dc.html`): 12 `data-reveal` sections in order:
1. Name + role ("Gaurav Gupta" / "Associate Product Manager").
2. Intro paragraph (who, where, focus).
3. Previous-role line (KPMG).
4. Current-work paragraph (active projects named inline).
5. **"Selected Work"** — numbered project list (hover to switch active project) next to
   an auto-rotating card carousel (PREMISE / BEHIND THE SCENES / A DECISION AND WHY /
   WHAT WE DIDN'T SHIP cards, 1.7s auto-advance, pauses on hover, tick indicators below).
6. **"Work is the story"** — 4-stage process list (Discovery/Delivery/Distribution/
   Iteration), each with a question, a call, a "why" paragraph with an inline metric,
   and a tool-logo row; hovering a stage reveals matching artwork in a floating panel
   with logo icons pinned to slot coordinates.
7. Full-bleed crossfading photo pair (masked top/bottom), captioned origin story.
8. Centered pull-quote paragraph (childhood/Manipal framing).
9. Long-form narrative block (4 paragraphs) — the go-kart / Manipal story, ends on the
   "definition of done" lesson.
10. Career timeline — monospace rows of `when — dashes — what`.
11. Freelance/photography reflection block (4 paragraphs, inline links to freelance
    clients), closing line ties it back to product work.
12. **"Notes"** section — numbered list linking to article slugs.
13. **"Worked with"** — infinite horizontal marquee of affiliations.
14. Footer (see below) — not a numbered reveal, always present.

**Footer** (shared shape, present on Landing at minimum): live IST clock, animated
ASCII-dither background (canvas of characters redrawn every frame, brightened in a
radial mask that follows the pointer), large "SAY HELLO" mailto heading that swaps to
"copied ✓" on click, INDEX / ELSEWHERE / CURRENTLY three-column grid, and a closing bar
with the GG mark, copyright, "BUILT IN MANIPAL", and a "BACK TO TOP" link.

**Phase 2 — Work + Labs**:
- `Work.dc.html` → `/work`: heading + intro line, divider, then a plain numbered list
  (num · title · status tag — "WRITE-UP IN PROGRESS" or "CASE STUDY") linking to case
  studies, "← BACK HOME" at the bottom.
- `Labs.dc.html` → `/labs`: heading + intro line + "WORK IN PROGRESS" tag, divider, then
  a **3-column masonry grid** of tiles (varying heights) tagged by kind (FILM, SKETCH,
  TOOL, EXPERIMENT, MOTION, WRITING, INTERFACE) with a state label (Archive, Prototype,
  In use, Testing, Shelved, Ongoing). Tiles are grayscale by default, go full-color and
  scale up slightly on hover, and reveal a title/kind/state overlay. Clicking a tile
  opens a full-screen blurred-backdrop lightbox with the same title/kind/state.
- `Wylde.dc.html` → the project-case-study template (see below), reused per project.

**Phase 3 — Notes** (`Notes.dc.html` → `/notes/[slug]`): scroll-progress bar (red, fixed
top), header (date/read-time meta, serif h1, italic pull-quote), divider, body
paragraphs (first block full `ink`, rest `mute-2`-toned), divider, then an inline
feedback form (FROM email input, message textarea, SEND button — states: empty/focus/
filled), "← BACK HOME".

**Wylde case-study template** (`Wylde.dc.html` → `/projects/[slug]`), numbered sections:
- Header: huge serif title, subhead, 4-column meta row (ROLE/PERIOD/TEAM/SURFACE).
- Full-bleed hero photo (grayscale-tinted) with caption.
- Tech-stack logo row.
- **01 The problem** — two-column text (the problem vs. the pre-brief kill condition)
  + a 3-card research-findings row (conversations, pattern, kill-check result).
- **02 Decision log** — left list of "forks" (click/hover to select), right panel shows
  the chosen question with WE CHOSE / WE TURNED DOWN / WHAT IT COST / EVIDENCE grid.
- Two-image BTS pair (grayscale-hover-to-color).
- **03 How it's put together** — vertical stack of architecture "layers" (CLIENT,
  PARSER, EVALS, EXPIRY, SIGNAL); hovering a layer highlights it and reveals its
  description.
- **04 Walkthrough** — sticky phone-frame mockup on the left showing the active step's
  screenshot; on the right, a scrolling list of steps (scroll-linked via
  IntersectionObserver) each with tag/title/body/note.
- Artefacts & trigger files list (filename, description, kind, action link).
- 3-image triptych strip (grayscale-hover-to-color).
- **05 Where it stands** — 2×2 metrics grid (value + description + status tag) +
  "what I'd do differently" bullet list.
- **06 Questions I get asked** — FAQ accordion (click to expand/collapse).
- Closing contact form (same FROM/message/SEND pattern as Notes) + "← ALL WORK" /
  "NEXT [project] →" footer nav.

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

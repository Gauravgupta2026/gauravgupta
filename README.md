# Gaurav Gupta — Portfolio

A single-page, type-led personal portfolio. Warm/editorial **Paper** theme by
default, with a cool/technical **Lab** theme; the choice persists in
`localStorage`. Built with **Vite + React + TypeScript** and token-driven plain
CSS. No backend — deploys as a static site.

## Run

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # types only, no build
```

## Deploy

`npm run build` outputs a static site to `dist/`. Drag `dist/` into Netlify, or
on Vercel set **Framework: Vite**, **Build: `npm run build`**, **Output: `dist`**.
The build uses relative asset paths (`base: "./"`), so it also works from a
subpath.

## Edit content

All copy lives in [`src/data.ts`](src/data.ts) — summary text, the life-phases
flowchart, strengths/weaknesses, projects, notes, and contact links. Edit there;
no component changes needed for normal updates.

- **Add a project** — append to the `projects` array (`id`, `title`, `meta`,
  `tag`, `alt`, optional `image`). Each project automatically gets its own page
  at `#/project/<id>`; fill the optional detail fields (`tagline`, `gallery`,
  `techStack`, `stakeholders`, `statement`, `body`, `cover`) to flesh it out.
- **Add a note** — append to the `notes` array (`cat`, `title`, `href`).
- **Contact / socials** — edit the `contact` object (email, location, links).

## Swap images

Drop files in [`public/images/`](public/images/) and reference them as
`/images/<file>`:

- **Hero photo** — add `src="/images/hero.jpg"` to the `ImageSlot` in
  [`src/components/Hero.tsx`](src/components/Hero.tsx) (keep `fit="contain"` so
  the black gallery mat shows around it).
- **Project thumbnails** — add an `image` field to a project in `src/data.ts`,
  e.g. `image: "/images/sachetana.jpg"` (these fill their 4:3 frame, `cover`).

Slots without an image render a labelled placeholder, so the layout stays intact
before assets are added.

## Theme tokens

Both themes are defined as CSS variables in
[`src/styles/global.css`](src/styles/global.css) under `[data-theme="paper"]`
and `[data-theme="lab"]`. Every color and the corner radius come from these
tokens — change a value there and it updates everywhere. The active theme is set
by the `data-theme` attribute on `<html>` (see
[`src/theme/ThemeProvider.tsx`](src/theme/ThemeProvider.tsx)).

## Structure

```
src/
  components/   Nav, Hero, Summary, Phases, Projects, Notes, SignOff, Footer, ImageSlot
  theme/        ThemeProvider (theme state + localStorage)
  styles/       global.css (tokens + all component styles)
  data.ts       all editable content
  App.tsx       section composition
```

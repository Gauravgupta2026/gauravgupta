# Images

Drop your photos here, then reference them from `src/data.ts`.

- **Hero photo** — set a `src` on the `ImageSlot` in `src/components/Hero.tsx`
  (e.g. `src="/images/hero.jpg"`). Use `fit="contain"` so the gallery-mat
  border stays visible around it.
- **Project thumbnails** — add an `image` field to a project in `src/data.ts`,
  e.g. `image: "/images/sachetana.jpg"`. These fill their 4:3 frame (`cover`).

Anything under `public/` is served from the site root, so `public/images/x.jpg`
is referenced as `/images/x.jpg`.

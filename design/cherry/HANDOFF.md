# Handoff: cherry petal opening, hero and closing for gauravguptas.com

Date: 2026-10-10. Owner: Gaurav Gupta. Written at the end of a long design session; this file is the single source of truth for the build.

## 1. Goal

Replace the halftone orchid opening on gauravguptas.com. The orchid looks too close to ednaho.com (same flower, pink on black, square dot grid, glow).

The new idea, in one line: **petals come to you.** Edna's flower opens in front of the visitor; on this site a breeze carries real cherry petals toward the visitor, as a small gift of warmth. Then one petal rests and becomes the hero object.

Story link to the Tagore quote that stays on the site ("The infant flower opens its bud and cries, 'Dear World, please do not fade.'"): the petals leave the tree, but what reaches you is kept.

## 2. Rules from Gaurav for this build (non-negotiable)

1. **Minimal, elegant, significant, mature.** The standard is the orchid: one object, one motion, one colour shift, then stillness.
2. **Flag scope creep.** If a request adds elements, worlds, characters or phases, warn clearly before building. If less would look better, say so straight. (See section 9 for what already failed.)
3. **No flashing, no fast large-area changes.** Photosensitivity: stay within WCAG 2.3.1 (no more than 3 flashes in any 1 s). Breeze, not storm.
4. Before editing site code: `git status`. If the change touches more than 3 files or changes an interface, confirm scope with Gaurav first. Ask for the test command; do not skip tests.
5. Strict TypeScript, no `any` without a written reason, no magic numbers (name every constant), no TODO comments, comments only for the non-obvious "why".
6. Replies to Gaurav in ASD-STE100 Simplified Technical English.

## 3. Approved design

### 3.1 Opening and hero (prototype: `design/cherry/breeze.html`)

Background: darkest grey `#0A090B` (dark theme). Light theme `#F6F2EF`. Both tested and approved in look.

| Time (s) | Beat |
|---|---|
| 0.5 – 1.8 | One real petal fades in at the centre of the screen (like Edna's bud: centre of attention). It hovers, turned slightly to the light. |
| 1.8 – 2.4 | It stirs: first breath of wind. |
| 1.9 – 5.4 | The breeze: ~44 real petals drift in from the distance. Some cross the middle distance left to right; the nearest pass slowly, out of focus, past the screen edges (they "brush your face"). The centre petal is carried a little. A faint warm pink light grows behind it (light, never a colour fill). |
| 4.7 – 6.3 | The breeze settles. The centre petal rocks once and comes to rest, curled slightly. It breathes (7 s period). |
| 6.0 – 6.8 | Name appears under the petal. On the live site this is the existing hero copy (name + "a designer and engineer who builds digital products with care for how they work and feel"). |
| after | A single petal crosses every ~7 s. Cursor movement = a gentle breath on the petal. |

Quote: keep the Tagore quote as real DOM text. Sync it to the beats: line 1 with the first petal, "please do not fade." as the breeze peaks, then it becomes the existing caption. **Edition still unconfirmed**: the site currently cites "Stray Birds, 66". Do not change the text or citation without Gaurav.

### 3.2 Scroll into Selected work (recommended, not yet confirmed)

As the visitor scrolls, a soft wind lifts the hero petal and carries it off-screen, scroll-linked. No petals inside Selected work: the work must speak alone. Ask Gaurav to confirm this beat.

### 3.3 Closing (prototype: `design/cherry/footer.html`) — confirmed by Gaurav

In the closing section ("Creativity and ideas travel further together." + **Say hello**, see `src/components/sections/ContactCTA.tsx`), when the section is 50% in view, one petal flows in from the upper left in two soft S-curves (~2.6 s), flips 1.5 times, lands ~32 px under **Say hello**, rocks once on a spring, and rests (breathing, cursor stir). Size ~52 px. Soft shadow on light theme, faint warm glow on dark. Same petal image as the hero (continuity: the petal that left at scroll comes back). Implemented with a CSS 3D transform on an `<img>` — no three.js needed here.

**Known flaw:** around t = 1.2 s the falling petal passes over the button. The path must stay clear of the button and the text.

### 3.4 Not used (decided)

- The shell + pearl footer (from the earlier underwater direction): **dropped**. Two motifs would split the site identity.
- No sound, no world, no figure, no storm, no full-screen pink cover, no wind lines, no halftone over real petals (it looked like a mosaic filter).

## 4. Assets

| File | What |
|---|---|
| `design/cherry/assets/petal-atlas.webp` | 2048×3072, 24 petals (4×6 cells of 512 px, petal fits 448 px). Transparent background; colour bled into transparent pixels so blurred mips stay pink, not grey. 890 KB. |
| `design/cherry/assets/hero-petal.webp` | 1198×1198 single hero petal, transparent, colour-bled. 281 KB. |

Sources: Gaurav generated the petal images (two 12-petal sheets + one hero petal). The atlas was cut by connected-component segmentation (a fixed grid crop cut petals that crossed cell lines). Before production: re-encode the atlas smaller (target ~350 KB, e.g. 384 px cells); move assets to `public/media/petals/`.

## 5. Technical approach (proven in the prototypes)

- **three.js 0.160.0** for the opening/hero only (pinned; in production install from npm and lazy-load after first paint). Reason it was chosen over Canvas 2D: real 3D bend/curl of petals, per-pixel light and translucency, and depth-of-field from texture mip levels. Canvas 2D cannot do these; close petals looked flat.
- Petals are `InstancedMesh` planes (12×12 segments). Vertex shader bends each petal (curl, cup, twist + wind flutter). Fragment shader: wrap light, darker underside, light passing through, small sheen, depth blur via `texture2D(map, uv, bias)` capped at 3.4, distance fade to the background colour.
- Three layers for correct transparency without sorting: petals behind the centre petal, the centre petal, petals in front.
- Every motion is a pure, deterministic function of time (seeded `mulberry32`), so any frame can be reproduced exactly.
- Lessons already learned (do not repeat):
  - Multisampled render targets failed to draw in the test browser; not needed (petal edges come from texture alpha).
  - Anisotropic filtering + blur bias made near petals look furry: keep `anisotropy = 1`.
  - Transparent pixels must carry petal colour (colour bleed), or blur makes grey fringes.
  - Compile shaders up front (`renderer.compile`) to avoid an ~80 ms stall the first time an object appears.
  - Don't put a `//` comment on the same line as a GLSL closing brace inside a template string.
- Measured cost on Gaurav's Mac at 1440×900 @2x: ~0.1 ms/frame (worst < 1 ms). **Not yet measured on a real phone.**

## 6. Apple-grade fixes still to do (from review)

Choreography
1. Breeze paths must never cross in front of the centre petal or text (one does at ~3.9 s in `breeze.html`).
2. A confident pause: ~1 s of dark before the first petal.
3. Settle on a spring with a tiny overshoot, not a fixed curve.
4. Lock quote timing to the beats (see 3.1).

Craft
1. The closest white petals still show a slightly fuzzy edge: pre-blur clean alpha versions instead of relying on mips.
2. White petals look slightly grey on the light theme: tune per-theme light.
3. Soft motion blur only for the fastest near petals.
4. One consistent light direction matched to the warm glow.

Engineering
1. First frame = the resting petal as a plain `<img>` in the HTML (fast paint); three.js takes over after load.
2. Smaller textures (section 4).
3. Once per session (sessionStorage), skippable (click / key), reduced motion = still frame. The live orchid already does all three — keep that behaviour.
4. Pause rendering when hidden or off-screen.
5. Quote stays real text; the canvas is `aria-hidden`.
6. Measure on a real mid-range phone.

## 7. Integration plan (confirm the file list with Gaurav first — it is more than 3 files)

Current live structure (verified in this worktree):
- `src/components/giants/LandingPage.tsx` → `LandingExperience.tsx` → `EdnaOpening.tsx` (opening + hero copy, uses `OrchidCanvas.tsx` and `openingTimeline.ts`) + `SelectedWork.tsx`.
- Closing section: `src/components/sections/ContactCTA.tsx` (also text appears in `AboutFooter.tsx`).
- Theme: `useSiteTheme()` from `@/components/SiteTheme`; intro control: `useLandingIntro()`.

Likely changes:
1. New `src/components/giants/PetalBreeze.tsx` (three.js scene, replaces `OrchidCanvas.tsx` usage).
2. `openingTimeline.ts` → new beat timings (3.1).
3. `EdnaOpening.tsx` + `EdnaOpening.module.css` → swap canvas, quote sync, first-frame image.
4. New `src/components/sections/ClosingPetal.tsx` (+ CSS module) used by `ContactCTA.tsx`.
5. `package.json`: add `three` (+ `@types/three`). State the reason (section 5).
6. Remove the orchid assets and settings only after Gaurav agrees (`public/media/orchid-luminance.png`, `lightFlowerSettings.ts`, `OrchidCanvas.tsx`).

Projects/Selected work section: unchanged.

## 8. How to review the prototypes

From `design/cherry/`: `python3 -m http.server 8766 --bind 127.0.0.1`, then open:
- `http://127.0.0.1:8766/breeze.html` — press **T** for the panel (Replay, light/dark). `?t=4.2` freezes a frame; `?theme=light`.
- `http://127.0.0.1:8766/footer.html` — scroll to the closing section; light/dark toggle top right.

Console hooks: `__breezeAt(t, theme)`, `__breezeSheet(from, to, count, cols, theme)`, `__breezeBench(from, frames)`, `__footerPetalAt(t, theme)`.

Review frames are in `design/cherry/review/` (`breeze-*.jpg` are the approved direction).

## 9. History (so nobody repeats it)

1. Halftone pearl in a shell, underwater (`design/pearl-hero/prototype.html`) — good craft, but the story was not Gaurav's.
2. Many concept ideas (Indra's net, sand mandala, Voyager, nautilus...) — rejected: "just a story", not personal.
3. Cherry petals, real images, three.js (`design/cherry/prototype.html`) — loved; this is where the real-petal look was proven.
4. Full narrative scene (`design/cherry/scene.html`: world, trees, stick figure, pothole, two storms, wind lines, sound) — **failed**: amateur, too much scope, photosensitivity risk. This is why rule 2.2 exists.
5. Minimal breeze (`design/cherry/breeze.html`) + closing petal (`footer.html`) — **approved direction**.

Also: Gaurav has an experiments branch with a white, hand-drawn ink style (house, telephone, stamps). It is flexible and **not** the target. If the site ever moves to that style, petals must become ink drawings to match; photoreal petals would clash.

## 10. Open questions for Gaurav

1. Quote edition (currently "Stray Birds, 66").
2. Test command: is it `npm run lint && npm run build`?
3. Confirm the scroll exit beat (3.2).
4. Confirm the integration file list (section 7) and removal of orchid assets.
5. Name placement in the hero: centred under the petal (prototype) or the current site layout.

## 11. Repo state

- Branch: `claude/cherry-petal-breeze`, based on `main`, **pushed** to `origin` (GitHub: Gauravgupta2026/gauravgupta).
- Commit `06f19b5` adds `design/cherry/` (prototypes, assets, review frames, this handoff) and `design/pearl-hero/` (earlier exploration, reference only).
- No site code (`src/`) has changed yet. `main` is untouched.
- To start the build in a fresh session: `git fetch origin && git checkout claude/cherry-petal-breeze` (or create a new worktree from it), then read this file.
- The original worktree folder is still named `.claude/worktrees/pearl-hero-underwater-969c51`; the name is historical only.

# Portfolio design system

Shared implementation: `main`; flower-bed hero: `experiments`, 7 October 2026. This document records the current rules; superseded experiments are not specifications. Visual acceptance remains Gaurav's review.

## Character and color

Quiet, human, in both themes. Give the work room to breathe. `theme.css` owns semantic colors sitewide: dark ground `#0a0a0a`, light ground `#fdfafb`, including safe areas, browser bars and scrollbar gutters. Explicit choices from the footer icon (`portfolio-theme`) override the device setting; otherwise follow the device. Ignore the obsolete `theme` storage key so old layouts cannot lock the site in light mode. Hero canvas, navigation, reading pages, CTA and footer use the same resolved theme. Use size and dimming for hierarchy, not bold sans text. Pink marks hover, focus, progress, and the landing cursor rather than filling page surfaces. Project art owns its palette inside the frame.

| Role | Value |
| --- | --- |
| Ground | `#0a0a0a` |
| Content | `#f7f6f2` |
| Name / navigation | `#ffffff` |
| Experimental hero description | White at 85 percent |
| Supporting text | `#a4a4a4` |
| Media surface / border | `#171717` / `#2e2e2e` |
| Control border / hover | `#ffffff24` / `#ffffff65` |
| Focus and hover accent | `#ffcae8` |
| Progress / cursor | `#ead8e2` / `#da027d` |

## Typography

ITC Garamond Light, weight 300, **upright**, is the human voice: page introductions and CTA; the experimental hero also uses it. Main hero name uses the same upright ITC voice. About follows the supplied reference with plain Switzer throughout its biography. Albert Sans 400 is interface chrome: navigation, controls, hero description. Switzer 400 is content: project titles, purposes, facts, biography, and index rows. Fraunces is deferred and is not loaded. Case studies use upright ITC headings, Switzer prose and Albert labels. Notes retain Geist Mono prose and their existing composition, with upright ITC headings.

| Element | Size and line-height |
| --- | --- |
| Main hero name | ITC Garamond Light upright 300, `clamp(16px,3.571vw,24px)` / 1.5 |
| Main hero description | Albert Sans `clamp(13px,1.905vw,16px)` / 1.45 |
| Experimental hero name | `clamp(36px,4.5vw,64px)` / 1.05; below 440px `clamp(32px,9vw,40px)` |
| Experimental hero description | `clamp(14px,1.3vw,18px)` / 1.45, balanced and centered |
| Project title, all indexes | Switzer `clamp(18px,1.4vw,20px)` / 1.15; 18px below 601px |
| Project purpose | Switzer 14px / 1.4 |
| Project facts | Switzer 12px / 1.5, normal case |
| Context / inner-page introduction | 14–15px / 1.45–1.55 |
| About biography, including lead | Switzer 400, 16px / 1.35 |
| Notes rows | 15px / 1.5; 13px below 601px; metadata 13px / 11px |
| CTA headline | ITC `clamp(24px,3.2vw,40px)` / 1.15, two explicit lines |

Use `ProjectPresentation.module.css` for project titles, purposes, facts, and frame shape. Do not duplicate these properties in page selectors. A project title is content, not the ITC voice. Keep prose under 75ch. No synthetic italic or bold in the voice role.

## Shared layout and sizing

`src/app/layout-tokens.css` owns gutters and project size tokens. Reserve a stable scrollbar gutter sitewide so short and long pages share usable width; the fixed nav uses that same width. Desktop gutters are 64px; at 1023px and below they are 24px. Align the shared nav, section labels, project media/captions, and biography to these columns. Breakpoints: 1023px, 600px, 440px.

At **600px and below**, Landing, Work, and Labs project media have identical dimensions. Landing and Work retain these dimensions through 1023px; Labs uses two larger gallery columns on tablet:

- Width: usable viewport width less two page gutters, capped at 480px.
- Height: width multiplied by 0.625 (16:10).
- Border: 1px `#2e2e2e`; radius 8px; surface `#171717`.
- `LayoutMetrics` publishes usable viewport width through a ResizeObserver. It does no per-scroll measurement. The CSS fallback remains usable before hydration.
- Complete project containers may differ: Landing keeps its reading section, Work stacks two media frames, Labs keeps captions below a horizontal gallery. Consistency refers to preview dimensions and typography, not identical page composition.

Desktop Landing media height: `clamp(180px,(100svh - 400px) * .65,360px)`. Work retains alternating 7/5-column paired images, 24px gap, with existing aspect ratios. Labs uses three equal-width cards on desktop with 32px gaps inside page gutters; tablet uses two columns. Bottom-aligned desktop preview heights vary between 43svh and 53svh within their 300–600px limits. These desktop compositions intentionally differ.

Controls keep 44px minimum targets even when their text becomes smaller. Media zoom stays clipped inside the frame. Utility buttons have 6px radii; gallery controls are circles with 20px icons. Focus rings are 2px pink, offset 4px.

## Navigation and headings

One `Nav` in the root layout covers all routes. Horizontal links stay at the top right: Work (`/work`), Play (`/labs`), Notes (`/notes`), About (`/about`). Name appears at the top left on inner pages and after the landing hero name leaves view. There is no vertical navigation or separate stale page navigation.

Work, Labs, and Notes use PageIntro: “Ideas, made real.”, “Experiments”, and “Writing”. Notes description: “is where I slow down.” These three introductions occupy at least 45svh at every breakpoint, then filtering or the Notes list begins. Phones use 28px upright ITC headings and 14px Switzer description. About has a visually hidden semantic h1, with no visible route heading. Project case-study and note article titles remain visible because they identify substantive content.

## Page behavior

### Landing

On experiments only, the flower bed replaces the central pink flower intro, retaining centered name and description. The supplied flower configuration stays unchanged: breeze .60; gust interval 8 seconds; trail decay .90; blur .25; glow .36; pitch 7px; side mask .52/.78; bottom mask .72; beam dimming .20; grain .005; FPS 30; pixel ratio 1.25; strip 36vh.

Experiments starts at the hero unless an explicit anchor is present, without an opening scroll lock. Main plays the orchid/poem introduction on a fresh document loaded at Home, with a scroll lock only during that first intro. A persistent layout provider remembers its completion; internal returns to Home immediately show the finished hero. Loading another page first also bypasses the intro on subsequent Home navigation. Reloading creates a fresh document. Stale #selected-work fragments are removed on reload. No visible Skip introduction button; a faint 18px pause/play icon retains a labelled 44px target. Before projects, show “Care in how it works. Care in how it feels.” at the left with a directional arrow. Desktop vertical scrolling drives the horizontal rail: panels are 75 percent of viewport width, initially 25 percent of the first panel is visible, and a 45 percent viewport-height reading hold precedes translation. Mobile/tablet use native horizontal scrolling, with panels sized to shared media width plus page gutters. Arrow and controls allow deliberate navigation. Case-study actions have no arrow. The current project action has a white fill and dark text; the previous action returns to its quiet default when the next project becomes current. Hover/focus remain visible. A single custom progress indicator follows the rail; hide its native scrollbar without disabling native swipe. Fade the custom indicator after leaving the project section. No continuous shimmer.

### Work

Keep the original vertical alternating paired-image project layout and links. At 1023px and below, image pairs stack using the shared 16:10 frames; copy aligns with them. Project gaps are 128px desktop / 96px mobile/tablet.

Use CollectionFilter: four visible options on desktop/tablet, a labelled native dropdown with icon on phones, result count, and empty-state return to All work. Options: All work; Taking shape; In the making; Finished work. User-confirmed stages: Sachetana, Lucky Day, Research internship are finished; Wylde is in progress. No named project index or “Interactions drive feelings” statement.

The active CTA is “Creativity and ideas” / “travel further together.” Invitation is 14px; headline has two explicit lines. The 55svh CTA groups its content toward the ending, with 64px top padding and `--contact-content-space` below its button. The email action has a 44px minimum target. Every route shares one ContactEnding mounted after page content in the root layout; on every screen its CTA occupies at least 55svh with its closing content grouped toward the footer.

### Labs

Reference: supplied Schiller composition, adapted to the dark system. Shared introduction occupies 45svh. Experiments is the introduction title. No bracketed status labels appear on any page. Description is 14px mobile / 15px desktop. Remove the visible “Illustrative…” notices; previews remain illustrative artworks internally, not evidence of deployment.

Native horizontal gallery, captions always visible, previous/next controls. Vertical wheel over the gallery moves horizontally and returns page scrolling at its ends; native sideways input and touch remain native. No snap that blocks movement and no automatic advance. A tile opens a native modal dialog: Escape closes it and focus returns to its trigger.

### Notes

No local index, email block, cards, or list dividers. The Writing introduction precedes the list, and the shared contact ending follows it. Keep existing title/type/date rows, destinations, and article content. Rows have 64px minimum height, 20px vertical padding; text wraps inside the title column rather than pushing metadata offscreen.

### About

Reference: supplied black, text-first About screenshot. Start the biography at `clamp(176px,24svh,240px)` with no visible About heading. Plain sans-serif lead and body, equal size, following the supplied screenshot; 24px paragraph gaps; 64px before the existing mountain photograph. Biography width is at most 720px. Keep existing facts and social destinations; do not import the reference person's history.

Photo aligns to gutters on desktop/tablet; full bleed below 601px, 52svh tall. Follow with aligned context rows and a simple footer. The shared root CTA follows the page content. The older stamp/gallery reference does not override this text-first composition.

## Motion and accessibility

Scroll pinning is desktop-only. Mobile/tablet and reduced-motion use native scrolling. Experimental content remains available immediately, including without WebGL. Main retains its timed opening handoff. Flower animation pauses offscreen, when the tab is hidden, on the pause control, and for reduced motion. Media hover uses 600–700ms clipped scale; reduced motion removes transitions. The landing cursor is only for fine pointers; inner pages use native cursors.

Keep skip links, keyboard controls, labelled form fields, logical headings, modal focus return, and 44px targets. Visually hidden headings remain available to screen readers. Forced colors uses system text/background colors and suppresses decorative artwork. Never hide real copy inside canvas.

## Maintenance and verification

Before sizing changes, inspect every caller of the shared presentation and the responsive rules that override it. Update this document and `docs/SIZING_AUDIT.md` together. Verify actual computed dimensions and typography across Landing, Work, and Labs at phone/tablet sizes; check desktop compositions separately. Run lint, build, typecheck after build, and diff checks. Passing checks verifies implementation, not aesthetic acceptance. Do not append conflicting historical values as new specifications.

Mobile Landing omits the project focus (“The design problem…”); purpose and metadata remain. Experimental hero description uses CSS `text-wrap: pretty` to avoid an isolated last word. Mobile navigation remains a single horizontal row, Albert Sans 12px (11px below 361px with no link gap to fit one row), with 44px targets.

## Botanical footer experiment

ContactEnding is mounted once in the root layout across every page, including About, project case studies, and note articles. About’s former separate footer is removed. CTA minimum height is 55svh on every screen. Artwork before the footer uses `--contact-art-space: clamp(48px,8svh,80px)`. CTA closing padding uses `--contact-content-space: clamp(24px,4svh,40px)`. The space below the footer equals their sum, matching the visual gap from the CTA button to the footer. Footer height is content-driven; there is no fixed 40svh ending spacer.

Original generated macro botanical artwork replaces the cartoon SVG shapes: translucent pink rose petals, sage/olive leaves, natural veins, irregular edges. One transparent WebP atlas is 168KB, at `public/media/botanical-atlas.webp`. The built-in image-generation prompt and provenance are recorded in `public/media/SOURCES.md`.

The scene begins when visible and runs on active elapsed time: 9-second eased drift with 90ms stagger, then 1.8-second dissolution at each landing point. Pieces do not gather or stretch into a bar. The atlas blends into a 4px halftone mask whose dot radius shrinks in eight steps, suggesting wilting. The resulting hairline reads as water edge-on. Three finite, damped waves radiate from its center, 1.2 seconds apart, each lasting 4.2 seconds; the line becomes still at 15.6 seconds. There is no looping shimmer. Fourteen sprites on desktop / ten on phones. No scroll listener or scroll interception; ResizeObserver caches scene geometry. Paints are capped at 30fps, with animation frames stopped offscreen, hidden, after settling, and for reduced motion / forced colors. Route changes reset the scene. Reduced motion and forced colors show a static hairline.

Labs uses four factual collection filters: All experiments; Prototypes (Prototype); In progress (Testing, Ongoing, In use); On the shelf (Archive, Shelved). They do not assign completion claims to unfinished experiments. Filtering resets the gallery to its start and recomputes navigation boundaries.

Mobile Landing project introduction: vertically center the thought and arrow; keep the thought at the left shared gutter and arrow beside it. Desktop preserves its existing lower-left composition.

Labs toolbar styles target only its navigation arrow buttons; CollectionFilter owns its text buttons and dropdown. Never style every button beneath a shared toolbar as a circle.

## Branch ownership and scroll performance

Shared navigation, project presentation, Work/Labs/Notes/About, filters, CTA and botanical footer belong to main and experiments. Main retains its orchid opening, palette, poem and mobile handoff; its name now uses upright ITC. Only experiments replaces that opening with the flower bed and enlarged upright hero copy. The root navigation is shared; main hides it during its opening handoff. Main browser theme colors continue to follow its light/dark hero, while experiments uses the dark ground.

Native phone/tablet rails do not snap or translate in JavaScript. Gallery scroll listeners are passive, coalesce updates to one animation frame and change React state only at boundaries. Footer motion uses active elapsed time and cached scene geometry; layout changes refresh it through ResizeObserver. Experimental hero and flower strip use stable svh units so browser toolbar expansion does not repeatedly resize canvases. Hero rendering must stop offscreen or while hidden/paused. Keep main's existing scroll-restoration fix.

Experiments is replaced wholesale by the latest site state, rather than retaining the older alternate layout. Its search-indexing exclusion is retained as an environment safeguard; main remains indexable.

## Theme and reading-page contract

Light: content #342a2e, supporting #72646b, surface #f3edef, border #d9ccd2, focus #9e365f, progress #a65178. Dark retains the table above. Use `--site-*` tokens for UI; preserve intrinsic artwork colors. Root bootstrap resolves theme before paint; SiteTheme follows device changes and saved preferences on route navigation. No scroll listener is needed for browser color.

Case-study titles: upright ITC 300, 28–44px / 1.15, without a top kicker. Note article titles retain upright ITC 300, 32–52px / 1.1. Case prose: Switzer 16px / 1.65; note prose: Geist Mono 14px / 1.75. Reading measure capped at 680px. Section headings: ITC 26–36px for cases, 24–32px for notes. Labels stay readable at 12px; avoid tiny uppercase metadata. Note date appears above the title; one full-width rule follows the title and TL;DR, without repeated source/date metadata. The former description is a labelled mono TL;DR before that rule. No article-level All notes footer link; root navigation remains. Quotes and principles use theme-aware surfaces, upright serif text, and restrained spacing. Expanded case-study answers use intrinsic height so text cannot be clipped.

Landing “View More” always links to `/work`; individual “Read case study” links retain the project route.

Case-study stack: 28px local technology logos with accessible names and hover titles, 32px boxes and 16px gaps. Brand SVGs follow text color; official Apple framework/service images retain their colors. One quiet Next project text link follows each case, at the reading-column width, without thumbnail cards or a repeated heading.

Labs detail dialog: explicitly centered with `margin:auto`, bounded by 24px viewport margins, internally scrollable on short screens. Close is a separate 44px control in flow; artwork, 18–20px Switzer title and 13px metadata follow in a grid with 16–20px gaps. No oversized ITC modal heading. Mobile artwork height is at most 40svh / 320px, desktop/tablet at most 48svh / 480px. Native dialog focus, Escape close and return to the triggering card are preserved. Lock the document while the dialog is modal; its content scrolls internally without chaining into the page.

Footer theme control: one faint 16px sun/moon icon inside a 44px target, beside footer links. Keep its label accessible without visible text. Bootstrap and mounted controller share the storage key and palette from `src/lib/siteTheme.ts`. Device appearance changes update all pages when no explicit footer choice is saved.

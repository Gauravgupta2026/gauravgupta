# Portfolio design system

Shared implementation: `main`; flower-bed hero: `experiments`, 7 October 2026. This document records the current rules; superseded experiments are not specifications. Visual acceptance remains Gaurav's review.

## Character and color

Dark, quiet, human. Give the work room to breathe. Use size and dimming for hierarchy, not bold sans text. Pink marks hover, focus, progress, and the landing cursor rather than filling page surfaces. Project art owns its palette inside the frame.

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

ITC Garamond Light, weight 300, **upright**, is the human voice: page introductions and CTA; the experimental hero also uses it. Main retains its existing Cormorant italic hero name. About follows the supplied reference with plain Switzer throughout its biography. Albert Sans 400 is interface chrome: navigation, controls, hero description. Switzer 400 is content: project titles, purposes, facts, biography, and index rows. Fraunces is deferred and is not loaded. Existing substantive articles retain their own article typography.

| Element | Size and line-height |
| --- | --- |
| Main hero name | Cormorant italic 600, `clamp(16px,3.571vw,24px)` / 1.5 |
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

Experiments starts at the hero unless an explicit anchor is present, without an opening scroll lock. Main retains the orchid intro scroll lock and removes stale #selected-work fragments on reload. Before projects, show “Care in how it works. Care in how it feels.” at the left with a directional arrow. Desktop vertical scrolling drives the horizontal rail: panels are 75 percent of viewport width, initially 25 percent of the first panel is visible, and a 45 percent viewport-height reading hold precedes translation. Mobile/tablet use native horizontal scrolling, with panels sized to shared media width plus page gutters. Arrow and controls allow deliberate navigation. Case-study actions have no arrow; hover/focus uses a bright neutral fill. No continuous shimmer.

### Work

Keep the original vertical alternating paired-image project layout and links. At 1023px and below, image pairs stack using the shared 16:10 frames; copy aligns with them. Project gaps are 128px desktop / 96px mobile/tablet.

Use CollectionFilter: four visible options on desktop/tablet, a labelled native dropdown with icon on phones, result count, and empty-state return to All work. Options: All work; Taking shape; In the making; Finished work. User-confirmed stages: Sachetana, Lucky Day, Research internship are finished; Wylde is in progress. No named project index or “Interactions drive feelings” statement.

The active CTA is “Creativity and ideas” / “travel further together.” Invitation is 14px; headline has two explicit lines. Padding is 88px desktop / 64px mobile/tablet. The email action has a 44px minimum target. Every route shares one ContactEnding mounted after page content in the root layout; on every screen its CTA occupies at least 55svh with centered content.

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

ContactEnding is mounted once in the root layout across every page, including About, project case studies, and note articles. About’s former separate footer is removed. CTA minimum height is 55svh on every screen. The artwork plus footer occupy 40svh (minimum 240px to preserve links on short screens).

Original generated macro botanical artwork replaces the cartoon SVG shapes: translucent pink rose petals, sage/olive leaves, natural veins, irregular edges. One transparent WebP atlas is 168KB, at `public/media/botanical-atlas.webp`. The built-in image-generation prompt and provenance are recorded in `public/media/SOURCES.md`.

Scroll sets the target of a 4.2-second eased sequence. Drift takes its first half, followed by a settling pause. During the last third the pieces converge toward the center and flatten into the hairline; the line grows from the center toward both edges. A pair of restrained shimmer rays radiate outward once settled. There are 14 sprites on desktop / 10 on phones, no scroll interception or pinning. Rendering stops when progress catches its target, offscreen, or when the tab is hidden. The motion resets on route changes so a persistent layout cannot skip the sequence on a new page. Reduced motion and forced colors show a static hairline.

Labs uses four factual collection filters: All experiments; Prototypes (Prototype); In progress (Testing, Ongoing, In use); On the shelf (Archive, Shelved). They do not assign completion claims to unfinished experiments. Filtering resets the gallery to its start and recomputes navigation boundaries.

Mobile Landing project introduction: vertically center the thought and arrow; keep the thought at the left shared gutter and arrow beside it. Desktop preserves its existing lower-left composition.

Labs toolbar styles target only its navigation arrow buttons; CollectionFilter owns its text buttons and dropdown. Never style every button beneath a shared toolbar as a circle.

## Branch ownership and scroll performance

Shared navigation, project presentation, Work/Labs/Notes/About, filters, CTA and botanical footer belong to main and experiments. Main retains its orchid opening, palette, poem, name face and mobile handoff. Only experiments replaces that opening with the flower bed and enlarged upright hero copy. The root navigation is shared; main hides it during its opening handoff. Main browser theme colors continue to follow its light/dark hero, while experiments uses the dark ground.

Native phone/tablet rails do not snap or translate in JavaScript. Gallery scroll listeners are passive, coalesce updates to one animation frame and change React state only at boundaries. Footer scroll handlers use cached document geometry; layout changes refresh it through ResizeObserver. Experimental hero and flower strip use stable svh units so browser toolbar expansion does not repeatedly resize canvases. Hero rendering must stop offscreen or while hidden/paused. Keep main's existing scroll-restoration fix.

Experiments is replaced wholesale by the latest site state, rather than retaining the older alternate layout. Its search-indexing exclusion is retained as an environment safeguard; main remains indexable.

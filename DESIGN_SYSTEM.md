# Portfolio design system

Current source of truth for `experiments`, updated 11 October 2026. This consolidates the approved landing design and supersedes the earlier chronological revisions. Production is separate. Reference audits and scraped material stay local and are excluded from commits. Ship implementation documentation and only the assets used by the site, retaining required license files.

## Typography
Use existing local font files. ITC Garamond Std Book 400 is the final editorial face. PP Neue Montreal Regular 400 is the functional face; no synthetic Medium or bold.

| Role | Face | Rendered size / line height |
| --- | --- | --- |
| Hero name, page titles, project headlines, article headings | ITC Garamond | 20 / 25px |
| Introductions, project descriptions, note prose | ITC Garamond | 16 / 24px |
| Hero designer/location line | PP Neue Montreal | 14 / 20px |
| Project name labels, index dates/numbers/categories/status | PP Neue Montreal | 12 / 18px |
| Explore, back and contact actions | PP Neue Montreal | 16 / 24px |

Keep the same readable body scale on phones; adapt the layout and wrapping. Editorial tracking is approximately -.005em. Project name labels use .04em uppercase tracking; other functional text uses normal tracking. Hero mail/social links remain Garamond. Navigation is Montreal 14px desktop, 12px mobile. Footer typography is Garamond at its preserved responsive sizes: heading 28/30px desktop, 16/20px mobile; supporting copy 14/20px desktop, 12/18px mobile. Footer socials stay 12px on every size. Nothing the user reads is set below 12px.

Shared type/column values live in `src/app/globals.css` as `--portfolio-*`. Landing roles use `LandingHome.module.css`; Work/Notes share `EditorialPage.module.css`. Shared `.pageContent` zoom is .972. Compensate page typography and spacing for that zoom to achieve the rendered sizes above. Navigation and footer stay outside zoom.

## Surfaces and color
Home, Work, Notes (including article routes) and case studies use white #FFFFFF page/navigation surfaces, #0C0B0B ink, #6B6B6B secondary labels (5.3:1 on white; the earlier #7E7E7E failed AA at 4.06:1), rgba(12,11,11,.1) rules and #3060A0 hover/focus accent. Home hero retains a subtle paper texture under a 95 percent white wash; do not add that texture to reading pages. There is no bronze outline, butter-yellow project container.

The monkey footer remains #FFF6CC with its existing paper texture and #1A1A1A ink. Other routes keep their existing colors until specifically requested; do not propagate page changes implicitly. No dark mode.

## Layout and navigation
Home, Work, Notes, Labs and About use a 660px rendered content column with 24px side gutters (708px maximum outer width). Phones use viewport width minus 48px for content. Main gaps are 80px desktop and 48px mobile; small content rhythm is 16/24px. Landing project previews are 100px apart on desktop and 60px on phones; the hero text sits about 200px (desktop) and 120px (phone) above the "Selected Works" heading. Work, Notes and About start 192px below the page top on desktop and 112px on phones. Running prose is capped at `--portfolio-measure` (34em, about 545px or 76 characters).

Fixed navigation aligns GG to the content left edge and the link group to its right edge on these routes. Add 16px top padding desktop, 12px mobile, preserving 44px controls. Other route navigation keeps its existing width. Do not overlap or hide content under the header.

## Home
Keep an empty hero illustration footprint above the introduction, preserving the text origin. Hero has a small name/location row, left-aligned introduction and simple contact links. No hero illustration, filters, landing Notes or resume/social section. A "Selected Works" heading (h2, Garamond 20/25, left-aligned in the column, 24px above the first project) introduces the project list.

Three projects use full-column previews with desktop aspect ratio 3, mobile 1.5. Captions are two columns desktop, stacked mobile. Project names and Explore links are Montreal; headlines/descriptions are Garamond. No context/status line in landing captions. Each image and caption reveal together once using the existing project Reveal primitive. A thin moving wavy underline replaces Explore arrows while the project is in the central viewport region or its link has keyboard focus.

## Work
Use a screenshot-led single-photo gallery: a top filter toolbar with project count, then stacked projects with one full-column natural-ratio photo and title/purpose/details beneath. No hover-only images, second photo or numeric index. A title ("Things I’ve built.") and one line sit above the toolbar, set like the Notes and Labs intros (Garamond 20/25 and 16/24). Retain existing project identity, roles, context and honest status. Filters use the actual available statuses: All work, In build, Write-ups in progress; do not imply finished projects without evidence. Reuse CollectionFilter with a mobile select, visible selected state, keyboard focus and live result count. Garamond title/purpose; Montreal toolbar, count and role/context/status details. Keep the shared 660px column, white background, responsive gutters and footer.

## Notes
The page opens with the title "Writing is where I slow down." and the line "Notes on products, design and making things." Index rows use date | title: Montreal date, Garamond title, with no divider lines. Preserve chronological order and links. Articles use the same white column, Garamond 16/24px prose and 20/25px headings, with Montreal dates, back links and figure captions. Preserve actual text, images and Working note labels. Do not alter the shared article renderer’s other callers to restyle Notes.

## Footer and remaining routes
Two animated monkeys flank the centered CTA, including on phones. Footer stays sticky at the viewport bottom behind the opaque page layer: footer z-index 1, surface 2. The last content slides upward to reveal it. Keyboard focus reveals footer controls. Short viewports/reduced motion use normal flow. Preserve artwork, CTA copy, colors, responsive composition and interactions.

Case-study pages stay directly on a continuous white layer with uncropped, full-width images at their natural ratios and inset responsive text; no article container. Work/Notes styling must not modify them. Labs follows the shared system: white page, the 660px column for the nav and intro (Garamond 20/25 title, 16/24 line), and a horizontal media rail that starts at the column's left edge and scrolls on to the right. Tile titles are Garamond 20/25, captions Garamond 16/24 muted, kinds Montreal 12/18 muted. The native viewer is unchanged. About uses the Notes column: an "About" title, three paragraphs, a 16:9 photo (4:3 on phones) with a caption, "A little context" rows (Garamond name, Montreal detail and date, no dividers), then a full-height contact section (`#contact`) holding one card with the four contact rows. `/contact` redirects to `/about#contact` and the About page ends with it. The header has no Hello link.

## Motion and accessibility
Use `m` under LazyMotion/domAnimation strict mode. Reduced motion removes entrances and uses static underlines. Stop underline animation when offscreen. Keep decorative artwork hidden from assistive technology, meaningful media labelled, live text in the DOM, keyboard focus visible and interactive controls at least 44px. Dialogs support Escape and focus return. No automatic slideshow. Home has no entry modal or opening sequence.

## Validation and scope
Run lint, standalone typecheck, webpack production build and `git diff --check`. Check 360, 390, 768, 1280, 1440 and 1920px for wrapping, navigation alignment and horizontal overflow. Verify route links, note reading, project reveals and both footer monkeys. Code checks do not establish visual acceptance; Gaurav reviews the preview. Keep changes on `experiments`, preserve unrelated work and do not commit/push without instruction.

## Interactive greeting window
Home keeps the painted blue window inside the existing hero art footprint. It is a native button: click/tap/Enter/Space toggles the shutters over 700ms; reduced motion toggles instantly. No startup animation, dialog, loading phase, session storage, writing sequence, enter control or zoom-through transition. Display the window at 220px height desktop, 200px mobile without moving the hero text. Remove added drop shadows, artificial shutter shading and paper backdrop; use a flat cream pane. Preserve the baked painting until revised artwork is supplied. Namaste text is a temporary greeting while the isolated hand illustration is pending. A future single transparent hands layer belongs inside the pane, not as a full poster. Reference artwork/prompt notes stay local; ship only used layers.

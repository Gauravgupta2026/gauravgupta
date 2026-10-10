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

Keep the same readable body scale on phones; adapt the layout and wrapping. Editorial tracking is approximately -.005em. Project name labels use .04em uppercase tracking; other functional text uses normal tracking. Hero mail/social links remain Garamond. Navigation is Montreal 14px desktop, 12px mobile. Footer typography is Garamond at its preserved responsive sizes: heading 28/30px desktop, 16/20px mobile; supporting copy 14/20px desktop, 12/18px mobile. Footer socials stay 12px desktop, 10px mobile.

Shared type/column values live in `src/app/globals.css` as `--portfolio-*`. Landing roles use `LandingHome.module.css`; Work/Notes share `EditorialPage.module.css`. Shared `.pageContent` zoom is .972. Compensate page typography and spacing for that zoom to achieve the rendered sizes above. Navigation and footer stay outside zoom.

## Surfaces and color
Home, Work, Notes (including article routes) and case studies use white #FFFFFF page/navigation surfaces, #0C0B0B ink, #7E7E7E secondary labels, rgba(12,11,11,.1) rules and #3060A0 hover/focus accent. Home hero retains a subtle paper texture under a 95 percent white wash; do not add that texture to reading pages. There is no bronze outline, butter-yellow project container or opening sequence.

The monkey footer remains #FFF6CC with its existing paper texture and #1A1A1A ink. Contact retains the photo ending. Other routes keep their existing colors until specifically requested; do not propagate page changes implicitly. No dark mode.

## Layout and navigation
Home, Work and Notes use a 660px rendered content column with 24px side gutters (708px maximum outer width). Phones use viewport width minus 48px for content. Main gaps are 80px desktop and 48px mobile; small content rhythm is 16/24px. Work/Notes start 192px below the page top on desktop and 112px on phones.

Fixed navigation aligns GG to the content left edge and the link group to its right edge on these routes. Add 16px top padding desktop, 12px mobile, preserving 44px controls. Other route navigation keeps its existing width. Do not overlap or hide content under the header.

## Home
Keep an empty hero illustration footprint above the introduction, preserving the text origin. Hero has a small name/location row, left-aligned introduction and simple contact links. No hero illustration, visible Selected work heading, filters, landing Notes or resume/social section.

Three projects use full-column previews with desktop aspect ratio 3, mobile 1.5. Captions are two columns desktop, stacked mobile. Project names and Explore links are Montreal; headlines/descriptions are Garamond. No context/status line in landing captions. Each image and caption reveal together once using the existing project Reveal primitive. A thin moving wavy underline replaces Explore arrows while the project is in the central viewport region or its link has keyboard focus.

## Work
Use a screenshot-led single-photo gallery: a top filter toolbar with project count, then stacked projects with one full-column natural-ratio photo and title/purpose/details beneath. No hover-only images, second photo, numeric index or introductory statement. Retain existing project identity, roles, context and honest status. Filters use the actual available statuses: All work, In build, Write-ups in progress; do not imply finished projects without evidence. Reuse CollectionFilter with a mobile select, visible selected state, keyboard focus and live result count. Garamond title/purpose; Montreal toolbar, count and role/context/status details. Keep the shared 660px column, white background, responsive gutters and footer. Work content starts at 112px below the page top.

## Notes
Index rows use date | title: Montreal date, Garamond title, a thin vertical divider and horizontal row rules. Preserve chronological order and links. Articles use the same white column, Garamond 16/24px prose and 20/25px headings, with Montreal dates, back links and figure captions. Preserve actual text, images and Working note labels. Do not alter the shared article renderer’s other callers to restyle Notes.

## Footer and remaining routes
Two animated monkeys flank the centered CTA, including on phones. Footer stays sticky at the viewport bottom behind the opaque page layer: footer z-index 1, surface 2. The last content slides upward to reveal it. Keyboard focus reveals footer controls. Short viewports/reduced motion use normal flow. Preserve artwork, CTA copy, colors, responsive composition and interactions.

Case-study pages stay directly on a continuous white layer with uncropped, full-width images at their natural ratios and inset responsive text; no article container. Work/Notes styling must not modify them. Labs retains its horizontal media gallery and native viewer; About retains its stamp storytelling; Contact retains its photo strip and controls. Their typography/layout remain as implemented unless requested separately.

## Motion and accessibility
Use `m` under LazyMotion/domAnimation strict mode. Reduced motion removes entrances and uses static underlines. Stop underline animation when offscreen. Keep decorative artwork hidden from assistive technology, meaningful media labelled, live text in the DOM, keyboard focus visible and interactive controls at least 44px. Dialogs support Escape and focus return. No automatic slideshow or entry modal.

## Validation and scope
Run lint, standalone typecheck, webpack production build and `git diff --check`. Check 360, 390, 768 and 1440px for wrapping, navigation alignment and horizontal overflow. Verify route links, note reading, project reveals and both footer monkeys. Code checks do not establish visual acceptance; Gaurav reviews the preview. Keep changes on `experiments`, preserve unrelated work and do not commit/push without instruction.

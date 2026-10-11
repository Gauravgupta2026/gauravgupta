# Portfolio design system

Current source of truth for `experiments`, updated 11 October 2026. This consolidates the approved landing design and supersedes the earlier chronological revisions. Production is separate. Reference audits and scraped material stay local and are excluded from commits. Ship implementation documentation and only the assets used by the site, retaining required license files.

## Typography
Use existing local font files. ITC Garamond Std Light 300 and Book 400 are the editorial faces, using the real local files. Medium (500) is the maximum allowed weight. No Medium file is available, so heading roles use Book 400; do not load Bold or synthesize heavier weights. PP Neue Montreal Regular 400 is the functional face; do not synthesize missing Montreal weights. Use Book for names, headings and note titles; Book for reading text; Light for short introductions and supporting footer/contact copy.

| Role | Face | Rendered size / line height |
| --- | --- | --- |
| Hero name, page titles, project headlines, article headings | ITC Garamond | 20 / 25px |
| Introductions, project descriptions, note prose | ITC Garamond | 16 / 24px |
| Hero designer/location line | PP Neue Montreal | 14 / 20px |
| Project name labels, index dates/numbers/categories/status | PP Neue Montreal | 12 / 18px |
| Explore, back and contact actions | PP Neue Montreal | 16 / 24px |

On phones use 18px headings, 14px body/actions, 12px labels and 1.5 body line height. Desktop sizes remain as listed. Editorial tracking is approximately -.005em. Project name labels use .04em uppercase tracking; other functional text uses normal tracking. Hero mail/social links remain Garamond. Navigation is Montreal 14px desktop, 12px mobile. Footer typography is Garamond at its preserved responsive sizes: heading 28/30px desktop, 16/20px mobile; supporting copy 14/20px desktop, 12/18px mobile. Footer socials stay 12px on every size. Page labels stay at least 12px; the compact mobile footer is an explicit exception at 11px for supporting copy and links.

Shared type/column values live in `src/app/globals.css` as `--portfolio-*`. Landing roles use `LandingHome.module.css`; Work/Notes share `EditorialPage.module.css`. Shared `.pageContent` zoom is .972. Compensate page typography and spacing for that zoom to achieve the rendered sizes above. Navigation and footer stay outside zoom.

## Surfaces and color
Home, Work, Notes (including article routes) and case studies use white #FFFFFF page/navigation surfaces, #0C0B0B ink, #6B6B6B secondary labels (5.3:1 on white; the earlier #7E7E7E failed AA at 4.06:1), rgba(12,11,11,.1) rules and #3060A0 hover/focus accent. Home hero retains a subtle paper texture under a 95 percent white wash; do not add that texture to reading pages. There is no bronze outline, butter-yellow project container.

The monkey footer remains #FFF6CC with its existing paper texture and #1A1A1A ink. Other routes keep their existing colors until specifically requested; do not propagate page changes implicitly. No dark mode.

## Layout and navigation
Home, Work, Notes, Labs and About use a 660px rendered content column with 24px side gutters (708px maximum outer width). Phones use 12px side gutters (viewport width minus 24px). Main gaps are 80px desktop and 48px mobile; small content rhythm is 16/24px. Landing project previews are 100px apart on desktop and 60px on phones; the hero text sits about 200px (desktop) and 120px (phone) above the "Selected Works" heading. Work, Notes and About start 192px below the page top on desktop and 112px on phones. Running prose is capped at `--portfolio-measure` (34em, about 545px or 76 characters).

Fixed navigation aligns GG to the content left edge and the link group to its right edge on these routes. Add 16px top padding desktop, 12px mobile, preserving 44px controls. Other route navigation keeps its existing width. Do not overlap or hide content under the header. Navigation links have no default underline and no active highlight on Home. On other routes, the active section uses the #3060A0 accent and a thin wavy underline; note articles retain Notes and case studies retain Work as the active section.

## Home
Place the interactive Namma Auto illustration above the introduction; the greeting window belongs only to the opening screen. Hero has a small name/location row, left-aligned introduction and simple contact links. No filters, landing Notes or resume/social section. A "Selected Works" heading (h2, Garamond 20/25, left-aligned in the column, 24px above the first project) introduces the project list.

Three projects use full-column previews with desktop aspect ratio 3, mobile 1.5. Captions are two columns desktop, stacked mobile. Project names and Explore links are Montreal; headlines/descriptions are Garamond. No context/status line in landing captions. Each image and caption reveal together once using the existing project Reveal primitive. A thin moving wavy underline replaces Explore arrows while the project is in the central viewport region or its link has keyboard focus.

## Work
Use a screenshot-led single-photo gallery: a top filter toolbar with project count, then stacked projects with one full-column natural-ratio photo and title/purpose/details beneath. No hover-only images, second photo or numeric index. A title ("Things I’ve built.") and one line sit above the toolbar, set like the Notes and Labs intros (Garamond 20/25 and 16/24). Retain existing project identity, roles, context and honest status. Filters use the actual available statuses: All work, In build, Write-ups in progress; do not imply finished projects without evidence. Reuse CollectionFilter with a mobile select, visible selected state, keyboard focus and live result count. Garamond title/purpose; Montreal toolbar, count and role/context/status details. Keep the shared 660px column, white background, responsive gutters and footer.

## Notes
The page opens with the title "Writing is where I slow down." and the line "Notes on products, design and making things." Index rows use date | title: Montreal date, Garamond title, with no divider lines. Preserve chronological order and links. Articles use the same white column, Garamond 16/24px prose and 20/25px headings, with Montreal dates, back links and figure captions. Preserve actual text, images and Working note labels. Do not alter the shared article renderer’s other callers to restyle Notes.

## Footer and remaining routes
Two animated monkeys flank the centered CTA, including on phones. Footer stays sticky at the viewport bottom behind the opaque page layer: footer z-index 1, surface 2. The last content slides upward to reveal it. Keyboard focus reveals footer controls. Short viewports/reduced motion use normal flow. Preserve artwork, CTA copy, colors, responsive composition and interactions.

Case-study pages stay directly on a continuous white layer with uncropped, full-width images at their natural ratios and inset responsive text; no article container. Work/Notes styling must not modify them. Labs follows the shared system: white page, the 660px column for the nav and intro (Garamond 20/25 title, 16/24 line), and a horizontal media rail that starts at the column's left edge and scrolls on to the right. Tile titles are Garamond 20/25, captions Garamond 16/24 muted, kinds Montreal 12/18 muted. The native viewer is unchanged. About uses the Notes column: an "About" title, three paragraphs, a 16:9 photo (4:3 on phones) with a caption, "A little context" rows (Garamond name, Montreal detail and date, no dividers), then a full-height white contact section (`#contact`) with a left-aligned Garamond introduction and Montreal form labels. `/contact` redirects to `/about#contact` and the About page ends with it. The header has no Hello link.

## Motion and accessibility
Use `m` under LazyMotion/domAnimation strict mode. Reduced motion removes entrances and uses static underlines. Stop underline animation when offscreen. Keep decorative artwork hidden from assistive technology, meaningful media labelled, live text in the DOM, keyboard focus visible and interactive controls at least 44px. Dialogs support Escape and focus return. No automatic slideshow. Home has a native modal entrance on every full load or reload. After entering, client navigation back to Home within the same document goes directly to the hero. Escape skips it, reduced motion bypasses the animation, and ?intro replays it.

## Validation and scope
Run lint, standalone typecheck, webpack production build and `git diff --check`. Check 360, 390, 768, 1280, 1440 and 1920px for wrapping, navigation alignment and horizontal overflow. Verify route links, note reading, project reveals and both footer monkeys. Code checks do not establish visual acceptance; Gaurav reviews the preview. Keep changes on `experiments`, preserve unrelated work and do not commit/push without instruction.

## Interactive greeting window
Home opens on a plain white, full-viewport screen with the painted blue window centered above an enter control with a small wavy underline (24px gap, 44px target). Clicking enter opens the existing shutters over 950ms, holds the namaste for 700ms, then slides the entire opaque entrance screen upward over 1200ms with cubic-bezier(.65,0,.35,1), revealing the unchanged hero. No zoom or window relocation into the hero. Window height is 247.5px desktop, 225px mobile (25 percent larger); preserve its painted layers and the poster at 91 percent scale and 5 percent downward offset. The hero artwork position now holds Namma Auto; the window remains exclusive to the entrance. The native modal makes background controls inert and restores scrolling and hero focus on completion. Show on every full load or reload of Home; ?intro replays, Escape skips, reduced motion enters instantly, and no JavaScript leaves the page accessible. Reference material stays local; ship only used layers.

## Compact responsive typography update
Hero copy uses a regular introductory sentence and a light supporting paragraph with pretty wrapping. Its tone is conversational: learning by making, sharing products, experiments and process notes, and welcoming visitors to look around. Mobile Home starts 112px from the top; Work, Notes, Labs and About start 96px from the top. Shared mobile gaps are 40–48px, project caption gaps 12px, and contact card padding 24px by 16px. Case studies use the same Garamond hierarchy and 12px text inset while keeping images full width. Footer retains its illustrations, palette and composition; only text hierarchy and compact mobile spacing change. All interactive targets remain at least 44px. These mobile rules supersede the older mobile spacing values above.

Mobile footer: heading and description span the full width above a 1.25 : 1 : 1.25 monkey/CTA/monkey row with 4px gaps. Only Say hello sits between the monkeys. GitHub sits beneath the left monkey and LinkedIn beneath the right. Use balanced heading wrapping and pretty paragraph wrapping. Heading 18/22px, supporting copy 11/15px split into two sentence lines, and links 11px; enlarge both mobile monkey canvases to 115 percent of their grid columns; keep 44px controls. Desktop footer is unchanged.

Text tone: headings use the existing dark ink. Reading/body copy uses Regular 400 and warm grey #45433F; short supporting introductions use Light 300 in that grey. Metadata stays #6B6B6B. Keep text fully opaque rather than fading whole content blocks. Maximum permitted weight remains 500; the installed Book face is used for heading roles until a genuine Medium is supplied.

Home hero occupies one visible screen on desktop, tablet and phones using a 100svh minimum height compensated for page zoom. Its existing window/text composition is vertically centered with navigation clearance; projects begin after the hero. Allow natural expansion on unusually short screens so content does not clip. The mobile footer description has exactly two sentence lines; canvas enlargement is capped at 24px beyond each column to protect outer edges on larger mobile widths.

Hero introduction spans the full centered content column; do not apply the reading-prose measure cap to its description or lead. Keep natural pretty wrapping.

Hero links: only inactive resume (until a PDF is supplied) and dm me on X linking to https://x.com/gaurav_gupta241. Keep the X link specific to the hero; footer socials remain unchanged.

Hero copy stays concise: catchline fits one line and description uses 50–60 words, flowing naturally across the full hero column with no separate copy width or forced line breaks; aim for 3–4 lines on desktop, without truncation or clipping.

The inactive hero resume control retains the same dotted underline as the X link; it has no destination until a PDF is provided.

## Namma Auto hero illustration
Use the same-origin runtime at public/namma-auto, rebuilt from the editable source in experiments/namma-auto with npm run build:auto. Mount its embed adapter above the hero identity when Enter is tapped, while the greeting window opens. Download assets during the transition; begin the auto’s arrival and inactivity timer only when the hero is revealed. Returning visitors load it immediately. The art is 92 percent of its original scale (15 percent larger than the previous 80 percent): desktop slot 211.6×257.6px, mobile 184×230px, compensated for page zoom. Align the full road-and-flower scene to the hero column left edge, with no negative optical offset. Remove the initial prompt and visible loading title. The rear sign reads "Hiring?"; show the clickable "Hiring, yes?" prompt only while awaiting the second tap. Put the audio control immediately outside the scene’s right edge, aligned with its bottom corner, with a 10px rendered gap. Reserve the full artwork frame height followed by a 17.28px gap (20 percent less than the previous 21.6px) so it never overlaps the name. Clip the bottom 12 percent of the scene fade, leaving the separate audio and hiring controls intact. The auto stays parked indefinitely before the first tap, using a small silent double bounce every two seconds to invite interaction, starting 0.9 seconds after parking. Reduced motion keeps it still. Stop the bounce on the first tap. After Hiring? is shown, it leaves without navigating after three seconds without the second tap. Only a registered second tap navigates directly to /about#contact; taps during the turn animation are ignored. Keep audio controls and reduced-motion support. Master audio gain is 0.09075, preserving the requested 45 percent reduction. The embed adapter validates message origin and frame source before navigating to the fixed contact route. No receipt, printer, popup, or replay UI remains. Clean up the frame and listeners on route changes. Ship used runtime assets, editable implementation and required font licenses; exclude reference reports and documentation.

Footer CTA uses a light butter-yellow (#FFFDF2) pill, no border or shadow, visible dark Say hello label. Preserve the monkey composition; Say hello navigates to /about#contact.

The "Hiring, yes?" confirmation uses PP Neue Montreal Regular, left-aligned with the hero name. First tap shows the Hiring? sign; tapping the auto again or the confirmation runs the complete drive-away into the horizon before opening the About contact section (instant with reduced motion). Inactivity never navigates.

## Performance
Auto assets and fonts load concurrently. Export reduced-size WebP images from preserved originals, with content hashes and immutable caching; revalidate the manifest so new releases select new art. Include only the font weights/language subsets used by the auto. Pause the auto timeline, drawing and audio when offscreen or the tab is hidden. The footer requests its shared decoded monkey sprites within one viewport of the reveal and animates only when visible. Preserve fixed artwork/canvas dimensions to avoid layout shifts and all approved compositions.

The opening window frame uses Next Image responsive optimization and eager high-priority loading at its actual 150–166px width; shutters request 100px variants eagerly. Original window geometry, shutter motion, namaste crop and typography remain unchanged. The optimized auto runtime export is approximately 983KB versus 2.76MB before this pass; its five images are 526KB versus 1.61MB. These are uncompressed export totals, not network timings or Core Web Vitals measurements.

Contact uses thin-line inputs in two columns on desktop and one on phones, a full-width grey action, with no links beneath. The form validates required first name, email and message using native browser validation, then opens a prefilled email draft; it does not claim delivery or persist personal data. No card border, tinted container or shadow.

Remove decorative arrows throughout the site. Labs rail controls use Previous/Next text. Contact has no eyebrow or draft-help paragraph; the action remains explicitly labelled Open email draft.

Contact message field shows a friendly name/date template as placeholder guidance; users write their own message before opening a draft. The contact action uses a borderless soft-grey gradient with black text at rest and a charcoal gradient with white text on hover or keyboard focus; keep static low-opacity grain and the blue focus outline. Footer button is almost-white yellow #FFFDF2 with a brighter warm-yellow #FFEFAD hover; no border or shadow. Retain its shape and layout.

Footer Say hello has no underline in any state; social links underline only on hover. Contact first/last names accept up to 15 characters each, optional phone accepts exactly 10 digits when supplied, and email requires a valid address with a dotted domain. Message uses 1.65 line height, a softened placeholder and dark typed text.

Mobile browser chrome: use white #FFFFFF theme-color and light color-scheme, with white html/body backgrounds to match the white navigation and page. Keep the butter-yellow footer confined to its own section rather than tinting browser controls or overscroll.

Entrance Enter has no focus box; keyboard focus uses accent-colored text and a thicker existing wavy underline. Hiring? lights steadily with a tight glow; camera push-in finishes in 350ms, before the confirmation prompt appears.

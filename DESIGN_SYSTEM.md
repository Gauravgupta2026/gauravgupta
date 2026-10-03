# Portfolio design system

This document records the approved visual rules for the current portfolio redesign.

## Character

The site should feel precise, calm, human, and technically capable. Editorial typography and generous whitespace carry the story. The centered belief statement leads into a mountain photograph and a new introduction before selected work; the factual biography follows the projects. Electric-blue ASCII motion supplies the closing expressive moment.

## Color

- Electric blue: `#1235F5` for identity, primary actions, focus, links, and interactive emphasis.
- Ink: `#111111` for primary text.
- Navigation ink: `#000000`; quiet supporting copy uses `#505050`.
- Quiet surface: `#F3F3F3` for secondary controls and metadata.
- White: `#FFFFFF` for the page and text on electric blue.
- Purple is not part of the site-wide palette.

## Shape language

- **Square:** identity. The blue square may be used as an identity detail; the shared navigation has no name mark.
- **Capsule:** compact interface. Use for navigation controls, actions, filters, categories, tags, and small status labels.
- **Rectangle:** content. Use for imagery, galleries, project compositions, the ASCII sea, and page sections.
- Do not round content merely to repeat the capsule shape.

Capsules share a full radius but express hierarchy through fill:

- Navigation links: plain black uppercase DM Mono text without capsules or borders, including Say hello.
- Primary site action: electric blue with white text. Editorial project actions may use ink when the surrounding case-study composition requires it.
- Secondary action: quiet gray with dark text.
- Category or tag: quiet gray, regular-weight text, and an optional meaningful color dot.
- Featured-project capsules are omitted.

## Typography

- Inter is the structural voice for functional body copy, metadata, and project titles. Navigation uses DM Mono. Personal and long-form narrative use ITC Garamond Book 400.
- ITC Garamond is the editorial voice for section headings and one restrained emotional phrase in the hero. Individual project titles use Inter so featured and standard projects share one hierarchy.
- DM Mono belongs to navigation, technical annotations, and indices; the ASCII canvas uses its own monospace rendering.
- Hover states do not change font weight because changing metrics can cause layout movement.

### Responsive type scale

| Role | Desktop | Tablet | Mobile | Weight |
| --- | --- | --- | --- | --- |
| Name | 12–16px | 13px | 13px | Inter 700 |
| Navigation | 13px / 20px | 13px / 20px | 12px / 20px | DM Mono 400 |
| Hero | 40px / 56px | 40px / 56px | 24px / 32px | Inter 400 |
| Hero emphasis | follows hero | follows hero | follows hero | ITC Garamond italic 300 |
| Hero metadata | 10–15px | 11px | 10px | Inter 400–500 |
| Landing chapter heading | 32px / 40px | 32px / 40px | 28px / 34px | ITC Garamond 300 |
| Featured title | 28–34px | 24–29px | 22–23px | Inter 500 |
| Featured body | 14–15px | 14px | 14px | Inter 400 |
| Project title | 21–26px | 21–26px | 23px | Inter 500 |
| Project description | 13–16px | 14px | 14px | Inter 400 |
| Tag | 12px | 12px | 10px | Inter 400 |

## Opening composition

- Shared navigation contains centered Work, Labs, About, and Say hello links in black uppercase DM Mono, with no name, resume, capsule, or mobile menu. Use a fixed 80px row with a matching flow spacer. Hide it during scrolling and reveal it 180ms after scrolling stops, with a translucent white gradient and soft backdrop blur. Keyboard focus always reveals it; reduced motion disables the transition.
- The hero blends Natural’s centered, spacious composition with the existing Inter headline and ITC Garamond italic emphasis. A blue capsule links to selected work; the capsule is the sole hero action, with no supporting line below it.
- The opening contains navigation and centered hero copy, using a 668px opening including the 80px navigation at desktop and 500px on mobile. It leads into the existing mountain photograph inside the shared page gutters, with 120px before it on both desktop and mobile. Follow the photo with a new Bengaluru introduction about care in design and code, using a quiet 15px/24px left label and a 480px right reading column in Inter 15px/24px; hide the redundant left label visually on mobile. The image is 1200×640px at a 1440px viewport and 326×400px at 390px. Photo-to-copy spacing is 80px desktop and 144px mobile. Put the Manipal beach photograph and factual biography after projects. There is no sun section.
- The supplied Kapu beach ASCII scene, with its island, lighthouse, and dolphins, closes the landing footer. The complete footer, including its navigation and sea, is solid electric blue (`#0B2CFF`, matching the existing scene); use no background gradient or grain. The shared footer fits one viewport below the 80px fixed navigation. Use a two-row grid: naturally sized links/caption, then artwork filling the remaining height. Place “Kapu beach, near Manipal.” and “Best years!” below the navigation in Garamond Light, with a 24px gap and no translated offset. Use 32–56px top spacing; short viewports wrap the links horizontally. This replaces the earlier centimetre-based footer gaps. Keep the enlarged lighthouse anchored at the island surface and grow it upward. Fit its height to the available sky without moving the base. The island occludes tower pixels below the surface. The art resizes to the available footer space without changing the lighthouse’s anchoring. Gradually thin out the ASCII marks over the bottom 30% of the scene. Lazy-load the scene and retain pause/replay, offscreen suspension, and reduced-motion handling.

## Motion and interaction

- The footer scene plays automatically when visibly revealed on all input types; it does not wait for pointer entry.
- Pause animation when it is offscreen, the document is hidden, or reduced motion is requested.
- Keyboard focus and touch targets remain visible and at least 44 pixels high.
- The four navigation links remain visible on mobile; no menu overlay or scroll lock is needed.

## Responsive behavior

- Desktop capsules stay compact and secondary to the hero.
- Mobile navigation keeps the four links in a centered horizontal row with 44px tap targets.
- Project media may scroll horizontally on mobile, with sufficient exterior whitespace and native touch behavior.
- On mobile, the featured project keeps its label, title, short description, action, and one image. Supporting proof moves into the case study rather than crowding the landing page.
- Project galleries use a shared image height with varied portrait, square, landscape, and wide widths. This creates rhythm while keeping each project row visually coherent.

## Landing story, writing, and closing sections

The October 2, 2026 mockups establish these landing-page sections. The October 3 reference experiments refine their alignment, spacing, and opening/closing artwork:

- Biography: a 30–40px roman Garamond Light heading beside a reading column no wider than 480px on desktop; stack on mobile. Use Garamond Book 400 body copy and a right-aligned Inter Manipal photo caption.
- Writing: left-aligned editorial heading with an inline subtitle, kept close to the article grid; three desktop article columns with vertical rules and short underline accents. At 768px and below, use compact single-column rows with a small date beside each title, 24px row padding, and thin dividers; omit the decorative underlines. Use the published article titles and destinations.
- Closing: one lightly bordered contact card; the mountain photo now belongs beneath the hero. The emotional heading sits on the left; the role invitation and email action form one group on the right. Stack the card content on mobile. Omit the duplicate “let’s build something.” heading. The closing panel is the last white surface. It scrolls above a sticky blue footer to reveal its navigation and ASCII sea; omit “Fin”. Use normal flow for reduced motion, viewports shorter than 701px, and keyboard focus in the footer so its content stays reachable.
- The landing CTA uses a slightly rounded rectangular electric-blue button in Inter. Hovering anywhere in its container changes the surface to quiet grey, adds a white shadow, and emphasizes the border. Keyboard focus inside the container receives the same treatment. Disable transitions for reduced motion.
- Retain the additional 3cm above the unified contact card and 6.5cm to the closing panel’s baseline bottom padding below the CTA.
- These editorial body and action treatments specialize the general typography and capsule rules above. About retains its contact form; Work uses the direct contact card specified below. All routes use the shared minimal navigation and blue Kapu footer; About retains its email form.

### Reference adaptation boundaries

- Opening, story, writing, and project shells share `min(100%, 1280px)` width with 40px inner gutters on desktop and 32px on mobile. The footer retains its explicitly requested spacing.
- Use space to separate chapters, while keeping each heading close to its content. The writing heading-to-grid gap is 64–112px on desktop and 48px on mobile.
- Preserve the portfolio’s personal photographs and ASCII sea in its footer placement. Company benefits, open-role lists, corporate value claims, and borrowed imagery are not part of this adaptation.
- The PDF supplies desktop composition evidence only; mobile, hover, and motion behavior come from this design system. Visual acceptance remains a separate review.

## Work page

- Use an offset editorial opening that fills the viewport below the 80px nav, without a Selected Work eyebrow: “Ideas, worked through.” Follow it with Wylde, Sachetana, Lucky Day, and the research internship.
- Each desktop project header has four fields: title, premise, contribution, and a concrete project fact. Sachetana carries the team’s MAHE Research Day win; do not invent quantitative impact for other projects.
- Use Inter for project information and ITC Garamond Light for page and section headings. Share the 1280px shell and 40px desktop / 32px mobile inner gutter with the landing sections.
- Place compact, varied-width image strips below the project headers. Supplied October 3 images are temporary visuals without visitor-facing placeholder labels and live in replaceable content arrays. Thumbnail height is 144px on desktop and 176px on mobile. Confine horizontal overflow to each strip.
- Work galleries loop continuously at approximately 32px/second. Mix starting images across repeated sequences to fill the row. Pause on hover, keyboard focus, while the viewer is open, and offscreen. Hover and keyboard focus pause the row; no separate pause/play control is shown. Reduced motion uses a static, manually scrollable row. Fine-pointer hover and keyboard focus can show a larger preview if the viewport has room. Click or tap opens a native modal image viewer with close, previous/next, Escape, and focus restoration.
- Show one specific design choice below each strip. Remove the separate process panel, script thesis, and dark reflection interlude from Work.
- “A few questions” contains four native disclosure rows about role fit, personal contribution, further project details, and contacting Gaurav. Keep answers concise in `src/content/workPage.ts`. The proposed LLM chatbox and ASD-STE100 output are deferred; no compliance claim or chat service is part of this implementation.
- End with one lightly bordered contact card and direct email action, followed by the existing blue utility footer. The mountain remains on Home; every main route closes with the same Kapu scene.
- Stack project metadata, question headings, and detail rows on mobile. Keep focus visible, controls at least 44px, answers naturally sized, and animation removed for reduced motion.

## Typography consolidation decision

The next consolidation uses Inter for identity/interface/project information, ITC Garamond Light 300 for editorial headings, ITC Garamond Book 400 for personal and long-form reading, and DM Mono 400 for code and technical annotations only. Garamond Book’s root registration is corrected to its verified 400 weight. The registered families are now limited to these three voices across routes; the role matrix and type scale are recorded in `design-reports/typography-decision.md`. Retire overlapping and decorative live-text families after inspecting their consumers, including canvas-rendered text. Preserve supplied project artwork and the requested Garamond Kapu caption.

## Applied research refinements — October 3

- Hero: “I believe good products work well and feel right.” No identity subline or metadata block; Bengaluru belongs in the introduction below the mountain.
- The opening image and intro use a local once-only 12px / 500ms rise without scale. Text is readable at first paint; reduced motion uses the settled position. Shared Reveal behavior remains unchanged.
- The intro ends without bottom padding. Selected Works owns the next boundary: 240px desktop / mobile. Biography → Writing uses the same chapter gap. Preserve the explicitly requested contact and footer spacing.
- Shared main-route navigation uses black uppercase DM Mono, an 80px fixed row, four plain text links, and active-page state; omit the identity, action capsules, and mobile menu. Footer links use Inter; the Kapu caption retains Garamond Light.
- Work project gaps are 240–320px desktop and 160px mobile. Keep temporary image paths and descriptive alt text, but remove placeholder badges, gallery labels, and FAQ mentions.
- Font registration is Inter, ITC Garamond (300 roman/italic and 400 roman), and DM Mono. Article narrative is 22px desktop / 20px mobile in Garamond Book. Technical indices retain DM Mono; interface labels and fields use Inter.

## Rendered verification — October 3

The measured Home opening matches Natural at 1440×900 and 390×844 for headline size, line height, position, image dimensions, image gap, and first story paragraph position. Retain the portfolio's own fonts and wording. Actions stay at least 44px high; Natural's sampled hero action is 36px. Story length changes later absolute positions, so compare chapter gaps rather than total page height.

Landing project media dimensions are reduced 20% from their previous dimensions, including the featured frame and mobile strips. Text and chapter spacing are retained. The footer has no theme switch; stored dark-mode initialization is removed so visitors return to the visible light design.

Work image rows bleed to both viewport edges without side padding. Remove the earlier edge masks and chromatic filters; retain text alignment within the content shell. Links and buttons use labels without decorative arrows; image navigation says Previous and Next.

Landing project boundaries use whitespace without horizontal divider rules. Work’s opening title uses ITC Garamond Book 400 for a heavier statement; other editorial headings retain Light 300.

The mobile featured image fills the 32px-gutter content column at its native 5:4 ratio; the 20% media reduction applies to desktop featured imagery and supporting gallery strips. Remove the Work contribution disclosure; keep project contributions in the visible header metadata.

Hover image previews use the asset’s original aspect ratio within a 560×320px maximum, with no frame, padding, or white background. Keep the complete image visible without cropping or stretching.

Work case-study actions retain the explicit “Explore [project]” label in a quiet outlined capsule: Inter 13px, a neutral one-pixel border, at least 44px high, grey hover, and blue focus outline. Omit arrows. Keep project title links as an additional entry point.

Work FAQs occupy a full screen beneath the 80px fixed navigation, with vertically centered content and generous internal spacing. Use a minimum height rather than a fixed height so expanded answers grow naturally. The contact CTA follows below this section in normal flow.

Mobile Home chapter headings use Garamond Light 28px/34px consistently for Selected Works, biography, and Writing. Notes row titles use Inter 18px/26px, dates 12px, and the Writing subtitle uses quiet Inter 14px/22px on its own line. Keep compact single-column Notes rows; desktop typography remains unchanged. This deliberately refines the earlier exact Natural heading-size match to improve the portfolio’s own hierarchy.

Shared footer height is `calc(100svh - 80px)` on all routes; the blue footer and sticky navigation together fill one screen. No independent footer scrolling. Short-screen layouts wrap footer links so the caption and artwork stay visible.

Footer typography scales with the single-screen layout: Inter links are 14px desktop and 13px mobile, with 44px tap targets retained. Both Garamond caption lines share 20px/26px desktop and 18px/24px mobile; use 16px/22px on short screens. Caption line spacing is 6px.

On mobile, the ASCII island sits at 64% of the frame width with contained left and right shores. Scale the lighthouse to the mobile scene’s sky and width, keeping its base anchored to the sampled island surface. Desktop artwork geometry is unchanged.

## Labs reference grid

Labs shares Work's full-screen Garamond Book opening, 1280px shell, full-screen FAQ section, contact card, navigation, and single-screen blue footer. Its headline is “Things worth trying.” The project area uses the supplied October 3 reference: three equal columns, 3:2 imagery with 10px corners, Inter names and quiet descriptions below, no image overlays or card borders, and 120–200px vertical row gaps. Use two columns on tablets and one on phones, with 72px mobile row gaps. Preserve existing lab titles, status, and image seeds; the image pool stays temporary. Click opens a native dialog with Escape, visible close, scroll locking, and restored focus.

The mobile island shoreline is broadened on both sides while the lighthouse stays anchored; desktop geometry remains unchanged.

Work project information uses a compact Inter hierarchy: names 22px/28px desktop and 20px/26px mobile, premises 16px/24px, design choices 14px/22px, and supporting facts 13px/20px. Keep the full-screen opening headline unchanged. Project boundaries own the generous space; related fields stay close together.


## Release navigation and About

All routes share the centered Work, Labs, About, and Say hello navigation in black uppercase DM Mono. The main-route row remains 80px tall and sticky, with 44px targets and active-route feedback. About uses the confirmed project and Manipal history, the design engineering role, and the ambition to build and back products. Preserve the photographs, gallery interaction, and contact form.

The mobile island’s right-side spread is 0.38 of scene width, broadened from 0.19. Preserve the lighthouse’s base, island center, left shore, and desktop scene.

## Release stability

Work image strips measure their rendered sequence width to maintain 32px/second on desktop and mobile. Use compositor transforms and remove obsolete edge-filter layers. Reserve scrollbar space and restore image-trigger focus without scrolling when viewers close. Remove unreferenced legacy components, CSS, theme overrides, and duplicate footer caption IDs. The experiment ships only on its own branch.

## Release cleanup

The production release excludes the alternate landing route and its fonts/photos. Obsolete navigation, theme toggles, unreferenced legacy sections, and unused component styles are removed. Image viewer focus restoration uses preventScroll; stable scrollbar gutters prevent page-width shifts during dialog scroll locking.


## Main branch design port — October 4

These rules replace conflicting earlier rules for this release.

- Keep the named experiment navigation visible during scroll. Use an 80px desktop row and 64px phone row. Do not add scroll listeners or hide states.
- Use the experiment hero in Garamond Book 400. Desktop is 79.2px, tablet is 61.2px, and phone is 28px. The phone main branch hero was 24px.
- Fit the nav, hero, and 10% of the mountain image height within the first desktop screen. On phones, show 25% of the image and reduce the action gap to 24px. Use the existing 15:8 desktop mountain frame and 400px phone frame. Let short screens grow if the content needs space.
- Keep `/photos/mountains.png`, `/photos/beach-manipal.png`, the opening paragraphs, biography, note titles, and contact text from main.
- Story main text is 20px/30px desktop and 13.5px/21px phone. Biography and Selected Works headings use Garamond Book 64px desktop and 27px phone.
- Notes use full content width with one row per article. Titles use Inter 20px/28px desktop and 13.5px/19.5px phone. Dates use DM Mono 12px/20px and 9px/15px.
- Contact uses a white centered section with the main heading and role invitation. Use Garamond Book 64px and 27px for the heading. Copy uses Inter 18px/28px and 12px/18.75px. Use a quiet outlined capsule action. Keep the blue footer.
- Reduce landing project descriptions from 16px to 12.8px. Keep project assets, facts, routes, and gallery behavior from main.
- Work projects use title and premise above the gallery, then contribution, the existing fact or interaction, and the Explore action below it. Remove design choices from this view. Remove the unused design choice fields after checking their consumers.
- Work uses the same contact section and content as Home.

- Align the navigation name and contact action with the mountain photo edges. Use the same 1280px shell and page gutters. Keep 44px navigation targets on phones.
- Use 52px chapter headings from 810px to 1199px. Stack story columns at 1024px and below. Keep all text and actions within the device width.
- Project image links must open valid case studies. Research images open Work. Do not render document actions without a destination. Keep gallery drag separate from link clicks.

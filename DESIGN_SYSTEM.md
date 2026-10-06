# Portfolio design system

This document records the approved visual rules for the current portfolio redesign.

## Character

The site should feel precise, calm, human, and technically capable. Editorial typography and generous whitespace carry the story. Electric-blue ASCII motion supplies the primary expressive moment.

## Color

- Electric blue: `#1235F5` for identity, primary actions, focus, links, and interactive emphasis.
- Ink: `#111111` for primary text.
- Navigation ink: `#505050` for quiet utility text.
- Quiet surface: `#F3F3F3` for secondary controls and metadata.
- White: `#FFFFFF` for the page and text on electric blue.
- Purple is not part of the site-wide palette.

## Shape language

- **Square:** identity. The blue square belongs beside the name.
- **Capsule:** compact interface. Use for navigation controls, actions, filters, categories, tags, and small status labels.
- **Rectangle:** content. Use for imagery, galleries, project compositions, the ASCII sea, and page sections.
- Do not round content merely to repeat the capsule shape.

Capsules share a full radius but express hierarchy through fill:

- Navigation: white with a one-pixel neutral border.
- Primary site action: electric blue with white text. Editorial project actions may use ink when the surrounding case-study composition requires it.
- Secondary action: quiet gray with dark text.
- Category or tag: quiet gray, regular-weight text, and an optional meaningful color dot.
- Featured label: pale blue capsule with electric-blue text; it identifies hierarchy without competing with the project title.

## Typography

- Inter is the structural voice for navigation, body copy, metadata, and the name.
- ITC Garamond is the editorial voice for section headings and one restrained emotional phrase in the hero. Individual project titles use Inter so featured and standard projects share one hierarchy.
- Monospace belongs to ASCII art, technical annotations, and indices; it is not the identity font.
- Hover states do not change font weight because changing metrics can cause layout movement.

### Responsive type scale

| Role | Desktop | Tablet | Mobile | Weight |
| --- | --- | --- | --- | --- |
| Name | 12–16px | 13px | 13px | Inter 700 |
| Navigation | 11–14px | 13px | 13px | Inter 400 |
| Hero | 25–50px | 25–38px | 22–28px | Inter 400 |
| Hero emphasis | follows hero | follows hero | follows hero | ITC Garamond italic 300 |
| Hero metadata | 10–15px | 11px | 10px | Inter 400–500 |
| Section heading | 30–40px | 30px | 30px | ITC Garamond 300 |
| Featured title | 28–34px | 24–29px | 22–23px | Inter 500 |
| Featured body | 14–15px | 14px | 14px | Inter 400 |
| Project title | 21–26px | 21–26px | 23px | Inter 500 |
| Project description | 13–16px | 14px | 14px | Inter 400 |
| Tag | 12px | 12px | 10px | Inter 400 |

## Opening composition

- Desktop navigation retains the original three-part arrangement: identity, section links, and actions.
- The hero remains an offset two-line statement with generous breathing room.
- The ASCII sea occupies half of the initial viewport and is the opening's signature motion.
- Decorative sky detail remains quiet so the dolphin is the focal point.

## Motion and interaction

- Motion begins through intentional engagement: pointer entry on hover-capable devices and viewport entry on touch devices.
- Pause animation when it is offscreen, the document is hidden, or reduced motion is requested.
- Keyboard focus and touch targets remain visible and at least 44 pixels high.
- Opening the mobile menu blurs and dims the page beneath it and locks page scrolling.

## Responsive behavior

- Desktop capsules stay compact and secondary to the hero.
- Mobile navigation uses spacious rows inside one menu panel rather than a cloud of individual chips.
- Project media may scroll horizontally on mobile, with sufficient exterior whitespace and native touch behavior.
- On mobile, the featured project keeps its label, title, short description, action, and one image. Supporting proof moves into the case study rather than crowding the landing page.
- Project galleries use a shared image height with varied portrait, square, landscape, and wide widths. This creates rhythm while keeping each project row visually coherent.


## October 6 restoration

Restore the October 2 main snapshot (`b1617a2`) for the site, including its original navigation, offset hero with metadata, electric-blue ASCII dolphin sea, project galleries, personal story, and contact footer. Preserve the newer standalone Notes index as the only later design addition: white theme, centered 960px column, regular Inter Notes heading at 64px desktop / 32px mobile, minimal title/type/date rows at 14px/22px desktop and 13px/18px mobile, quiet metadata, no cards or dividers. Keep a Notes navigation item, link rows to existing articles, route article back-links to `/notes`, and omit the landing Notes teaser. Notes CSS stays scoped to its route so its typography does not change the restored site.

Retain the current main dependency manifest and lockfile, including its Next.js security updates; the restoration targets site design and content, not dependency downgrades.

## Creative Giants reference study — October 6

The latest user correction supersedes the frosted-name opening. On branch design/frosted-name, reproduce the Creative Giants opening geometry and motion: edge-to-edge screen-blended white surface, custom condensed name wordmark revealing blurred background video, circular identity and black Menu capsule, white supporting copy over fixed video, downward clipped reveal followed by wordmark and copy fades. Switzer regular/light supplies UI and copy. Checklist: design/frosted-name/CHECKLIST.md. The later selected-work study below replaces reference footage with licensed local nature clips and the condensed wordmark with Instrument Serif.

## Selected work and signature study — October 6

Edna-inspired selected work uses a dark horizontal sequence, large 8px-radius media surfaces, title and one-line purpose below, and quiet role/platform/status metadata plus one concise design problem. Desktop scroll advances the horizontal rail inside a sticky viewport; previous/next controls and focus keep projects reachable. Mobile and reduced motion use native horizontal scrolling and scroll snap. No user metrics are added. Content meanings are confirmed by Gaurav: Wylde is the party card game, Lucky Day is the slot-machine study, Sachetana is student wellness. Sachetana reuses its actual interface image; other covers are clearly labelled original art direction, not app screenshots.

The name study now uses Instrument Serif regular by default, with smooth outlines and a 13vw desktop size (250px cap), 17vw on mobile; enlarged after Gaurav found the smaller setting too slight within the panel. Seratonin is rejected for this opening. Compare `?type=italic` (Instrument Serif italic), `?type=editorial` (Cormorant Garamond), and `?type=bodoni` (Bodoni Moda). Each has optical sizing and letter spacing adjusted individually rather than being stretched to fill the panel. The original full-width reveal panel and its proportions remain. These are review options, not approved final identity fonts. Background footage now uses locally compressed Pexels clips: desktop lakeside wildflowers with restrained warm grading; mobile dandelions beside water at sunset. Both use forward/reverse loops, are muted, and respect pause/reduced motion. Asset sources and licence link are in public/media/SOURCES.md. The Creative Giants showreel is no longer loaded.

## Edna Ho hero replacement — October 7

The current user instruction supersedes the white reveal panel, large name, and nature-video direction. Match https://ednaho.com/: #0A0A0A full-screen canvas, pink-white halftone orchid, radial five-second bloom, subtle breathing and ripple, central dark elliptical fade, centred small italic name and two-line introduction, and white corner navigation at 24px with 32px link gaps. Text fades from 3.8 seconds and navigation reveals from 4.25 seconds. Mobile uses 85dvh, text at 61% rather than 53%, and navigation with 8px side insets. Hero leads directly into the existing selected-work rail. Albert Sans matches reference UI; locally licensed Cormorant Garamond italic is the name substitute for reference Minister Book Italic. The orchid luminance mask is sourced from the reference site for this exact reproduction study, with attribution in public/media/SOURCES.md. Native focus and reduced-motion equivalents are retained.

## Tagore opening story and project index — October 7

This modification supersedes the simultaneous orchid/profile reveal. A shared canvas clock controls the complete sequence: bud-to-open bloom over 3.6 seconds. The flower reaches its final size and position in one continuous bloom; there is no later expansion during the profile reveal. The first poem line begins at 2.04 seconds, approximately 60% of the eased bloom. Lines reveal at 2.04–2.54 and 2.17–2.67 seconds with a 6px rise and 2px-to-zero blur; attribution follows at 2.3–2.75 seconds. All quote content then holds fully visible for 0.4 seconds before fading out at 3.15–3.6 seconds. Name/profile reveal follows at 3.6–4.4 seconds; navigation and the rest of the page become available at 4.4 seconds. Eased lateral opening, restrained glow and slow expansion carry the emotion; no typewriter effect or word-by-word animation. Pause freezes the full scene. Skip introduction and reduced motion reveal the final hero directly. Scrolling is locked during the single-screen preload.

Poem: “The infant flower opens its bud and cries, ‘Dear World, please do not fade.’” — Rabindranath Tagore, Stray Birds, no. 66. Verified against Tagore Web and the Jadavpur University Bichitra manuscript archive. Italic poem typography at 19px desktop / 17px mobile, quiet attribution; no invented connective copy.

Project navigation uses three numbered name buttons with a fine active underline. Remove both circular previous/next arrows and diagonal title arrows. Preserve native scrolling, keyboard focus and direct case-study links.

## Lily scene and project controls — October 7

The lily supersedes the orchid mask. Render original six-petal geometry using native WebGL: a closed silver bud rises and completes one 360-degree turn while unfolding continuously over 3.6 seconds. Retain the original Edna-inspired screen-aligned silver/white dots, stronger pink tint and pink halo. The later correction rejects champagne pink, silk fibres and chrome surface texture. Preserve the shared quote/profile timeline, pause, skip, hidden/offscreen pause, and reduced-motion still state. User lily images are material and form references only; no supplied photograph is shipped in the hero. Pink lily references remain reserved for a later light-mode study (see design/frosted-name/LILY-DIRECTION.md).

Selected work starts with the full first project, with no leading text column. Exactly three controls: View More links to the active case study; fine-stroke left/right arrows in quiet 44px circular touch targets move between projects and disable at the ends. Group all three tightly on the right. A 1px progress line below the rail carries a one-third-length marker, moving with the continuous scroll position; expose the active project through accessible progress values. Preserve hiring context and native mobile scrolling.

Lily refinement: rechecked the live Edna Ho source on October 7. Match its responsive cell pitch (`812 + 0.105 × viewport width`, scaled below 840px, divided by 96 and rounded; minimum 3px mobile / 5px desktop), dot radius (`0.62 × pitch × brightness^0.72`) and original pink tint. Native WebGL reproduces that screen-aligned dot field over the rotating lily geometry. Add only sparse tiny centre glints; no floating glitter cloud. The turn/unfolding takes 3.6 seconds with soft acceleration and deceleration, ending in a slow breathing tilt rather than another expansion.

## Single-screen lily preload — current direction

This supersedes all earlier opening durations and scroll-through behavior. The full active sequence is 4.4 seconds: continuous 360-degree lily unfolding from 0–3.6s, quote starting at approximately 60% bloom, quote fully visible by 2.75s and held for 0.4s, quote fade at 3.15–3.6s, hero reveal at 3.6–4.4s. During the preload the opening is 100dvh, scrolling is locked, the nav is hidden/inert, and projects are not mounted. The hero retains the same full viewport height through the reveal so the lily does not jump or rescale. At completion page scrolling returns and navigation/projects become available. Skip, reduced motion and renderer failure bypass the preload. Manual pause and hidden-tab pause remain available.

Reference breakdown and implementation checklist: `design/frosted-name/EDNA-FLOWER-CHECKLIST.md`. Use native Canvas 2D for Edna's exact radius, silver/white threshold, pink halo, white glow and continuous brightness modulation over a small GPU-generated lily luminance buffer. No petal surface texture experiments.

## Restored Edna orchid — latest correction

Restore the original reference orchid luminance artwork (`public/media/orchid-luminance.png`) and native silver/white halftone rendering. The lily experiment is rejected and its renderers are removed. Preserve the 4.4s full-screen preload, 0.4s full quote hold, hidden/inert navigation, deferred project mounting, and single 360-degree rise/unfolding from compressed bud to the reference's open silhouette. The rising turn is a stylized dot-field transformation of the original mask, not a botanical 3D model. Fit the flower against viewport width and height on laptop, tablet and mobile, leaving room for the quote. Preserve source attribution, round brightness-scaled dots, pink/white glow, continuous shimmer, subtle sample ripples and sparse centre glints.

## Exact Edna motion and paced preload — current direction

This supersedes the rotating bud transformation and all earlier timing. Use the original orchid mask with Edna's cubic ease-out radial reveal (`1 - (1 - progress)^3`), uniform 60–100% scale opening, 1.8% breathing, subtle centre drift, coupled sampling ripples and continuous brightness modulation. Remove rotation, rising movement, perspective projection and added glitter. Retain the reference dot pitch, radius, silver/white threshold, native pink/white glow, pink tint and delayed pink outer halo. Responsive framing fits short screens without changing these motion equations.

Total active preload: 7.1 seconds. Bloom runs continuously from 0–5.4s, stretched from the reference's five-second motion clock. The quote starts when cubic-eased bloom reaches 30% (about 0.605s), reveals softly over 0.85s including attribution, and stays visible through the rest of the bloom. Quote fades at 5.4–6s. A flower-only pause lasts from 6–6.35s, followed by the hero reveal at 6.35–7.1s. Navigation and projects become available at 7.1s; scrolling unlocks then. Full-screen 100dvh, pause, skip, hidden-tab suspension, reduced-motion bypass and renderer-failure fallback remain. No secondary bloom occurs during the hero reveal.

Handoff stability: reserve scrollbar space throughout the opening, size the canvas to its actual container, and retain display-rate animation frames through the complete opening and hero reveal. The quote threshold is 30% actual eased bloom, not 30% elapsed duration.

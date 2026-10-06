# Creative Giants hero — correction and reference study

The October 6 screenshot and latest instruction supersede the frosted sheet. The composition is reproduced with Gaurav's identity and draft portfolio copy.

## Measured composition

Reference screenshot: website area approximately 1920 × 908px, excluding browser chrome. Left/right margin about 37px (1.94vw). Navigation starts about 28px below the website top. Identity is a 46px black circle with two compact uppercase lines; Menu is a black capsule about 97 × 51px at the right. There are no horizontal navigation links.

The name artwork starts about 183px below the website top and is about 408px tall. The white panel ends about 633px below the website top. Artwork spans almost the full width. Creative Giants uses vector paths, not an ordinary font. The signature letters are very narrow, heavy, uppercase, with small counters and diagonal cuts. A custom geometric alphabet spells GAURAV GUPTA at the same 307:68 artwork ratio.

The white panel is edge-to-edge. It has no margin, foil line, grain, radius, paper layers or shadow. The lettering reveals muted blurred colours from the video. Live source confirms a black SVG on a white surface using screen blending, with a separate 20px backdrop blur and 50% white layer below. The video itself is fixed, viewport sized and object-fit cover.

Below the panel, uppercase location and a large Switzer Light statement sit at the bottom left directly over the unblurred footage. The live hero is 140svh and the lower copy region uses sticky bottom positioning. Natural scrolling carries the white panel upward and reveals more footage before the next opaque section.

## Entrance from live source

1. Initial 1-second delay.
2. White panel reveals from top to bottom over 1 second with a downward clip-path reveal. It does not translate like a floating sheet.
3. Wordmark opacity enters over 1 second, starting at 1.9 seconds.
4. Copy opacity enters over .7 seconds, starting at about 2.4 seconds.
5. Video continues behind both regions; text colour varies with its blurred frame.

## Checklist

- [x] Full-width white panel and measured inset proportions.
- [x] Initial condensed vector study completed; superseded by Instrument Serif below.
- [x] Video visible through lettering, blurred only behind the name panel.
- [x] Fixed, cover-sized muted looping video.
- [x] Circle identity / two-line descriptor and black Menu capsule.
- [x] Switzer Regular UI and Switzer Light large white copy.
- [x] Downward clipped reveal, then wordmark and copy fades.
- [x] Sticky lower copy and native scroll.
- [x] Functional native modal menu with Escape and keyboard focus.
- [x] Reduced motion, offscreen/hidden video pause, manual pause.
- [x] Mobile geometry without horizontal overflow.
- [ ] Gaurav's visual acceptance.

Source: https://creativegiants.art/ and its live HTML/CSS, inspected October 6. The reference showreel and poster were temporary study assets and have been removed; the current version uses licensed local nature clips. Branding text and wordmark are Gaurav's. No source screenshot is embedded in the site.

Initial condensed-study verification (historical): build, lint and standalone typecheck completed cleanly. At a 1920 × 908 embedded review viewport, the panel ends at 632.72px, artwork starts at 186.66px and measures 1845.34 × 408.73px; these match the screenshot geometry. At 390px, no horizontal overflow. Native menu opens with focus on Close and returns focus to Menu. Preview recordings were inspected; reference footage varies frame by frame.

## Following round

- Superseded by the smoother name type study: Instrument Serif regular default, Instrument italic, Cormorant Garamond, and Bodoni Moda. Seratonin is removed from the hero.
- Selected work follows Edna's horizontal media/caption arrangement with added hiring context.
- Project descriptions confirmed by Gaurav in this thread.
- Locally hosted nature video replaces the reference showreel; asset details in public/media/SOURCES.md.

## Smaller name type study

- [x] Preserve reveal panel geometry; reduce name size independently.
- [x] Serve licensed smooth-outline fonts locally, with individually adjusted spacing.
- [x] Keep comparisons in review URLs rather than visitor controls.
- [x] Remove unused condensed wordmark component.

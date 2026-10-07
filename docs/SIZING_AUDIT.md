# Shared layout verification — 7 October 2026

## Current requirements

- [x] Main keeps the existing orchid hero, palette, poem and mobile opening fix.
- [x] Experiments adds the flower bed and revised hero typography.
- [x] Shared horizontal root navigation, aligned gutters and one CTA/footer per route.
- [x] Work/Labs/Notes introduction: 45svh; CTA: at least 55svh; footer/art: balanced content-driven spacing.
- [x] Work/Labs: four filter buttons above 600px; native dropdown on phones.
- [x] Project captions share Switzer 18–20px, purposes 14px, facts 12px.
- [x] Phone media share 16:10 frames; Labs: three cards desktop, two tablet, one phone.
- [x] About: 16px Switzer, 1.35 line height, 24px paragraph gaps, no visible About heading.
- [x] Bracketed page status labels and phone project problem copy removed.
- [x] Native mobile rails without snapping; passive frame-coalesced gallery updates only at boundaries.
- [x] Footer caches layout geometry; hero animation loops pause offscreen.

Build, lint and TypeScript checks run separately on the main-compatible and full experimental versions. Browser checks cover layout, filters, overflow, opening handoff and scroll behavior; desktop phone emulation does not establish real-device frame rate. No dependencies or external contracts changed; no automated suite exists. Visual acceptance remains Gaurav's review.

Mobile browser measurements at 390 × 844: Work/Labs intro 379.8px; CTA 464.2px; project previews 327 × 204.4px; one main navigation and footer; no document overflow. Labs Prototypes returns two cards and correctly disables Next at the end. Main skip-intro handoff completes at scrollY=0 with one navigation. Real phone scrolling still needs user review.

## Main landing interaction refinement

- [x] Remove native gallery scrollbar so only the custom progress line remains.
- [x] Current project read action fills white; inactive actions return to neutral.
- [x] Fade project progress when the section exits, including desktop unpinning.
- [x] Replace the fixed footer spacer with shared art/closing tokens; gap from CTA action to footer equals trailing space.
- [x] Main name is upright ITC; intro skip button removed; pause/play is a faint labelled icon.
- [x] Persistent layout provider prevents intro replay on internal Home navigation.
- [x] Verify fresh load, internal return, project activation and balanced footer in mobile/desktop preview.

Final checks: fresh Home load enters playing then complete at scrollY=0; no Skip introduction control; ITC normal weight 300; native gallery scrollbar hidden. Mobile swiping and desktop scroll advance the single white read action. Leaving the section sets progress inactive/opacity zero. Leaving during the intro and returning Home, or starting at About then navigating Home, immediately shows complete/opacity one without replay. At 390 × 844, CTA action-to-footer and trailing footer gap are both 101.27px; CTA remains 464.2px (55svh). Build, lint, TypeScript and whitespace checks pass.

Shared inner-page canvas fix: html and body use #0a0a0a with dark color-scheme; root theme-color matches. This removes the legacy white backdrop below Work, Play, Notes and About footers. Home retains its route-specific palette override.
Verified at 390px on /work, /labs, /notes and /about: html/body computed rgb(10,10,10), root color-scheme dark, theme-color #0a0a0a. Build, lint, TypeScript and diff checks pass.

## Detail-page and waterline refinement

- [x] Notes: title/date and mono TL;DR followed by one rule; remove the article return-link footer.
- [x] Cases: remove top kicker, reduce ITC title to 28–44px, retain 16px Switzer prose, replace stack words with labelled local logos.
- [x] One next-project word link at the reading measure, without a thumbnail collection.
- [x] Labs dialog: repair centering, constrain viewport bounds, put close control in flow, align caption scale with cards.
- [x] Footer: slow active-time drift, dissolution at landing via halftone mask, three finite outward water ripples; stop when settled/offscreen/hidden.
- [x] Verify phone/tablet/desktop, both themes, dialog boundaries and footer phases.
- [x] Build, lint, typecheck and diff checks.

- [x] Ignore stale legacy theme preference; one shared key/palette for bootstrap and controller.
- [x] Add a faint footer sun/moon switch with accessible label and 44px target.
- [x] Verify live device appearance changes and explicit footer choices across navigation.

Validation: 20 detail-layout checks across 390×844, 820×1180, 1440×900 and 844×390, in both themes. No horizontal overflow. Dialog stays inside viewport margins; short landscape content scrolls internally. Close restores card focus; modal root scroll lock clears on close. Cases use four logo items for Wylde, one next-project link, no top kicker, title 28px phone / 44px desktop. All nine logo assets return HTTP 200. Final Notes check confirms TL;DR above the rule and no All notes link.

Theme regression reproduced before the fix: emulated dark device + legacy `theme=light` resolved light. After the fix it resolves dark, then follows a live change to light. The footer icon switches to dark, stores `portfolio-theme=dark`, and retains it on navigation. Preview appearance and explicit test preference were reset to system/default afterward.

Footer phase observations: smooth drift before impact; wilt reaches 1 and dot radius reaches 0 at dissolution; all three wave paths receive geometry; progress reaches 1, settled becomes true and every ripple opacity returns to 0. The scene has no continuous shimmer or scroll handler. Real-device frame rate and subjective timing remain visual-review items. Final lint, webpack production build, standalone typecheck and diff check pass.

## Hero tint and directional footer hairline

- [x] Trace original tint delay (4.48s) and glow delay (6.26s plus CSS fade).
- [x] Start dark orchid tint/glow about 0.6s into bloom; finish at 3.51s without secondary filter lag. Preserve palette and opening handoff.
- [x] Remove footer botanicals, dithering, atlas and unused motion code sitewide.
- [x] Keep a static hairline; trigger only on a downward cursor crossing from above. Footer hover/upward entry/scroll/touch stay inert.
- [x] Three subtle waves settle in 2.3s; no automatic animation or retrigger while active.
- [x] Preserve theme tokens, spacing, reduced motion and hidden/offscreen cleanup.
- [x] Add regression checks for direction and hero tint timing.
- [x] Browser: dark hero tint observed at 0.827 during the opening, later 1.000; no secondary CSS fade. Light hero retains its original palette/filter.
- [x] Browser: no automatic ripple; upward approach and footer hover stay inactive; downward crossing animates wave geometry, then all three paths return to opacity zero. No botanical elements remain; light hairline uses light theme tokens.
- [x] Lint, regression script, production build, standalone typecheck and diff checks pass.
- [ ] Physical-phone visual check: collaborative preview resizing timed out for both freeform and preset modes, remaining at 1169×731. No mobile-specific layout changes were made.

Earlier botanical phase observations above describe the superseded implementation. The directional hairline is the current footer specification.

## Final image and light-accent refinement

- [x] Work image frames use 90% width and height, preserving aspect ratios and alternating columns; mobile captions follow the reduced image width.
- [x] Landing image heights use 110% of their previous height on desktop/tablet/mobile; image widths remain unchanged. Scoped selector wins over the shared frame sizing.
- [x] Responsive image `sizes` matches reduced Work frames. Labs geometry and shared typography remain unchanged.
- [x] Light accent/cursor follows yellow hero; readable gold tokens cover focus, progress and hairline ripples. Dark accents remain pink.
- [x] Final computed styles checked in same-origin responsive frames at 390, 820 and 1440px: Work widths/heights scale to 90%; Landing heights scale to 110%. At 390px, Work is 293×183px and Landing is 326×224px (fractional scrollbar gutter included). At tablet width, Work is 432×270px and Landing is 480×330px. Light cursor resolves to RGB(255,207,77); dark remains pink. Build/lint/typecheck and direction/timing regressions pass.

## Work image-pair refinement

- [x] Reduce paired-image gap to 16px desktop / 12px stacked.
- [x] Increase secondary frame width/height by 10% from its current size, preserving aspect ratio; primary frame retains 90% scale.
- [x] Update responsive source sizes and authoritative sizing rules.
- [x] Computed styles verified at 390 / 820 / 1440px, with no horizontal overflow. Secondary mobile frame is 322×201px against primary 293×183px; tablet secondary is 475×297px against primary 432×270px. Gaps resolve to 12px stacked / 16px desktop. Lint, build, typecheck and existing regressions pass.

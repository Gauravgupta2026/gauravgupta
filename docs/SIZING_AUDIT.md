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

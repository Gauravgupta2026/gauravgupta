# Shared layout verification — 7 October 2026

## Current requirements

- [x] Main keeps the existing orchid hero, palette, poem and mobile opening fix.
- [x] Experiments adds the flower bed and revised hero typography.
- [x] Shared horizontal root navigation, aligned gutters and one CTA/footer per route.
- [x] Work/Labs/Notes introduction: 45svh; CTA: at least 55svh; footer/art: 40svh.
- [x] Work/Labs: four filter buttons above 600px; native dropdown on phones.
- [x] Project captions share Switzer 18–20px, purposes 14px, facts 12px.
- [x] Phone media share 16:10 frames; Labs: three cards desktop, two tablet, one phone.
- [x] About: 16px Switzer, 1.35 line height, 24px paragraph gaps, no visible About heading.
- [x] Bracketed page status labels and phone project problem copy removed.
- [x] Native mobile rails without snapping; passive frame-coalesced gallery updates only at boundaries.
- [x] Footer caches layout geometry; hero animation loops pause offscreen.

Build, lint and TypeScript checks run separately on the main-compatible and full experimental versions. Browser checks cover layout, filters, overflow, opening handoff and scroll behavior; desktop phone emulation does not establish real-device frame rate. No dependencies or external contracts changed; no automated suite exists. Visual acceptance remains Gaurav's review.

Mobile browser measurements at 390 × 844: Work/Labs intro 379.8px; CTA 464.2px; project previews 327 × 204.4px; one main navigation and footer; no document overflow. Labs Prototypes returns two cards and correctly disables Next at the end. Main skip-intro handoff completes at scrollY=0 with one navigation. Real phone scrolling still needs user review.

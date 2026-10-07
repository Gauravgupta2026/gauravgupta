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

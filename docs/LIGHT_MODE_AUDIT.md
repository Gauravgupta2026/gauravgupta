# Theme and reading-page checklist — main

- [x] Audit active routes and callers; separate UI colors from intrinsic artwork.
- [x] Unify saved preference and device theme selection; synchronize the hero canvas.
- [x] Theme root canvas, browser metadata, safe areas and scrollbars.
- [x] Theme navigation, page introductions, filters, cards, dialogs and active project buttons.
- [x] Theme CTA, footer and botanical divider.
- [x] Fix landing View More to /work.
- [x] Align case-study headings, prose, labels, measure and spacing with the design system.
- [x] Preserve Notes structure and mono body; reduce scale, move date above title, remove source/repeated date, use one introduction rule.
- [x] Remove fixed-height clipping in expanded case-study answers.
- [x] Update DESIGN_SYSTEM.md.
- [x] Verify light/dark routes and navigation at phone, tablet and desktop sizes.
- [x] Run lint, production build, typecheck and diff checks.

Intrinsic photos, SVG illustrations and the botanical atlas retain their art palette. Unmounted legacy landing/footer components are outside the active-route migration.

## Verification

Lint, standalone typecheck, production webpack build (20 generated pages), and diff checks pass without warnings. Browser checks covered seven route templates at 390×900, 820×900 and 1440×900 in both themes (42 checks): document/main/navigation/footer colors, browser theme metadata and horizontal overflow. Additional 390×844 checks verified the Labs dialog/filter, Wylde case typography, Notes mono font (14px), June 2026 date and one introduction rule. Saved light survives navigation; clearing the preference follows the device. Home canvas theme follows the resolved document theme, including switching in place. View More links to /work.

Text contrast: light primary 13.35:1, supporting 5.40:1 (4.84:1 on media surfaces), focus 6.43:1; dark primary 18.31:1 and supporting 7.94:1. Physical Safari toolbar rendering still depends on the browser; document safe-area colors and theme-color metadata were verified in the collaborative preview. Broad aesthetic acceptance remains the owner's review.

# Design port checklist

Branch: `port-experiment-design`. Base: `origin/main` at `1c298a1`.

1. [x] Compare main and experiments. Keep main content and assets.
2. [x] Port name navigation and keep it visible during scroll.
3. [x] Port hero type and fit the first screen with a 10% desktop and 25% phone image preview.
4. [x] Keep main mountain image, opening story, and biography.
5. [x] Apply accepted story, notes, and contact type sizes.
6. [x] Make notes full-width single rows.
7. [x] Match Selected Works type and reduce descriptions by 20%.
8. [x] Update Work rows and remove design choices from the view.
9. [x] Share the updated contact section with Work.
10. [x] Check layouts and code.
11. [x] Align navigation edges with the mountain photo.
12. [x] Check project links, case study routes, and image viewers.
13. [ ] Open a PR to main.

This PR ports selected changes. It does not merge the experiments branch or add
its alternate route, photos, or metadata. Case study changes fix routes and keep the page above the footer.


## Check results

- Home first-screen image preview: 10% on desktop and 25% on phones.
- Home hero: 79.2px desktop and 28px phone. Main phone type was 24px.
- Home, Work, Labs, About, three case studies, and a note: no horizontal overflow at 320px, 768px, and 1440px.
- Navigation: visible at the top after scroll.
- Work: title and description precede the carousel. Contributions, facts, and Explore follow it. Design choice text is absent.
- Contact: Home and Work share one component with the original main text.
- `npm run lint`, `npx tsc --noEmit`, `npm run build -- --webpack`, and `git diff --check`: passed.
- No dependencies or tests were added. No secrets were added.
- Physical phones and Safari were not checked. Visual acceptance remains with the user.

- Internal link crawl: ten linked pages returned successful responses. All section anchors exist. No empty or placeholder links remain in the rendered pages.
- Work image viewer: open, next, previous, and close actions passed. Labs preview open and close passed.
- Email actions require a configured email application. No email was sent.

- Phone image preview: exactly 25% at 320×568 and 390×844. Desktop preview: 10% at 1440×900.
- Navigation outer edges match the mountain frame at all three widths.
- Featured and gallery image clicks opened Wylde and Sachetana. Case study decision and FAQ buttons changed their open state.
- Unknown project addresses show a 404 page with Home and Work links.

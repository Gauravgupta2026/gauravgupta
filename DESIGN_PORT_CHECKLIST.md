# Design port checklist

Branch: `port-experiment-design`. Base: `origin/main` at `1c298a1`.

1. [x] Compare main and experiments. Keep main content and assets.
2. [x] Port name navigation and keep it visible during scroll.
3. [x] Port hero type and fit the first screen with a 10% image preview.
4. [x] Keep main mountain image, opening story, and biography.
5. [x] Apply accepted story, notes, and contact type sizes.
6. [x] Make notes full-width single rows.
7. [x] Match Selected Works type and reduce descriptions by 20%.
8. [x] Update Work rows and remove design choices from the view.
9. [x] Share the updated contact section with Work.
10. [x] Check layouts and code.
11. [ ] Open a PR to main.

This PR ports selected changes. It does not merge the experiments branch or add
its alternate route, photos, metadata, or case study changes.


## Check results

- Home first-screen image preview: 10% at 1440×900, 390×844, 320×568, and 844×390.
- Home hero: 79.2px desktop and 28px phone. Main phone type was 24px.
- Home and Work: no horizontal overflow at desktop and phone widths.
- Navigation: visible at the top after scroll.
- Work: title and description precede the carousel. Contributions, facts, and Explore follow it. Design choice text is absent.
- Contact: Home and Work share one component with the original main text.
- `npm run lint`, `npx tsc --noEmit`, `npm run build -- --webpack`, and `git diff --check`: passed.
- No dependencies or tests were added. No secrets were added.
- Physical phones and Safari were not checked. Visual acceptance remains with the user.

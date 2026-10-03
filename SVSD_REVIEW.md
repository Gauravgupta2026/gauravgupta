# Landing page review

Date: October 3, 2026. Branch: `experiments`.

## Reference

Use the attached SVSD PDF and the local SVSD research records in `design-reports/`.
The PDF supplies desktop evidence. The research supplies the phone rules.
The user requested replacement of the earlier landing experiment.

## Section checks

The opening and introduction were checked first. The work, story, notes, and
contact sections were then checked in that order.

| Section | PDF comparison | Result |
| --- | --- | --- |
| Opening | Page 1: centered serif heading, outlined action, wide media | 88px heading; 1040px heading width; 16:9 photograph |
| Introduction | Page 1: large section gap and centered content | 648px reading width; 180px desktop gap; personal text |
| Work | Page 2: paired frames and outlined actions | Two 532 by 333px frames; 56px gap; full images visible |
| Story | Pages 3 and 4: centered heading and personal photograph | 648px photo; personal history below it |
| Notes | Research plan: dated notes with real destinations | Three published notes; source titles kept |
| Contact | Page 5: centered heading, short text, outlined action | One email action; white surface before the Kapu footer |

The portfolio uses its own photographs, text, and fonts. The hero line height is
1.05. The reference uses 0.92. Main actions are larger than the reference controls.
The first build used a white contact panel. The next user request changed the
introduction and contact panels to black. The project images fit inside equal frames without cropping.

## Width checks

No horizontal page overflow was found at 320, 390, 810, 1024, 1440, or 2200px.
The phone work layout has one column. Desktop work has one full-width project
and two smaller projects. All page images loaded in the examined phone state.
The Kapu footer fits the phone screen below the navigation.

## Code checks

- `npm run lint`: passed.
- `npm run build -- --webpack`: passed, including framework type validation.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed.
- No dependencies or tests were added.
- The old photo strip component and Fraunces font were removed.
- No secrets were added. Other routes and public links are unchanged.
- Next.js added its agent guide block to `AGENTS.md` when the server started.

## Review limits

These checks do not establish visual approval. No real phone, Safari, or screen
reader check was completed. Reduced-motion rules were examined in source code.
No performance measurements were taken. The work is local and has not been deployed.

## Navigation comparison and black panels

The user supplied four navigation screenshots. The table records design judgments.
It does not report a usability study.

| Reference | Useful part | Concern for this page |
| --- | --- | --- |
| Bajgart | Serif identity and outlined actions | Large identity competes with the hero. |
| Earlier portfolio | Clear Home link and blue identity | Separate contact and resume groups add visual weight. |
| TinyWins | Identity and links in one group | Grey container adds a second surface above the hero. |
| Natural | Identity, links, and action in three areas | A square alone does not identify Home. |
| Current experiment | Small plain links | No route back to Home. |

The implemented choice combines a small serif name, plain center links, and one
outlined contact action. The desktop name links to Home. Phones show “Home”.
All routes on this branch use this navigation.

The introduction and contact panels use black `#000000`. White project and
story sections separate the two panels. The contact panel then leads to the bright
blue footer. The user selected black after the first dark blue draft.

The page was examined at desktop and phone widths. At 320px, all five navigation
links fit within 20px gutters. Each link is at least 44px high. The build and lint
checks passed after these changes. No dependencies, secrets, or tests were added.

## Latest layout and route changes

- The hero uses 80svh below the navigation. Its content is centered.
- The opening photograph has a 1200px maximum width and visible side gutters.
- The introduction is white. The contact panel stays black.
- The featured project has text above its image. Its requested width is now 2.25 times the text width, limited to the content column. The frame height is 2.5 CSS cm less than before. The image is cropped from the center. Phones use the full content width.
- The Manipal photograph spans the page width. Its full aspect ratio is kept.
- Home, Work, Labs, About, and the three named case studies returned HTTP 200.
- Unknown routes show Home and Work recovery links. Unknown project names, including `constructor` and `__proto__`, return the missing-page response.
- The project lookup now checks own object keys. An inherited object key cannot become a project.
- Next-project links come from the Work records. The generic New Project entry is not promoted from these links. Its existing direct route stays available.
- File rows without a file URL are not shown as actions. No replacement URLs were invented.
- Work and Labs are now included in the sitemap.

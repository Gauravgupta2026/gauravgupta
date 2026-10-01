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

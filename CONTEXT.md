# Worktree context — Phase 4: Finishing

**Branch:** `Gauravgupta2026/re-design-finishing`
**Base:** tip of `Gauravgupta2026/re-design` (includes Framer Motion).

## Scope
Cross-page polish after Landing, Work+Labs+Projects, and Notes have merged
back into `Gauravgupta2026/re-design`. No single `.dc.html` reference — this
phase checks the whole site against all reference files together.

Typical work here: cross-page consistency, shared-component consolidation
(contact form, hover-to-color tile, accordion, lightbox, footer dither/clock),
responsive/mobile pass, `prefers-reduced-motion` audit, final QA against the
reference screenshots.

## Reference files (all, for cross-checking)
`design-reference/re-design inspo/{Landing,Work,Labs,Notes,Wylde}.dc.html`

## Relevant `CLAUDE.md` sections
- Design System (whole section)
- Interactions (match reference) — including reduced-motion and shared
  component notes
- Workflow — "build section by section, review after each"

## Note
This worktree should be branched again (or rebased) once Landing,
Work+Labs+Projects, and Notes have actually merged into
`Gauravgupta2026/re-design`, so it starts from a tip that has all three
phases in it.

## Merge target
Merge back into `Gauravgupta2026/re-design`, then `re-design` merges into
`main`.

## ⚠ HIGH PRIORITY — Mobile optimization
Final mobile pass is a required check in this phase, not optional polish.
Tracked in GitHub issue #10. See `CLAUDE.md` → Design System → Layout:
768px breakpoint, single column, hit targets ≥44px.

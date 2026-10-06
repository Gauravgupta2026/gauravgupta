# Edna Ho hero fidelity study — current implementation

Reference: https://ednaho.com/, inspected on desktop and mobile. Earlier lily, rotating bud and footer studies were rejected; they are not part of this implementation.

## Opening

- Full-screen #0A0A0A scene, 100dvh on laptop, tablet and mobile.
- Original reference orchid luminance mask, attributed in public/media/SOURCES.md; native Canvas 2D renderer.
- Cubic ease-out radial reveal, breathing, subtle drift, coupled ripples and brightness shimmer. No rotation or rising transformation.
- Reference round-dot pitch, silver/white threshold, pink tint and glow; responsive framing fits the viewport.
- Bloom completes in 5.4 seconds. Quote starts at 30% actual eased bloom, approximately 0.605 seconds.
- Quote fades at 5.4–6s; flower-only pause at 6–6.35s; profile reveals at 6.35–7.1s.
- Navigation and projects remain unavailable until completion at 7.1s. Scroll is locked during the preload.
- Stable scrollbar gutter and container-sized canvas avoid horizontal movement when scrolling unlocks. Drawing stays at display rate through the transition, then targets 30fps.
- Pause, skip, reduced motion, offscreen/hidden suspension and renderer-failure fallback retained.

## Typography and copy

Albert Sans for navigation/profile, licensed Cormorant Garamond semibold italic for the name and poem. Reference Minister Book Italic is not shipped. Name: 24px desktop / 16px mobile. Quote: 19px desktop / 17px mobile.

Tagore, Stray Birds 66: “The infant flower opens its bud and cries, ‘Dear World, please do not fade.’”

Sources: https://www.tagoreweb.in/index.php/Verses/stray-birds-199/THE-INFANT-flower-opens-its-bud%C3%82%C2%A0-10666 and https://bichitra.jdvu.ac.in/manuscript/manuscript_viewer.php?manid=143&mname=RBVBMS_119A.

## Selected work

Full first project, contextual case-study descriptions, View More beside refined previous/next controls, and a fine progress line. Desktop pinned rail; native horizontal scrolling on mobile/reduced motion. Confirmed meanings: Sachetana student wellness, Wylde party card game, Lucky Day slot-machine interaction study.

## Scope

No CTA/footer or resting-petal artwork. Previous nature-video/font-study assets remain in the repository but are not loaded by the current hero. Checklist: EDNA-FLOWER-CHECKLIST.md. Authoritative current direction: latest entries in DESIGN_SYSTEM.md; timeline: src/components/giants/openingTimeline.ts.

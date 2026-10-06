# Edna flower breakdown and preload checklist

Reference: https://ednaho.com/ — live site and current shipped renderer checked October 7. Checked boxes record implemented requirements; final visual acceptance remains with Gaurav.

## Appearance

- [x] Round screen-aligned dots, not square cells or petal surface textures.
- [x] Responsive pitch: reference height `812 + 0.105 × viewport width`; scale below 840px; divide by 96, round; minimum 3px mobile / 5px desktop.
- [x] Dot radius: `0.62 × pitch × brightness^0.72`; suppress brightness below 0.04 and radii below 0.35px.
- [x] Separate silver (`#cfd4d9`) and white (`#ffffff`) groups at brightness 0.6.
- [x] Pink halo: rgba(211,0,120,0.55), 1.1 × pitch blur; pink underfill opacity 0.35.
- [x] White glow only on bright dots: rgba(255,255,255,0.7), 2 × pitch blur.
- [x] Original pink tint, maximum 22%, composited over the dot field.
- [x] Continuous brightness modulation: `0.9 + 0.1 × sin((x+y) × 0.05 + time × 1.3)`.
- [x] Quiet flowing sample distortion: amplitude 0.013, coupled sine waves at reference frequencies.
- [x] Reference brightness shimmer only; added glitter removed.
- [x] Display-rate frames through the complete preload and hero reveal, 30fps afterward; device pixel ratio cap 1.6; pause offscreen/hidden and retain reduced motion.

## Adaptation

Edna's original orchid luminance mask feeds a fixed screen grid. Copy the cubic ease-out radial reveal, uniform scale opening, 1.8% breathing, tiny centre drift and coupled sampling ripples. No rotation, upward translation, perspective or compressed bud transformation. Stretch the reference motion clock to a 5.4-second bloom; fade the quote over 0.6 seconds, pause for 0.35 seconds, then reveal the profile over 0.75 seconds. Native Canvas 2D retains the reference glow and continuous shimmer. Artwork attribution remains in public/media/SOURCES.md.

## Single-screen preload

- [x] Initial DOM contains only the opening; projects mount after completion.
- [x] Full 100dvh on desktop and mobile during preload. No lower section peeks.
- [x] Navigation is hidden and inert until the hero is fully revealed.
- [x] Scroll is locked only while the preload is active; restored automatically when it ends.
- [x] One uninterrupted reference radial opening: 0–5.4s, no rotation.
- [x] Quote starts at 30% cubic-eased bloom (about 0.605s), with soft staggered line/attribution entrance over 0.85s.
- [x] Quote remains visible for the rest of the bloom; final dissolve at 5.4–6s.
- [x] Flower-only pause: 6–6.35s. Hero reveal: 6.35–7.1s. Nav and projects become available at 7.1s.
- [x] Skip and reduced-motion bypass the preload; renderer failure reveals the page.

Timing describes active playback; manually pausing or hiding the browser suspends the clock.

## Responsive framing

- [x] Full-screen preload on laptop, tablet and mobile.
- [x] Flower scale respects width, height and aspect ratio, including landscape screens.
- [x] Quote stays beneath the flower; navigation and lower sections stay hidden during active preload.

## Previous six-second handoff verification

- [x] Quote trigger at 30% actual cubic-eased bloom (approximately 0.605s).
- [x] Stable scrollbar gutter prevents the hero centre shifting when scroll unlocks.
- [x] Canvas width follows its container; no viewport/container mismatch.
- [x] Display-rate drawing continues through the profile crossfade, then falls to 30fps.
- [x] Browser replays at 1515×1065, 820×1180 and 390×844: unchanged hero width/name horizontal position, no frames over 40ms, 35–36 distinct profile updates during the 0.6-second crossfade.
- [x] Tablet/mobile replays: zero visible navigation or mounted projects while preload is active. These are browser viewport checks, not physical-device performance guarantees.

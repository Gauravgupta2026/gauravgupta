const BLOOM_END = 5.4;
const QUOTE_FADE_END = 6;
const HERO_REVEAL_START = QUOTE_FADE_END + 0.35;
const INTRO_COMPLETE = HERO_REVEAL_START + 0.75;
// Invert Edna's cubic ease-out so the quote begins at 30% actual bloom.
const QUOTE_START = BLOOM_END * (1 - Math.cbrt(0.7));

export const OPENING = {
  bloomEnd: BLOOM_END,
  pinkIn: [QUOTE_START, BLOOM_END * .65],
  quoteLinesIn: [[QUOTE_START, QUOTE_START + 0.65], [QUOTE_START + 0.12, QUOTE_START + 0.77]],
  attributionIn: [QUOTE_START + 0.25, QUOTE_START + 0.85],
  quoteOut: [BLOOM_END, QUOTE_FADE_END],
  profileIn: [HERO_REVEAL_START, INTRO_COMPLETE],
  complete: INTRO_COMPLETE,
} as const;

export function easeBetween(start: number, end: number, time: number) {
  const progress = Math.max(0, Math.min(1, (time - start) / (end - start)));
  return progress * progress * (3 - 2 * progress);
}

export const LIGHT_FLOWER_DEFAULTS = {
  "background": "#fdfafb",
  "shadow": "#ffece5",
  "petal": "#ffcf4d",
  "highlight": "#ff7a7a",
  "edge": "#ffffff",
  "contrast": 0.55,
  "centerDepth": 0.6,
  "edgeDefinition": 0,
  "dotSize": 1.4,
  "dotSpacing": 0.7,
  "glow": 1,
  "veil": 1
};
export type LightFlowerSettings = typeof LIGHT_FLOWER_DEFAULTS;

const rgb = (hex: string) => [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16));
export function lightFlowerPalette(settings: LightFlowerSettings) {
  const shadow = rgb(settings.shadow), petal = rgb(settings.petal), highlight = rgb(settings.highlight), edge = rgb(settings.edge);
  return Array.from({ length: 24 }, (_, index) => {
    const tone = index / 23;
    const from = tone < .55 ? shadow : petal;
    const to = tone < .55 ? petal : highlight;
    const blend = tone < .55 ? tone / .55 : (tone - .55) / .45;
    const base = from.map((channel, i) => channel + (to[i] - channel) * blend);
    return Array.from({ length: 4 }, (_, edgeIndex) => {
      const amount = edgeIndex / 3 * settings.edgeDefinition;
      return `rgb(${base.map((channel, i) => Math.round(channel + (edge[i] - channel) * amount)).join(",")})`;
    });
  });
}

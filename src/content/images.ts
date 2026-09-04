/**
 * Curated Unsplash photo pool standing in for the site's real project/story
 * photography until it's shot. Spans a deliberately mixed register —
 * minimal desk/workshop shots, maximal/textured abstracts, motorsport,
 * outdoors — so a page full of placeholders doesn't read as one repeated
 * stock photo. `imageFor` picks deterministically by seed so the same slot
 * always renders the same photo across renders and page loads.
 */
const POOL = [
  "1522202176988-66273c2fd55f",
  "1454165804606-c3d57bc86b40",
  "1499750310107-5fef28a66643",
  "1517245386807-bb43f82c33c4",
  "1519389950473-47ba0277781c",
  "1552664730-d307ca884978",
  "1531297484001-80022131f5a1",
  "1461749280684-dccba630e2f6",
  "1504384308090-c894fdcc538d",
  "1541701494587-cb58502866ab",
  "1519681393784-d120267933ba",
  "1441974231531-c6227db76b6e",
  "1470071459604-3b5ec3a7fe05",
  "1618005182384-a83a8bd57fbe",
  "1620121692029-d088224ddc74",
  "1526378722484-bd91ca387e72",
  "1557682250-33bd709cbe85",
  "1550684848-fac1c5b4e853",
  "1493612276216-ee3925520721",
  "1512314889357-e157c22f938d",
  "1503376780353-7e6692767b70",
  "1493238792000-8113da705763",
  "1554080353-a576cf803bda",
  "1517430816045-df4b7de11d1d",
  "1455390582262-044cdead277a",
  "1519750783826-e2420f4d687f",
];

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Deterministic photo URL for a given seed, sized/cropped for a slot. */
export function imageFor(seed: string, w = 800, h = 1000) {
  const id = POOL[hash(seed) % POOL.length];
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70`;
}

/**
 * Source glyphs for Notes rows — recreated from the reference's inline SVGs.
 * substack: stacked bars + downward chevron · medium: three ellipses ·
 * site: rounded square with an outbound arrow. All draw in electric blue.
 */
export type NoteSource = "substack" | "medium" | "site";

const BLUE = "#1B16EE";

export function SourceIcon({ source }: { source: NoteSource }) {
  if (source === "substack") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill={BLUE} aria-hidden>
        <rect x="3" y="4" width="18" height="2.6" />
        <rect x="3" y="9" width="18" height="2.6" />
        <path d="M3 14 L12 20 L21 14 Z" />
      </svg>
    );
  }
  if (source === "medium") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.6"
        aria-hidden
      >
        <ellipse cx="7" cy="12" rx="5.2" ry="6" />
        <ellipse cx="16.5" cy="12" rx="2.2" ry="6" />
        <ellipse cx="21.2" cy="12" rx="0.9" ry="6" />
      </svg>
    );
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={BLUE}
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 15 L15 9 M10 9 H15 V14" />
    </svg>
  );
}

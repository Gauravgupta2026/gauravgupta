import type { ReactNode } from "react";

/**
 * Mono, tracked, uppercase label that sits above section titles and card
 * headers. `tone` picks the canonical colors from the reference: blue accent
 * eyebrows over sections, muted gray over card headers.
 */
export function Eyebrow({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "mute";
  className?: string;
}) {
  const color = tone === "blue" ? "text-blue" : "text-mute";
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.24em] ${color} ${className}`}
    >
      {children}
    </span>
  );
}

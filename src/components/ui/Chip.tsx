import type { ReactNode } from "react";

/** Pill chip (mono, rounded-full outline) from the design system. */
export function Chip({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color =
    tone === "dark" ? "border-cream/30 text-cream" : "border-ink/30 text-ink";
  return (
    <span
      className={`inline-flex rounded-full border px-[13px] py-[7px] font-mono text-[11px] ${color} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Square-cornered tag used in project meta rails (Swift, Convex, …).
 * Distinct from the pill Chip — smaller radius, quieter border.
 */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-[4px] border border-ink/15 px-[9px] py-[4px] font-mono text-[10px] text-[#46443e]">
      {children}
    </span>
  );
}

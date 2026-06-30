import type { CSSProperties } from "react";

/**
 * Dark diagonal-striped placeholder standing in for real imagery (portrait,
 * app screens). Swap for a real <Image> later; the striping matches the
 * reference's repeating-linear-gradient. `align` positions the corner label.
 */
export function MediaPlaceholder({
  label,
  align = "center",
  className = "",
  style,
}: {
  label: string;
  align?: "center" | "bottom-left";
  className?: string;
  style?: CSSProperties;
}) {
  const stripes =
    "repeating-linear-gradient(135deg,#171717 0 12px,#0d0d0d 12px 24px)";
  const placement =
    align === "center"
      ? "items-center justify-center p-0"
      : "items-end justify-start p-[14px]";
  return (
    <div
      className={`flex ${placement} bg-[#0c0c0c] ${className}`}
      style={{ backgroundImage: stripes, ...style }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#5a5a5a]">
        {label}
      </span>
    </div>
  );
}

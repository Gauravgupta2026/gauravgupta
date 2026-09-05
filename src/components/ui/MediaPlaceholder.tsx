import type { CSSProperties } from "react";
import { imageFor } from "@/content/images";

/**
 * Standing in for real imagery (portrait, app screens, project photos).
 * With a `seed`, renders a deterministic stock photo (dimmed + labelled);
 * without one, falls back to the original dark diagonal-striped swatch.
 * `align` positions the corner label either way.
 */
export function MediaPlaceholder({
  label,
  seed,
  align = "center",
  className = "",
  style,
}: {
  label: string;
  /** Stable key picking a photo from the curated pool — same seed, same photo. */
  seed?: string;
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

  if (seed) {
    return (
      <div className={`relative overflow-hidden bg-[#0c0c0c] ${className}`} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageFor(seed)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/25" />
        <div className={`absolute inset-0 flex ${placement}`}>
          <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#e6e6e6]">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${placement} bg-[#0c0c0c] ${className}`}
      style={{ backgroundImage: stripes, ...style }}
    >
      <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#5a5a5a]">
        {label}
      </span>
    </div>
  );
}

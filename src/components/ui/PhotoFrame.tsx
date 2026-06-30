/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

/**
 * Light, rounded media frame used on project case-study pages (matches the
 * provided design). Renders a real image when `src` is set, otherwise a soft
 * cream placeholder with a centered mono label. Swap in real assets later.
 */
export function PhotoFrame({
  label = "Photo",
  src,
  alt,
  className = "",
  style,
}: {
  label?: string;
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label}
        className={`rounded-[16px] object-cover ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center rounded-[16px] border border-ink/10 bg-card ${className}`}
      style={style}
    >
      <span className="font-mono text-[11px] tracking-[0.12em] text-mute">
        {label}
      </span>
    </div>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

const STRIPES =
  "repeating-linear-gradient(135deg,#171717 0 12px,#0d0d0d 12px 24px)";

/**
 * Inline project link that pops a scaled-up preview card on hover — stands
 * in for a real screen-recording gif using the site's existing striped
 * media-placeholder look, animated so it reads as motion rather than a
 * static swatch.
 */
export function ProjectPreviewLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="group relative inline-block">
      <Link href={href} className="font-medium text-ink underline underline-offset-4">
        {children}
      </Link>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-[10px] w-[168px] -translate-x-1/2 scale-90 opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100">
        <span className="block aspect-video w-full overflow-hidden rounded-[6px] border border-border shadow-[0_20px_40px_rgba(0,0,0,.55)]">
          <span
            className="block h-full w-full animate-gif-shift bg-[length:220%_220%]"
            style={{ backgroundImage: STRIPES }}
          />
        </span>
        <span className="mt-[6px] block text-center font-mono text-[9px] uppercase tracking-[0.18em] text-mute">
          {label}
        </span>
      </span>
    </span>
  );
}

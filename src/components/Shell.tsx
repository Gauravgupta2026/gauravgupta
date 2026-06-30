import type { ElementType, ReactNode } from "react";

/**
 * Centered content column: max 1180px with responsive side padding
 * (48px desktop / 22px mobile, via the --side-pad CSS var). Every section
 * wraps its content in a Shell so horizontal rhythm stays consistent.
 */
export function Shell({
  as: Tag = "div",
  wide = false,
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  /** Wider track (1475px) used by the top group — nav, hero, meta bar — so
   *  their edges align with the over-wide hero panel. */
  wide?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const track = wide ? "max-w-[1475px]" : "max-w-shell";
  return (
    <Tag
      className={`mx-auto w-full ${track} px-[var(--side-pad)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

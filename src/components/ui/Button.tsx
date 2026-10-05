import type { ReactNode } from "react";

/**
 * Primary (filled blue) and ghost (outlined) buttons from the design system.
 * Rendered as an anchor since every CTA on the site navigates. `tone` flips the
 * ghost outline/text for dark vs. light backgrounds.
 */
export function Button({
  children,
  href = "#",
  variant = "primary",
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  tone?: "light" | "dark";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center font-mono text-[12px] no-underline transition-colors duration-300 px-[22px] py-[12px] min-h-[44px]";
  const styles =
    variant === "primary"
      ? "bg-blue text-cream hover:bg-blue-deep"
      : tone === "dark"
        ? "border border-cream/40 text-cream hover:border-cream"
        : "border border-ink/30 text-ink hover:border-blue hover:text-blue";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

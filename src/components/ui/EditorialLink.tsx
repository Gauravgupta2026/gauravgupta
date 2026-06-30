import type { ReactNode } from "react";

/**
 * Newsreader-italic underlined link (the "resume", "say hello !" voice).
 * `tone` switches color for the dark CTA band vs. light surfaces.
 */
export function EditorialLink({
  children,
  href = "#",
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-cream" : "text-blue";
  return (
    <a
      href={href}
      className={`font-display text-[17px] italic underline underline-offset-4 ${color} ${className}`}
    >
      {children}
    </a>
  );
}

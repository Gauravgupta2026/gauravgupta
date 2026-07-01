import Link from "next/link";
import { Shell } from "@/components/Shell";

/**
 * Top nav: logo left, ABOUT centered, WORK right (1fr · auto · 1fr grid so the
 * center item stays optically centered regardless of side widths). Targets are
 * absolute so the nav works from any route (landing, about, article).
 */
export function Nav() {
  return (
    <Shell
      as="nav"
      wide
      className="grid grid-cols-[1fr_auto_1fr] items-center pb-[48px] pt-[64px]"
    >
      <Link
        href="/"
        className="justify-self-start font-mono text-[12px] font-bold tracking-[0.12em] text-ink no-underline"
      >
        GG.
      </Link>
      <Link
        href="/about"
        className="justify-self-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink no-underline transition-colors duration-300 hover:text-blue  "
      >
        About
      </Link>
      <Link
        href="/#projects"
        className="justify-self-end font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink no-underline transition-colors duration-300 hover:text-blue"
      >
        Work
      </Link>
    </Shell>
  );
}

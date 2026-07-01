import { Shell } from "@/components/Shell";

/** Thin meta strip under the hero: Socials · BLR · Send an email. */
export function MetaBar() {
  return (
    <Shell wide className="flex items-center justify-between border-b border-ink/10 py-[54px]">
      <a
        href="#"
        className="font-mono font-bold text-[11px] uppercase tracking-[0.18em] text-ink no-underline transition-colors duration-300 hover:text-blue"
      >
        Socials
      </a>
      <span className="font-mono font-bold text-[11px] uppercase tracking-[0.18em] text-ink">
        BLR
      </span>
      <a
        href="mailto:gauravssa08@gmail.com"
        className="font-mono font-bold text-[11px] uppercase tracking-[0.18em] text-ink no-underline transition-colors duration-300 hover:text-blue"
      >
        Send an email
      </a>
    </Shell>
  );
}

import Link from "next/link";
import { Shell } from "@/components/Shell";
import { footerIndex, footerSocial } from "@/content/footer";

/** Standard footer: identity + link columns, then a bottom bar. Generously
 *  spaced, no flourishes — the design system's own tokens carry it. */
export function SiteFooter() {
  return (
    <footer id="contact" className="mt-[80px] border-t border-divider md:mt-[130px]">
      <Shell
        wide
        className="grid grid-cols-1 gap-[40px] py-[64px] sm:grid-cols-[1.2fr_1fr_1fr] md:py-[96px]"
      >
        <div>
          <span className="font-logo text-[36px] leading-none text-red md:text-[42px]">
            GG
          </span>
          <p className="m-0 mt-[20px] max-w-[280px] text-pretty text-[14px] leading-[22px] text-mute-2">
            I find the friction and build the smallest thing that removes
            it. Open to product &amp; design roles.
          </p>
          <a
            href="mailto:hello@gg.studio"
            className="mt-[20px] inline-block text-[14px] text-ink no-underline transition-colors duration-300 hover:text-lilac"
          >
            hello@gg.studio
          </a>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] text-mute">
            INDEX
          </div>
          <div className="mt-[22px] flex flex-col gap-[14px]">
            {footerIndex.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-[14px] text-soft-ink no-underline transition-colors duration-300 hover:text-lilac"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] text-mute">
            ELSEWHERE
          </div>
          <div className="mt-[22px] flex flex-col gap-[14px]">
            {footerSocial.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="text-[14px] text-soft-ink no-underline transition-colors duration-300 hover:text-lilac"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </Shell>

      <Shell
        wide
        className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px] py-[28px] font-mono text-[10px] tracking-[0.18em] text-faint md:py-[36px]"
      >
        <span>&copy; 2026 Gaurav Gupta</span>
        <span className="sm:ml-auto">DESIGNED &amp; BUILT SOLO</span>
      </Shell>
    </footer>
  );
}

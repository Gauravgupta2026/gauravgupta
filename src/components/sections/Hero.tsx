import { Shell } from "@/components/Shell";
import Image from "next/image";

/**
 * Hero — layout is final, do not redesign.
 * Desktop (≥768): wide blue panel (breaks out ~25% past the 1180 shell, stays
 * centered). Photo left + text right share one floor (items-end); that content
 * block is vertically centered in the panel (content-center). Mobile: single
 * column — photo on top, then name → description → tags. The "Looking for APM
 * Roles" tag is gold; name is Newsreader italic.
 */
export function Hero() {
  return (
    <Shell as="header" id="top" wide>
      <div className="relative grid grid-cols-1 items-stretch gap-0 overflow-hidden bg-blue p-[30px_26px_42px] md:min-h-[70vh] md:grid-cols-[0.95fr_1.15fr] md:content-center md:items-end md:gap-[46px] md:p-[80px]">
        <div className="relative mt-[6px] aspect-[4/3.4] self-start overflow-hidden bg-[#0c0c0c] md:mt-0 md:aspect-[4/3] md:self-auto">
          <Image
            src="/assets/hero.jpeg"
            alt="Gaurav Gupta"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="relative pt-[56px] md:pt-0">
          <h1 className="m-0 mb-[22px] font-display text-[clamp(42px,13vw,60px)] font-normal italic leading-[0.98] tracking-[-0.01em] text-cream md:text-[64px]">
            Gaurav Gupta
          </h1>
          <p className="m-0 mb-[24px] max-w-[430px] font-mono text-[12.5px] leading-[1.85] text-cream/80">
            I build AI systems and user-facing tools, moving from idea to
            interface to shipped product. Interested in long horizon agents.
          </p>
          <div className="mt-[34px] flex flex-wrap items-center gap-[12px] font-mono text-[11px] tracking-[0.08em] text-cream/90 md:mt-0">
            <span>[ Risk @ KPMG ]</span>
            <span className="opacity-50">&bull;</span>
            <span className="font-display text-[15px] italic tracking-normal text-gold">
              Looking for APM Roles
            </span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

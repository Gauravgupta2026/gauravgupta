import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { ProjectPreviewLink } from "@/components/ui/ProjectPreviewLink";

/**
 * Identity block. Text-only — no portrait in the new design. GG mark sits
 * above the name, scrolling with the page (not fixed — that's the nav's
 * job). Copy is verbatim from LANDING 4-dark.pdf. Top padding clears the
 * fixed nav. `min-h-dvh` holds the section to a full screen regardless of
 * window height — fixed padding alone can't guarantee that, since it doesn't
 * scale with viewport size the way min-height does.
 */
export function Hero() {
  return (
    <Shell
      as="header"
      id="top"
      wide
      className="min-h-dvh pb-[88px] pt-[96px] md:pb-[80px] md:pt-[145px]"
    >
      <div className="font-logo text-[35px] leading-none text-red md:text-[51px]">
        GG
      </div>

      <Reveal
        as="div"
        delay={0}
        className="mt-[56px] font-body text-[13px] leading-[21px] md:mt-[110px] md:text-[14px] md:leading-[23px]"
      >
        <div className="text-ink">Gaurav Gupta</div>
        <div className="text-mute-2">Product &amp; design &middot; Bengaluru</div>
      </Reveal>

      <Reveal
        as="p"
        delay={80}
        className="m-0 mt-[22px] max-w-[1051px] text-pretty font-body text-[13px] leading-[22px] text-ink md:mt-[28px] md:text-[14px] md:leading-[26px]"
      >
        I find the friction, build the smallest thing that removes it, then
        check whether it worked. I focus on accessibility, performance and
        interactivity.
      </Reveal>

      <Reveal
        as="p"
        delay={160}
        className="m-0 mt-[14px] max-w-[1051px] text-pretty font-body text-[13px] leading-[22px] text-ink md:mt-[16px] md:text-[14px] md:leading-[26px]"
      >
        I am currently working on:{" "}
        <Link href="/projects/wylde" className="font-medium text-ink">
          Wylde
        </Link>
        , an app to make the room play together. Cut play-time by reducing{" "}
        <span className="font-medium text-ink">160 cards to 40</span> because
        the rest were the problem.
      </Reveal>

      <Reveal
        as="p"
        delay={240}
        className="m-0 mt-[14px] max-w-[1051px] font-body text-[13px] leading-[22px] text-mute-2 md:mt-[16px] md:text-[14px] md:leading-[26px]"
      >
        Previously at KPMG, on operational risk controls and an
        evidence-gated decision engine.
      </Reveal>

      <Reveal
        as="p"
        delay={320}
        className="m-0 mt-[14px] max-w-[1051px] text-pretty font-body text-[13px] leading-[22px] text-ink md:mt-[16px] md:text-[14px] md:leading-[26px]"
      >
        Available for product management roles.
        <br />
        Also built:{" "}
        <ProjectPreviewLink href="/projects/lucky-day" label="Lucky Day">
          Lucky Day
        </ProjectPreviewLink>
        ,{" "}
        <ProjectPreviewLink href="/projects/sachetana" label="Sachetana">
          Sachetana
        </ProjectPreviewLink>
        .
      </Reveal>
    </Shell>
  );
}

import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { EditorialLink } from "@/components/ui/EditorialLink";

export function CTA() {
  return (
    <Shell as="section" id="cta" className="mt-[90px] md:mt-[130px]">
      <Reveal className="grid grid-cols-1 items-center gap-[26px] bg-[linear-gradient(135deg,#1B16EE_0%,#130FB4_100%)] p-[42px_26px] md:grid-cols-[1.2fr_1fr] md:gap-[40px] md:p-[64px_56px]">
        <h2 className="m-0 font-display text-[28px] font-medium leading-[1.15] text-cream md:text-[40px] md:leading-[1.1]">
          Looking for a role where strategy and shipping both matter.
        </h2>
        <div className="border-t border-cream/25 pt-[26px] md:border-l md:border-t-0 md:pl-[40px] md:pt-0">
          <p className="m-0 mb-[28px] font-mono text-[12px] leading-[1.7] text-cream/80">
            Associate Product Manager across tools, systems, and GTM thinking.
          </p>
          <div className="flex gap-[24px]">
            <EditorialLink href="#" tone="dark">
              resume
            </EditorialLink>
            <EditorialLink href="#" tone="dark">
              say hello !
            </EditorialLink>
          </div>
        </div>
      </Reveal>
    </Shell>
  );
}

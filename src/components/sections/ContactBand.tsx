import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";

/**
 * Light "Have a question about my work?" band — shared by the About and
 * project case-study pages.
 */
export function ContactBand({
  email = "hello@example.com",
}: {
  email?: string;
}) {
  return (
    <Shell as="section" className="mt-[90px] md:mt-[120px]">
      <Reveal className="rounded-[20px] border border-ink/10 bg-card px-[26px] py-[64px] text-center">
        <h2 className="m-0 font-display text-[clamp(26px,4vw,34px)] font-normal text-ink">
          Have a question about my work?
        </h2>
        <a
          href={`mailto:${email}`}
          className="mt-[22px] inline-block font-mono text-[12px] tracking-[0.04em] text-blue underline underline-offset-4"
        >
          Send over an email &rarr;
        </a>
      </Reveal>
    </Shell>
  );
}

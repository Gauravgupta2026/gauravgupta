import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** Mono section number in a fixed left rail, Newsreader heading beside it. */
export function NumberedSection({
  num,
  title,
  intro,
  children,
}: {
  num: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mt-[52px] grid grid-cols-1 gap-[10px] md:mt-[110px] md:grid-cols-[100px_1fr] md:gap-0">
      <div className="font-mono text-[8px] tracking-[0.2em] text-faint md:text-[9px]">
        {num}
      </div>
      <div>
        <Reveal
          as="h2"
          className="m-0 font-display text-[19px] font-light leading-[1.15] tracking-[-0.008em] text-white md:text-[40px] md:leading-[40px]"
        >
          {title}
        </Reveal>
        {intro && (
          <p className="m-0 mt-[12px] max-w-[620px] text-pretty text-[11px] leading-[18px] text-mute-2 md:mt-[22px] md:text-[14px] md:leading-[23px]">
            {intro}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

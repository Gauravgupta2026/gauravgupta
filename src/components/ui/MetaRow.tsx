import type { MetaField } from "@/content/projectDetails";

/** Role / period / platform facts, in a hairline-bordered row under the header. */
export function MetaRow({ items }: { items: MetaField[] }) {
  return (
    <div className="grid grid-cols-2 gap-[16px] border-y border-divider py-[16px] sm:grid-cols-4 md:gap-[34px] md:py-[30px]">
      {items.map((m) => (
        <div key={m.k} className="flex flex-col gap-[6px] md:gap-[12px]">
          <span className="font-mono text-[7px] tracking-[0.24em] text-mute md:text-[8px]">
            {m.k}
          </span>
          <span className="text-[10px] leading-[14px] text-ink md:text-[14px] md:leading-[19px]">
            {m.v}
          </span>
        </div>
      ))}
    </div>
  );
}

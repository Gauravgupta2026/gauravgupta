/* eslint-disable @next/next/no-img-element */
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Block } from "@/content/articles";

/**
 * Long-form reader. Prose is set in Newsreader (serif) at a comfortable
 * measure for sustained reading — the mono UI voice is kept for labels and
 * captions only. Images can sit inside the column or break out slightly wide.
 */
export function ArticleBody({ body }: { body: Block[] }) {
  return (
    <div className="flex flex-col gap-[26px]">
      {body.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={i}
                className="m-0 font-display text-[19px] leading-[1.75] text-ink/90"
              >
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="m-0 mt-[22px] font-display text-[27px] font-medium leading-[1.2] text-ink"
              >
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <figure
                key={i}
                className="my-[14px] border-l-2 border-blue pl-[24px]"
              >
                <blockquote className="m-0 font-display text-[23px] italic leading-[1.5] text-ink">
                  {block.text}
                </blockquote>
                {block.cite ? (
                  <figcaption className="mt-[12px] font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                    {block.cite}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "ul":
            return (
              <ul key={i} className="m-0 flex flex-col gap-[12px] pl-[20px]">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="font-display text-[18px] leading-[1.65] text-ink/90 marker:text-blue"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "img":
            return (
              <figure
                key={i}
                className={`my-[14px] ${
                  block.width === "wide"
                    ? "md:-mx-[80px]"
                    : ""
                }`}
              >
                {block.src ? (
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full"
                    loading="lazy"
                  />
                ) : (
                  <MediaPlaceholder
                    label="[ IMAGE ]"
                    className="aspect-[16/9] w-full"
                  />
                )}
                {block.caption ? (
                  <figcaption className="mt-[12px] text-center font-mono text-[11px] leading-[1.6] text-soft-ink">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

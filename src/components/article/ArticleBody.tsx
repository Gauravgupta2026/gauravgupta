/* eslint-disable @next/next/no-img-element */
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Block } from "@/content/articles";
import styles from "./ArticleBody.module.css";

/** Garamond narrative, Inter captions, and a bounded reading column. */
export function ArticleBody({ body }: { body: Block[] }) {
  return (
    <div className={styles.body}>
      {body.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={i}
                className={styles.paragraph}
              >
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className={styles.heading}
              >
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <figure
                key={i}
                className={styles.quote}
              >
                <blockquote>
                  {block.text}
                </blockquote>
                {block.cite ? (
                  <figcaption>
                    {block.cite}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "ul":
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className={styles.listItem}
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
                className={`${styles.figure} ${
                  block.width === "wide"
                    ? styles.wide
                    : ""
                }`}
              >
                {block.src ? (
                  <img
                    src={block.src}
                    alt={block.alt}
                    className={styles.image}
                    loading="lazy"
                  />
                ) : (
                  <MediaPlaceholder
                    label="[ IMAGE ]"
                    className="aspect-[16/9] w-full"
                  />
                )}
                {block.caption ? (
                  <figcaption className={styles.caption}>
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

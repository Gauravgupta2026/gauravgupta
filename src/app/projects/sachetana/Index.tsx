"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Sachetana.module.css";

type Group = { id: string; label: string; items: readonly { id: string; label: string }[] };

/** A section is "current" once its top passes this share of the viewport height. */
const CURRENT_LINE = 0.3;

/** Sticky index. It lists the categories. Only the current category opens and shows its sections. */
export function Index({ groups }: { groups: readonly Group[] }) {
  const ids = groups.flatMap((group) => group.items.map((item) => item.id));
  const [current, setCurrent] = useState(ids[0]);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * CURRENT_LINE;
      let found = ids[0];
      for (const id of ids) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) found = id;
      }
      setCurrent(found);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On phones the index scrolls sideways. Keep the current item in view.
  useEffect(() => {
    const row = nav.current;
    const link = row?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!row || !link || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: link.offsetLeft - row.clientWidth / 2 + link.offsetWidth / 2, behavior: "smooth" });
  }, [current]);

  return (
    <nav ref={nav} className={styles.index} aria-label="Contents">
      {groups.map((group) => {
        const open = group.items.some((item) => item.id === current);
        return (
          <div key={group.id} className={`${styles.group} ${open ? styles.groupOpen : ""}`}>
            <a className={styles.groupLink} href={`#${group.items[0].id}`} aria-expanded={open}>{group.label}</a>
            <ul>
              {group.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} tabIndex={open ? undefined : -1} aria-current={item.id === current ? "true" : undefined}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

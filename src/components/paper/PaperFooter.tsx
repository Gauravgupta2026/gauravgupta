"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photoCollection } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";

export function PaperFooter() {
  const strip = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState(0);
  useEffect(() => {
    const target = strip.current; if (!target) return;
    const update = () => {
      if (target.scrollLeft <= 1) { setPhoto(0); return; }
      if (target.scrollLeft + target.clientWidth >= target.scrollWidth - 1) { setPhoto(photoCollection.length - 1); return; }
      const items = [...target.children] as HTMLElement[];
      const nearest = items.reduce((best, item, index) => Math.abs(item.offsetLeft - target.scrollLeft - 24) < Math.abs(items[best].offsetLeft - target.scrollLeft - 24) ? index : best, 0);
      setPhoto(nearest);
    };
    target.addEventListener("scroll", update, { passive: true });
    return () => target.removeEventListener("scroll", update);
  }, []);
  const move = (index: number) => {
    const target = strip.current; const item = target?.children[index] as HTMLElement | undefined;
    if (target && item) target.scrollTo({ left: item.offsetLeft - 24, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setPhoto(index);
  };
  return <footer className={styles.footer} aria-label="A few photographs"><div className={styles.photoFooter}>
    <p>A few moments away from the screen.</p>
    <div ref={strip} className={styles.photoStrip} role="region" aria-label="Photographs" tabIndex={0}>{photoCollection.map(item => <figure key={item.src}><Image src={item.src} alt={item.alt} width={720} height={480} sizes="(max-width: 640px) 80vw, 520px" /></figure>)}</div>
    <div className={styles.photoControls}><button disabled={photo === 0} onClick={() => move(photo - 1)}>prev</button><button disabled={photo === photoCollection.length - 1} onClick={() => move(photo + 1)}>next</button></div>
  </div></footer>;
}

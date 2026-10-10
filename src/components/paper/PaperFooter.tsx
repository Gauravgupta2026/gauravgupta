"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MonkeySeat } from "@/components/monkeys/MonkeySeat";
import { EMAIL, SOCIALS, photoCollection } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";
/** The right-hand monkey runs this many seconds behind the left one. */
const MONKEY_DELAY_S = 0.9;
export function PaperFooter({ photos }: { photos: boolean }) {
  const strip = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState(0);
  useEffect(() => {
    const target = strip.current; if (!target || !photos) return;
    const update = () => {
      if (target.scrollLeft <= 1) { setPhoto(0); return; }
      if (target.scrollLeft + target.clientWidth >= target.scrollWidth - 1) { setPhoto(photoCollection.length - 1); return; }
      const items = [...target.children] as HTMLElement[];
      const nearest = items.reduce((best, item, i) => Math.abs(item.offsetLeft - target.scrollLeft - 24) < Math.abs(items[best].offsetLeft - target.scrollLeft - 24) ? i : best, 0);
      setPhoto(nearest);
    };
    target.addEventListener("scroll", update, { passive: true });
    return () => target.removeEventListener("scroll", update);
  }, [photos]);
  const move = (index: number) => {
    const target = strip.current; const item = target?.children[index] as HTMLElement | undefined;
    if (target && item) target.scrollTo({ left: item.offsetLeft - 24, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setPhoto(index);
  };
  return <footer className={styles.footer} aria-label={photos ? "A few photographs" : "Get in touch"} onFocusCapture={() => { if (innerWidth >= 640 && innerHeight > 540) scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }); }}>
    {photos ? <div className={styles.photoFooter}>
      <p>A few moments away from the screen.</p>
      <div ref={strip} className={styles.photoStrip} role="region" aria-label="Photographs" tabIndex={0}>
        {photoCollection.map(p => <figure key={p.src}><Image src={p.src} alt={p.alt} width={720} height={480} sizes="(max-width: 640px) 80vw, 520px" /></figure>)}
      </div>
      <div className={styles.photoControls}><button disabled={photo === 0} onClick={() => move(photo - 1)}>prev</button><button disabled={photo === photoCollection.length - 1} onClick={() => move(photo + 1)}>next</button></div>
    </div> : <div className={styles.cta}>
      <MonkeySeat className={styles.monkeyLeft} label="A monkey in a blue jacket sits holding a tasselled parasol." />
      <div className={styles.ctaCopy}>
        <p className={styles.ctaHeading}>Creativity and ideas<br />travel further together.</p>
        <p className={styles.ctaText}>Start with a thought. The rest can be figured out together.</p>
        <a href={EMAIL} className={styles.ctaButton}>Say hello</a>
        <div className={styles.ctaLinks}>{SOCIALS.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
      </div>
      <MonkeySeat mirrored delay={MONKEY_DELAY_S} className={styles.monkeyRight} label="A second monkey sits facing the first, also holding a tasselled parasol." />
    </div>}
  </footer>;
}

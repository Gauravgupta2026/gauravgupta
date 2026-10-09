"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EMAIL, SOCIALS, photoCollection } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";
export function ContactLinks() {
  return <div className={styles.contactLinks}><a href={EMAIL}>say hello</a>{SOCIALS.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>;
}
export function PaperFooter({ photos }: { photos: boolean }) {
  const strip = useRef<HTMLDivElement>(null);
  const can = useRef<HTMLDivElement>(null);
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
    </div> : <>
      <div className={styles.footerInvitation}><p className={styles.script}>Shall we make something?</p><ContactLinks /></div>
      <div className={styles.garden} aria-hidden="true" onPointerMove={event => {
        if (event.pointerType === "touch" || !can.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        can.current.style.transform = `translate(${event.clientX - rect.left - 30}px,${event.clientY - rect.top - 65}px) rotate(-22deg)`;
      }}>
        {[0, 1, 2, 3].map(i => <Image key={i} src="/reference-dwija/flowers.png" alt="" width={202} height={152} className={styles.flowers} style={{ animationDelay: `${-i * 1.1}s` }} unoptimized />)}
        <Image src="/reference-dwija/cat.png" alt="" width={110} height={83} className={styles.cat} unoptimized />
        <div ref={can} className={styles.wateringCan}><Image src="/reference-dwija/watering-can.png" alt="" width={92} height={70} unoptimized /><i /><i /><i /></div>
      </div>
    </>}
  </footer>;
}

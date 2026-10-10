"use client";
import { useEffect, useRef, useState } from "react";
import { stamps } from "@/content/paperPortfolio";
import { InkDrawing } from "./InkDrawing";
import styles from "./Paper.module.css";
const SCROLL_STEPS = stamps.length - 1;
export function StampStory() {
  const scene = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const source = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const element = scene.current; if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      if (reduced.matches || innerWidth < 640) return;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(SCROLL_STEPS, -rect.top / Math.max(1, rect.height - innerHeight) * SCROLL_STEPS));
      setActive(Math.round(progress));
      const cardWidth = Math.min(450, innerWidth * .46);
      cards.current.forEach((card, index) => {
        if (!card) return;
        const delta = index - progress;
        const offset = delta <= 0 ? delta * cardWidth * .9 : delta * 66;
        card.style.transform = `translateX(${offset}px) translateY(${-18 * (1 - Math.min(1, Math.abs(delta)))}px) scale(${1 - .12 * Math.min(1, Math.abs(delta))})`;
        card.style.zIndex = String(100 - Math.round(Math.abs(delta) * 10) + index);
        card.style.opacity = String(delta < -1 ? Math.max(0, 2 + delta) : 1);
      });
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(draw); };
    request(); addEventListener("scroll", request, { passive: true }); addEventListener("resize", request); reduced.addEventListener("change", request);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", request); removeEventListener("resize", request); reduced.removeEventListener("change", request); };
  }, []);
  const close = () => { dialog.current?.close(); source.current?.focus({ preventScroll: true }); };
  return <>
    <div ref={scene} className={styles.stampScene}>
      <div className={styles.stampStage}>
        <div className={styles.stampDeck}>{stamps.map((stamp, index) => <button ref={e => { cards.current[index] = e; }} className={styles.stamp} key={stamp.title} style={{ "--stamp-order": index } as React.CSSProperties} aria-label={`Read: ${stamp.title}`} onClick={e => { source.current = e.currentTarget; setSelected(index); dialog.current?.showModal(); }}>
          <span className={styles.stampNumber}>GAURAV’S · {String(index + 1).padStart(2, "0")}</span>
          <InkDrawing kind={stamp.illustration} className={styles.stampDrawing} />
          <h2>{stamp.title}</h2><p>{stamp.text}</p>
          <span className={styles.stampFoot}>a little about me</span>
        </button>)}</div>
        <div className={styles.stampDots} aria-label="Story chapters">{stamps.map((s, i) => <button key={s.title} aria-label={`Go to chapter ${i + 1}`} aria-pressed={active === i} onClick={() => {
          const el = scene.current; if (!el) return;
          scrollTo({ top: scrollY + el.getBoundingClientRect().top + (el.offsetHeight - innerHeight) * i / SCROLL_STEPS, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }} />)}</div>
        <p className={styles.scrollHint}>scroll to turn the page</p>
      </div>
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label="About Gaurav" onClick={e => { if (e.target === e.currentTarget) close(); }} onClose={() => source.current?.focus({ preventScroll: true })}>
      <button className={styles.close} aria-label="Close chapter" onClick={close}>×</button>
      {selected !== null && <article className={styles.openStamp}><InkDrawing kind={stamps[selected].illustration} className={styles.stampDrawing} /><h2>{stamps[selected].title}</h2><p>{stamps[selected].text}</p></article>}
    </dialog>
  </>;
}

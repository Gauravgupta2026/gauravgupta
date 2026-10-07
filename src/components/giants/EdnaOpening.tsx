"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OrchidCanvas } from "./OrchidCanvas";
import { OPENING, easeBetween } from "./openingTimeline";
import styles from "./EdnaOpening.module.css";

export function EdnaOpening({ onReveal, theme, skipIntro }: { onReveal: () => void; theme: "light" | "dark"; skipIntro: boolean }) {
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const revealed = useRef(false);
  const updateScene = useCallback((time: number) => {
    if (revealed.current) return;
    const quote = 1 - easeBetween(...OPENING.quoteOut, time);
    const profile = easeBetween(...OPENING.profileIn, time);
    hero.current?.style.setProperty("--quote-opacity", String(quote));
    OPENING.quoteLinesIn.forEach((interval, index) => {
      const progress = easeBetween(interval[0], interval[1], time);
      hero.current?.style.setProperty(`--line-${index + 1}-opacity`, String(progress));
      hero.current?.style.setProperty(`--line-${index + 1}-rise`, `${(1 - progress) * 6}px`);
      hero.current?.style.setProperty(`--line-${index + 1}-blur`, `${(1 - progress) * 2}px`);
    });
    hero.current?.style.setProperty("--attribution-opacity", String(easeBetween(...OPENING.attributionIn, time)));
    hero.current?.style.setProperty("--profile-opacity", String(profile));
    hero.current?.style.setProperty("--profile-rise", `${(1 - profile) * 8}px`);
    if (time >= OPENING.complete && !revealed.current) { revealed.current = true; setReady(true); onReveal(); }
  }, [onReveal]);
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      const dot = cursor.current;
      if (!dot) return;
      dot.style.left = `${event.clientX}px`; dot.style.top = `${event.clientY}px`;
      dot.style.opacity = "1";
      const interactive = event.target instanceof Element && event.target.closest("a,button");
      dot.style.width = dot.style.height = interactive ? "28px" : "16px";
    };
    const hide = () => { if (cursor.current) cursor.current.style.opacity = "0"; };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", hide); };
  }, []);
  return (
    <>
      {(ready || skipIntro) && <a className={styles.skip} href="#selected-work">Skip to selected work</a>}
      <div ref={cursor} className={styles.cursor} aria-hidden="true" />
      <section ref={hero} data-edna-opening data-intro={skipIntro ? "complete" : "playing"} className={styles.hero} aria-labelledby="hero-name">
        <OrchidCanvas theme={theme} paused={paused} skipIntro={skipIntro} onTime={updateScene} />
        <div className={styles.vignette} />
        <div className={styles.fade} />
        <figure className={styles.poem} aria-hidden={ready || skipIntro}>
          <blockquote>
            <span>The infant flower opens its bud and cries,</span>
            <span>“Dear World, please do not fade.”</span>
          </blockquote>
          <figcaption>Rabindranath Tagore · <cite>Stray Birds, 66</cite></figcaption>
        </figure>
        <div className={styles.copy} aria-hidden={!ready && !skipIntro}>
          <h1 id="hero-name">Gaurav Gupta</h1>
          <p>a designer and engineer who builds digital products with care for how they work and feel</p>
        </div>
        <button className={styles.pause} onClick={() => setPaused(!paused)} aria-label={paused ? "Play flower animation" : "Pause flower animation"} aria-pressed={paused}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 5 10 7-10 7Z" /> : <path d="M8 5v14M16 5v14" />}</svg>
        </button>
      </section>
    </>
  );
}

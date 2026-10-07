"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { OrchidCanvas } from "./OrchidCanvas";
import { OPENING, easeBetween } from "./openingTimeline";
import styles from "./EdnaOpening.module.css";

export function EdnaOpening({ onReveal, theme }: { onReveal: () => void; theme: "light" | "dark" }) {
  const [paused, setPaused] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [ready, setReady] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const revealed = useRef(false);
  const updateScene = useCallback((time: number) => {
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
    navigation.current?.style.setProperty("--nav-opacity", String(easeBetween(...OPENING.navigationIn, time)));
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
      {ready && <a className={styles.skip} href="#selected-work">Skip to selected work</a>}
      <div ref={cursor} className={styles.cursor} aria-hidden="true" />
      <header ref={navigation} className={styles.nav} inert={!ready} hidden={!ready}>
        <Link className={styles.identity} href="/">Gaurav Gupta</Link>
        <nav aria-label="Main navigation">
          <a href="#selected-work">Work</a>
          <Link href="/labs">Play</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>
      <section ref={hero} data-edna-opening className={styles.hero} aria-labelledby="hero-name">
        <OrchidCanvas theme={theme} paused={paused} skipIntro={skipIntro} onTime={updateScene} />
        <div className={styles.vignette} />
        <div className={styles.fade} />
        <figure className={styles.poem} aria-hidden={ready}>
          <blockquote>
            <span>The infant flower opens its bud and cries,</span>
            <span>“Dear World, please do not fade.”</span>
          </blockquote>
          <figcaption>Rabindranath Tagore · <cite>Stray Birds, 66</cite></figcaption>
        </figure>
        <div className={styles.copy} aria-hidden={!ready}>
          <h1 id="hero-name">Gaurav Gupta</h1>
          <p>a designer and engineer who builds digital products with care for how they work and feel</p>
        </div>
        {!ready && <button className={styles.skipIntro} onClick={() => setSkipIntro(true)}>Skip introduction</button>}
        <button className={styles.pause} onClick={() => setPaused(!paused)} aria-label={paused ? "Play flower animation" : "Pause flower animation"}>{paused ? "Play motion" : "Pause motion"}</button>
      </section>
    </>
  );
}

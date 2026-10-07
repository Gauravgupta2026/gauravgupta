"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlowerBed } from "./FlowerBed";
import styles from "./EdnaOpening.module.css";

export function EdnaOpening() {
  const [paused, setPaused] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const role = useRef<HTMLParagraphElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const startAtHero = () => { if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" }); };
    startAtHero();
    const onPageShow = (event: PageTransitionEvent) => { if (!event.persisted) startAtHero(); };
    window.addEventListener("pageshow", onPageShow);
    return () => { history.scrollRestoration = previous; window.removeEventListener("pageshow", onPageShow); };
  }, []);
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
      <a className={styles.skip} href="#selected-work">Skip to selected work</a>
      <div ref={cursor} className={styles.cursor} aria-hidden="true" />
      <section ref={hero} data-edna-opening className={`${styles.hero} ${styles.flowerHero}`} aria-labelledby="hero-name">
        <FlowerBed hero={hero} name={name} role={role} paused={paused} />
        <div className={styles.copy}>
          <h1 ref={name} id="hero-name">Gaurav Gupta</h1>
          <p ref={role}>a designer and engineer who builds digital products with care for how they work and feel</p>
        </div>
        <button className={styles.pause} onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Play motion" : "Pause motion"}</button>
      </section>
    </>
  );
}

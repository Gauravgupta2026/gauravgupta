"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./GiantsOpening.module.css";

const INTRO_DELAY = 1000;
const PANEL_DURATION = 1000;

export function GiantsOpening({ nameStyle = "instrument" }: { nameStyle?: "instrument" | "editorial" | "bodoni" | "italic" }) {
  const hero = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wordmark = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pausedByUser = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    if (!preference.matches && window.scrollY < 80) {
      if (panel.current) animations.push(panel.current.animate(
        [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }],
        { duration: PANEL_DURATION, delay: INTRO_DELAY, easing: "cubic-bezier(.25,.46,.45,.94)", fill: "backwards" },
      ));
      if (wordmark.current) animations.push(wordmark.current.animate([{ opacity: 0 }, { opacity: 1 }],
        { duration: 1000, delay: 1900, fill: "backwards" }));
      if (copy.current) animations.push(copy.current.animate([{ opacity: 0 }, { opacity: 1 }],
        { duration: 700, delay: 2400, fill: "backwards" }));
    }
    let visible = true;
    const media = video.current;
    const updatePlayback = () => {
      const shouldPause = preference.matches || document.hidden || !visible || pausedByUser.current;
      if (shouldPause) video.current?.pause();
      else void media?.play().catch(() => setPaused(true));
      setPaused(shouldPause);
      if (preference.matches) animations.forEach(animation => animation.finish());
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePlayback(); });
    if (hero.current) observer.observe(hero.current);
    media?.addEventListener("canplay", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    preference.addEventListener("change", updatePlayback);
    updatePlayback();
    return () => {
      animations.forEach(animation => animation.cancel());
      observer.disconnect();
      media?.removeEventListener("canplay", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      preference.removeEventListener("change", updatePlayback);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  const togglePlayback = () => {
    pausedByUser.current = !pausedByUser.current;
    if (pausedByUser.current) video.current?.pause();
    else void video.current?.play().catch(() => setPaused(true));
    setPaused(pausedByUser.current);
  };
  const openMenu = () => { menu.current?.showModal(); setMenuOpen(true); };
  const closeMenu = () => { menu.current?.close(); setMenuOpen(false); };

  return (
    <>
      <a className={styles.skip} href="#introduction">Skip to introduction</a>
      <div className={styles.videoBackground} aria-hidden="true">
        <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/media/lakeside-flowers-poster.jpg">
          <source src="/media/sunset-dandelions.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/media/lakeside-flowers.mp4" type="video/mp4" />
        </video>
      </div>
      <header className={styles.nav}>
        <Link href="/" className={styles.identity} aria-label="Gaurav Gupta home">
          <span className={styles.badge} aria-hidden="true">G</span>
          <span>DESIGN &amp; ENGINEERING<br />{"// DIGITAL EXPERIENCES"}</span>
        </Link>
        <button ref={menuTrigger} className={styles.menuButton} onClick={openMenu} aria-expanded={menuOpen} aria-controls="opening-menu">Menu</button>
      </header>
      <section ref={hero} className={styles.hero} aria-labelledby="hero-name">
        <div ref={panel} className={styles.top}>
          <div className={styles.blur} />
          <div className={styles.surface}>
            <h1 id="hero-name" className={styles.srOnly}>Gaurav Gupta</h1>
            <div ref={wordmark} className={`${styles.wordmark} ${styles[nameStyle]}`}>
              <span aria-hidden="true">Gaurav Gupta</span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div ref={copy} className={styles.heroCopy}>
            <p className={styles.eyebrow}>Bengaluru, India</p>
            <p className={styles.statement}>Design, engineering, and<br className={styles.desktopBreak} /> the details that stay with you.</p>
          </div>
          <button className={styles.playback} onClick={togglePlayback} aria-label={paused ? "Play background video" : "Pause background video"}>{paused ? "Play motion" : "Pause motion"}</button>
        </div>
      </section>
      <dialog ref={menu} id="opening-menu" className={styles.menu} onClose={() => { setMenuOpen(false); menuTrigger.current?.focus(); }}>
        <button className={styles.closeButton} onClick={closeMenu}>Close</button>
        <nav aria-label="Main navigation">
          <Link onClick={closeMenu} href="#selected-work">Work</Link>
          <Link onClick={closeMenu} href="/labs">Play</Link>
          <Link onClick={closeMenu} href="/about">About</Link>
          <Link onClick={closeMenu} href="/notes">Notes</Link>
        </nav>
      </dialog>
    </>
  );
}

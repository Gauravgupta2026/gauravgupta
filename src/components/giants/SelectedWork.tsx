"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectDetails } from "@/content/projectDetails";
import styles from "./SelectedWork.module.css";

const selected = [
  { slug: "sachetana", title: "Sachetana", purpose: "A private check-in for a difficult day.", context: "Student wellness · iOS & web", focus: "The design problem: make reflection feel unhurried, with privacy at the centre of the experience.", image: "/assets/projects/sachetana.jpg" },
  { slug: "wylde", title: "Wylde", purpose: "Less explaining. More playing.", context: "Party card game · iOS", focus: "The design problem: help a room of people start playing without stopping to read a rulebook.", image: null },
  { slug: "lucky-day", title: "Lucky Day", purpose: "An interaction you can feel.", context: "Slot-machine study · iOS", focus: "The design problem: use timing, spring motion and haptics to give an on-screen interaction weight.", image: null },
] as const;

export function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = section.current, windowElement = viewport.current, rail = track.current;
    if (!root || !windowElement || !rail) return;
    const preference = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      const pinned = preference.matches;
      if (pinned && windowElement.scrollLeft !== 0) windowElement.scrollLeft = 0;
      root.dataset.pinned = String(pinned);
      const travel = Math.max(0, rail.scrollWidth - windowElement.clientWidth);
      distance.current = travel;
      root.style.setProperty("--travel", `${travel}px`);
      const progress = pinned ? Math.min(1, Math.max(0, -root.getBoundingClientRect().top / Math.max(1, travel))) : 0;
      rail.style.transform = pinned ? `translate3d(${-progress * travel}px,0,0)` : "none";
      const shift = pinned ? progress * travel : windowElement.scrollLeft;
      root.style.setProperty("--work-progress", String(travel > 0 ? Math.min(1, Math.max(0, shift / travel)) : 0));
      const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-project]"));
      const closest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - shift - 64) < Math.abs(cards[best].offsetLeft - shift - 64) ? index : best, 0);
      setActive(closest);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(windowElement);
    observer.observe(rail);
    window.addEventListener("scroll", schedule, { passive: true });
    windowElement.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener("scroll", schedule);
      windowElement.removeEventListener("scroll", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  const moveTo = (index: number, instant = false) => {
    const root = section.current, rail = track.current, windowElement = viewport.current;
    const card = rail?.querySelectorAll<HTMLElement>("[data-project]")[index];
    if (!root || !card || !windowElement) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = instant || reduced ? "instant" : "smooth";
    if (root.dataset.pinned === "true") {
      const top = root.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + Math.min(distance.current, Math.max(0, card.offsetLeft - 64)), behavior });
    } else windowElement.scrollTo({ left: card.offsetLeft - (window.innerWidth < 1024 ? 24 : 64), behavior });
  };

  return (
    <section ref={section} id="selected-work" className={styles.section} aria-labelledby="work-title">
      <div className={styles.sticky}>
        <div className={styles.toolbar}>
          <h2 id="work-title">Selected work</h2>
          <nav className={styles.controls} aria-label="Choose a project">
            <Link className={styles.viewMore} href={`/projects/${selected[active].slug}`}>View More</Link>
            <button onClick={() => moveTo(active - 1)} disabled={active === 0} aria-label="Previous project">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg>
            </button>
            <button onClick={() => moveTo(active + 1)} disabled={active === selected.length - 1} aria-label="Next project">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
            </button>
          </nav>
        </div>
        <div ref={viewport} className={styles.viewport}>
          <div ref={track} className={styles.track}>
            {selected.map((project, index) => {
              const detail = projectDetails[project.slug];
              const role = detail.meta?.find(field => field.k === "ROLE")?.v;
              const status = detail.meta?.find(field => field.k === "STATUS")?.v ?? detail.meta?.find(field => field.k === "PERIOD")?.v;
              return (
                <article key={project.slug} data-project className={styles.project} onFocusCapture={() => {
                    const card = track.current?.querySelectorAll<HTMLElement>("[data-project]")[index];
                    if (card && (card.getBoundingClientRect().left < 0 || card.getBoundingClientRect().right > window.innerWidth)) moveTo(index, true);
                  }}>
                  <Link className={styles.mediaLink} href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}>
                    {project.image ? <Image src={project.image} alt="Sachetana onboarding and journal interface" fill sizes="(max-width: 767px) 90vw, 1088px" className={styles.image} /> : project.slug === "wylde" ? (
                      <div className={styles.wyldeArt} aria-hidden="true">
                        <span className={styles.artLabel}>PASS THE PHONE. START SOMETHING.</span>
                        <div className={styles.deck}><div className={styles.cardBack} /><div className={styles.playCard}><span>WYLDE</span><strong>Good company.<br /><i>Wild cards.</i></strong><span>PARTY CARD GAME · INTERACTION STUDY</span></div></div>
                        <span className={styles.artCaption}>Identity &amp; interaction direction</span>
                      </div>
                    ) : (
                      <div className={styles.luckyArt} aria-hidden="true">
                        <span className={styles.artLabel}>A STUDY IN CHANCE &amp; FEEL</span>
                        <div className={styles.machine}><span>LUCKY DAY</span><div className={styles.reels}>{[7, 7, 7].map((number, reel) => <span key={reel}>{number}</span>)}</div><span className={styles.machineFoot}>TIMING. WEIGHT. A LITTLE LUCK.</span></div>
                        <span className={styles.artCaption}>Motion &amp; haptics study</span>
                      </div>
                    )}
                  </Link>
                  <div className={styles.caption}>
                    <div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p className={styles.purpose}>{project.purpose}</p></div>
                    <div className={styles.facts}><p>{project.context}</p><p>{role}</p><p>{status}</p></div>
                  </div>
                  <p className={styles.context}>{project.focus}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className={styles.progress} role="progressbar" aria-label="Selected project" aria-valuemin={1} aria-valuemax={selected.length} aria-valuenow={active + 1} aria-valuetext={`${active + 1} of ${selected.length}: ${selected[active].title}`}><span /></div>
      </div>
    </section>
  );
}

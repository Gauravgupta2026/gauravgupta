"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BehindTheWork.module.css";

const SCENES = [
  {
    src: "/assets/projects/lucky-day.jpg",
    alt: "Two Lucky Day interface studies displayed on phones",
    label: "Interaction studies",
    size: "medium",
  },
  {
    src: "/photos/about/09-notebook-outdoors.jpg",
    alt: "A notebook open outdoors during the working process",
    label: "Notes in progress",
    size: "small",
  },
  {
    src: "/photos/about/03-sketching.jpg",
    alt: "Sketching during an early project exploration",
    label: "Early sketches",
    size: "small",
  },
  {
    src: "/assets/projects/sachetana.jpg",
    alt: "Two Sachetana prototype screens displayed on phones",
    label: "Prototype passes",
    size: "large",
  },
  {
    src: "/photos/about/13-ink-study.jpg",
    alt: "An ink study made during visual exploration",
    label: "Visual studies",
    size: "medium",
  },
  {
    src: "/photos/about/15-workbench.jpg",
    alt: "A workbench used during the making process",
    label: "At the workbench",
    size: "small",
  },
  {
    src: "/photos/about/06-tools.jpg",
    alt: "Tools arranged during the building process",
    label: "Tools in use",
    size: "small",
  },
  {
    src: "/assets/projects/wylde.jpg",
    alt: "An interior environment study associated with Wylde",
    label: "Room studies",
    size: "medium",
  },
  {
    src: "/photos/about/05-reading.jpg",
    alt: "Reading and research during project development",
    label: "Research notes",
    size: "small",
  },
] as const;

const WAVEFORM_HEIGHTS = [8, 16, 28, 46, 72, 46, 28, 16, 8] as const;

export function BehindTheWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveCard = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const railLeft = rail.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(rail.children).forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    updateActiveCard();
    window.addEventListener("resize", updateActiveCard);
    return () => window.removeEventListener("resize", updateActiveCard);
  }, [updateActiveCard]);

  return (
    <section
      className={styles.section}
      aria-label="Behind-the-scenes project gallery"
      data-browser-theme-color="#ffffff"
    >
      <div
        ref={railRef}
        className={styles.rail}
        onScroll={updateActiveCard}
        tabIndex={0}
        aria-label="Scrollable behind-the-scenes project gallery"
      >
        {SCENES.map((scene) => (
          <figure
            className={`${styles.card} ${styles[scene.size]}`}
            key={`${scene.src}-${scene.label}`}
          >
            <div className={styles.imageFrame}>
              <Image
                src={scene.src}
                alt={scene.alt}
                fill
                sizes="(max-width: 640px) 76vw, 42vw"
                className={styles.image}
              />
            </div>
          </figure>
        ))}
      </div>

      <div className={styles.progressWrap} aria-hidden="true">
        {WAVEFORM_HEIGHTS.map((height, index) => (
          <span
            className={`${styles.progressBar} ${index === activeIndex ? styles.activeBar : ""}`}
            style={{ height: `${height}px` }}
            key={`${height}-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

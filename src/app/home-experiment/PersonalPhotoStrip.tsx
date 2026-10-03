"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const PHOTOS = [
  { src: "/photos/alternate/mountain-portrait.webp", alt: "Gaurav resting on a rock in a snowy mountain landscape", width: 1600, height: 900, shape: "wide" },
  { src: "/photos/alternate/mountain-path.webp", alt: "A line of trekkers making their way across a snow-covered valley", width: 1600, height: 1200, shape: "landscape" },
  { src: "/photos/alternate/mountain-valley.webp", alt: "Gaurav looking out over a mountain valley beneath a cloudy blue sky", width: 1600, height: 1200, shape: "landscape" },
  { src: "/photos/beach-manipal.png", alt: "Friends resting on the beach at night in Manipal", width: 1512, height: 843, shape: "wide" },
] as const;

export function PersonalPhotoStrip() {
  const strip = useRef<HTMLElement>(null);
  const [suspended, setSuspended] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = strip.current;
    if (!node) return;
    let visible = false;
    const update = () => setSuspended(!visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <section ref={strip} className={styles.photoSection} aria-label="Personal photographs">
      <div className={styles.photoViewport} tabIndex={0} aria-label="Personal photo strip. Scroll to view photographs.">
        <div className={styles.photoTrack} data-paused={suspended || paused}>
          {[0, 1].map(copy => (
            <div key={copy} className={styles.photoGroup} aria-hidden={copy === 1 ? true : undefined}>
              {PHOTOS.map((photo, index) => (
                <figure key={photo.src} className={photo.shape === "wide" ? styles.widePhoto : styles.landscapePhoto}>
                  <Image src={photo.src} alt={copy === 0 ? photo.alt : ""} width={photo.width} height={photo.height}
                    sizes="(max-width: 768px) 85vw, 600px" priority={copy === 0 && index === 0} />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className={styles.photoControl} type="button" aria-pressed={paused}
        aria-label={paused ? "Resume photograph scrolling" : "Pause photograph scrolling"}
        onClick={() => setPaused((current) => !current)}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M7 4 20 12 7 20Z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
        </svg>
      </button>
    </section>
  );
}

"use client";

import { useEffect, useRef, type RefObject } from "react";
import { FLOWER_BED_CONFIG } from "./flowerBedConfig";
import { createFlowerBed } from "./flowerBedEngine";
import styles from "./FlowerBed.module.css";

type FlowerBedProps = {
  hero: RefObject<HTMLElement | null>;
  name: RefObject<HTMLHeadingElement | null>;
  role: RefObject<HTMLParagraphElement | null>;
  paused: boolean;
};

export function FlowerBed({ hero, name, role, paused }: FlowerBedProps) {
  const strip = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLCanvasElement>(null);
  const dots = useRef<HTMLCanvasElement>(null);
  const live = useRef<HTMLCanvasElement>(null);
  const engine = useRef<ReturnType<typeof createFlowerBed> | null>(null);

  useEffect(() => {
    if (!hero.current || !name.current || !role.current || !strip.current || !photo.current || !dots.current || !live.current) return;
    const field = createFlowerBed({
      root: hero.current, name: name.current, role: role.current,
      strip: strip.current, posterPhoto: photo.current, posterDots: dots.current, live: live.current,
    });
    engine.current = field;
    return () => { field.destroy(); engine.current = null; };
  }, [hero, name, role]);

  useEffect(() => { engine.current?.setPaused(paused); }, [paused]);

  return (
    <div ref={strip} className={styles.strip} style={{ height: `${FLOWER_BED_CONFIG.stripHeightVh}svh` }} aria-hidden="true">
      <picture className={styles.fallback}>
        <source media="(max-width: 767px)" srcSet="/media/flower-bed-mobile.jpg" />
        {/* The source image is also the no-JavaScript fallback for the canvas artwork. */}
        <img src="/media/flower-bed-desktop.jpg" alt="" width="1942" height="809" />
      </picture>
      <canvas ref={photo} className={styles.poster} />
      <canvas ref={dots} className={styles.poster} />
      <canvas ref={live} className={styles.live} />
    </div>
  );
}

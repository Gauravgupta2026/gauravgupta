"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./PetalDivider.module.css";

const FLIGHT_MS = 9000;
const WILT_MS = 1800;
const RIPPLE_MS = 4200;
const RIPPLE_INTERVAL_MS = 1200;
const RIPPLE_COUNT = 3;
const FRAME_MS = 1000 / 30;
const END_MS = FLIGHT_MS + RIPPLE_MS + RIPPLE_INTERVAL_MS * (RIPPLE_COUNT - 1);
const WATER_EDGE = 8;
const PIECES = Array.from({ length: 14 }, (_, index) => ({
  variant: index % 4, x: 15 + index * 5.4, size: 36 + index % 4 * 9,
  delay: index * 90, turn: index % 2 === 0 ? 1 : -1,
}));
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

export function PetalDivider() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const forced = matchMedia("(forced-colors: active)");
    const pieces = Array.from(element.querySelectorAll<HTMLElement>("[data-botanical]"));
    const water = element.querySelector<SVGSVGElement>("svg");
    const ripples = Array.from(element.querySelectorAll<SVGPathElement>("[data-ripple]"));
    let inView = false;
    let frame = 0;
    let previousTime = 0;
    let lastPaint = 0;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    element.dataset.settled = "false";
    element.style.setProperty("--line-opacity", "0");
    const draw = () => {
      const impact = smooth((elapsed - FLIGHT_MS) / WILT_MS);
      element.style.setProperty("--line-opacity", String(impact));
      element.dataset.progress = (elapsed / END_MS).toFixed(3);
      pieces.forEach((piece, index) => {
        const spec = PIECES[index];
        const flight = smooth((elapsed - spec.delay) / FLIGHT_MS);
        const wilt = clamp((elapsed - spec.delay - FLIGHT_MS) / WILT_MS);
        const flutter = Math.sin(flight * Math.PI * 3 + index) * (1 - flight);
        const startX = -(width * spec.x / 100 + spec.size + 32);
        // Every piece dissolves at its own landing point; nothing gathers into a pile.
        piece.style.transform = `translate3d(${startX * (1 - flight)}px,${-height * .85 * (1 - flight) + flutter * 10}px,0) rotate(${spec.turn * (1 - flight) * 60 + flutter * 12}deg)`;
        piece.style.opacity = String(smooth(flight * 6) * (1 - smooth((wilt - .8) / .2)));
        piece.style.setProperty("--wilt", String(smooth(wilt * 3)));
        piece.style.setProperty("--dither-dot", `${1.8 * (1 - Math.floor(wilt * 8) / 8)}px`);
      });
      ripples.forEach((ripple, index) => {
        const phase = (elapsed - FLIGHT_MS - index * RIPPLE_INTERVAL_MS) / RIPPLE_MS;
        if (phase <= 0 || phase >= 1) { ripple.style.opacity = "0"; return; }
        const radius = phase * width * .6;
        const envelope = Math.sin(phase * Math.PI) * (1 - phase);
        const points = Array.from({ length: 61 }, (_, point) => {
          const x = point / 60 * width;
          const distance = Math.abs(x - width / 2) - radius;
          const wave = Math.sin(distance / 10) * Math.exp(-Math.pow(distance / 30, 2));
          return `${point ? "L" : "M"}${x.toFixed(1)},${(height - WATER_EDGE + wave * 3 * envelope).toFixed(2)}`;
        });
        ripple.setAttribute("d", points.join(" "));
        ripple.style.opacity = String(envelope);
      });
      element.dataset.settled = String(elapsed >= END_MS);
    };
    const paint = (time: number) => {
      frame = 0;
      if (!inView || document.hidden || reduced.matches || forced.matches) return;
      // Active time only: a hidden tab or fast scroll cannot skip the slow descent.
      elapsed = Math.min(END_MS, elapsed + (previousTime ? Math.min(time - previousTime, 50) : 0));
      previousTime = time;
      if (time - lastPaint >= FRAME_MS || elapsed >= END_MS) { draw(); lastPaint = time; }
      if (elapsed < END_MS) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      const box = element.getBoundingClientRect();
      width = box.width; height = box.height;
      water?.setAttribute("viewBox", `0 0 ${width} ${height}`);
      draw();
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; previousTime = 0;
      const active = inView && !document.hidden && !reduced.matches && !forced.matches;
      element.dataset.active = String(active);
      if (active && elapsed < END_MS) frame = requestAnimationFrame(paint);
    };
    const layout = new ResizeObserver(measure);
    layout.observe(element);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    forced.addEventListener("change", sync);
    measure();
    return () => {
      observer.disconnect(); layout.disconnect(); cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync); forced.removeEventListener("change", sync);
    };
  }, [pathname]);
  return <div ref={root} className={styles.scene} aria-hidden="true" data-active="false" data-settled="false">
    {PIECES.map((piece, index) => <span key={index} data-botanical className={styles.piece} style={{ left: `${piece.x}%`, width: piece.size, height: piece.size, backgroundPosition: `${piece.variant % 2 * 100}% ${Math.floor(piece.variant / 2) * 100}%` }}><span className={styles.solid} /><span className={styles.dither} /></span>)}
    <div className={styles.line} />
    <svg className={styles.water} preserveAspectRatio="none">{Array.from({ length: RIPPLE_COUNT }, (_, index) => <path key={index} data-ripple />)}</svg>
  </div>;
}

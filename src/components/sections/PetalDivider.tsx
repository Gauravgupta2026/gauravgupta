"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./PetalDivider.module.css";

const TRAVEL_DURATION_MS = 4200;
const ENTRY_VIEWPORT_FRACTION = .95;
const END_SCROLL_CLEARANCE = 36;
const PIECES = Array.from({ length: 14 }, (_, index) => ({
  variant: index % 4,
  x: 15 + index * 5.4,
  size: 36 + index % 4 * 9,
  delay: index % 4 * .025,
  turn: index % 2 === 0 ? 1 : -1,
}));
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

export function PetalDivider() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    element.style.setProperty("--line-opacity", "0");
    element.style.setProperty("--line-spread", "0");
    element.dataset.settled = "false";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const pieces = Array.from(element.querySelectorAll<HTMLElement>("[data-botanical]"));
    let inView = false;
    let frame = 0;
    let previousTime = 0;
    let progress = 0;
    let target = 0;
    let width = 0;
    let height = 0;
    let top = 0;
    const paint = (time: number) => {
      frame = 0;
      if (!inView || document.hidden || reduced.matches) return;
      const delta = previousTime ? Math.min(time - previousTime, 1000) : 16;
      previousTime = time;
      const difference = target - progress;
      progress += Math.sign(difference) * Math.min(Math.abs(difference), delta / TRAVEL_DURATION_MS);
      const morph = smooth((progress - .68) / .27);
      const spread = smooth((progress - .8) / .2);
      element.style.setProperty("--line-spread", String(spread));
      element.style.setProperty("--line-opacity", String(smooth((progress - .78) / .16)));
      element.dataset.settled = String(progress > .98);
      element.dataset.progress = progress.toFixed(3);
      pieces.forEach((piece, index) => {
        const spec = PIECES[index];
        const flight = smooth((progress - spec.delay) / .52);
        const flutter = Math.sin(flight * Math.PI * 3 + index) * (1 - flight);
        const startX = -(width * spec.x / 100 + spec.size + 32);
        const centerX = width * (.5 - spec.x / 100) - spec.size / 2;
        const x = startX * (1 - flight) + centerX * morph;
        const y = -height * .85 * (1 - flight) + flutter * 18;
        const rotate = (spec.turn * (1 - flight) * 85 + index * 17 + flutter * 15) * (1 - morph);
        piece.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rotate}deg) scaleX(${1 + morph * 1.5}) scaleY(${1 - morph * .985})`;
        piece.style.opacity = String(smooth(flight * 5) * (1 - smooth((progress - .86) / .12)));
      });
      if (Math.abs(target - progress) > .0005) frame = requestAnimationFrame(paint);
    };
    const updateTarget = () => {
      // Cached document coordinates avoid layout reads during scrolling.
      target = clamp((innerHeight * ENTRY_VIEWPORT_FRACTION - top + scrollY) / (height + END_SCROLL_CLEARANCE));
      if (inView && !document.hidden && !reduced.matches && !frame) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      const box = element.getBoundingClientRect();
      width = box.width; height = box.height; top = box.top + scrollY;
      updateTarget();
    };
    const layout = new ResizeObserver(measure);
    layout.observe(document.body);
    const sync = () => {
      const active = inView && !document.hidden && !reduced.matches;
      element.dataset.active = String(active);
      window.removeEventListener("scroll", updateTarget);
      cancelAnimationFrame(frame); frame = 0; previousTime = 0;
      if (active) { previousTime = performance.now(); window.addEventListener("scroll", updateTarget, { passive: true }); measure(); }
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(element);
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect(); layout.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateTarget); window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
    };
  }, [pathname]);
  return <div ref={root} className={styles.scene} aria-hidden="true" data-active="false" data-settled="false">
    {PIECES.map((piece, index) => <span key={index} data-botanical className={styles.piece} style={{ left: `${piece.x}%`, width: piece.size, height: piece.size, backgroundPosition: `${piece.variant % 2 * 100}% ${Math.floor(piece.variant / 2) * 100}%` }} />)}
    <div className={styles.line}><span /><span /></div>
  </div>;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { crossesDownward } from "./waterlineMotion";
import styles from "./WaterlineDivider.module.css";

const FRAME_MS = 1000 / 30;
const WATER_EDGE = 8;
const RIPPLE_MS = 1600;
const RIPPLE_INTERVAL_MS = 350;
const RIPPLE_COUNT = 3;
const SEQUENCE_MS = RIPPLE_MS + RIPPLE_INTERVAL_MS * (RIPPLE_COUNT - 1);

export function WaterlineDivider() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const forced = matchMedia("(forced-colors: active)");
    const water = element.querySelector<SVGSVGElement>("svg");
    const ripples = Array.from(element.querySelectorAll<SVGPathElement>("path"));
    let inView = false;
    let frame = 0;
    let previousTime = 0;
    let lastPaint = 0;
    let elapsed = SEQUENCE_MS;
    let previousY: number | null = null;
    let previousX = 0;
    let width = 0;
    let height = 0;
    let origin = 0;
    const draw = () => {
      ripples.forEach((ripple, index) => {
        const phase = (elapsed - index * RIPPLE_INTERVAL_MS) / RIPPLE_MS;
        if (phase <= 0 || phase >= 1) { ripple.style.opacity = "0"; return; }
        const radius = phase * Math.max(origin, width - origin);
        const envelope = Math.sin(phase * Math.PI) * (1 - phase);
        const points = Array.from({ length: 81 }, (_, point) => {
          const x = point / 80 * width;
          const distance = Math.abs(x - origin) - radius;
          const wave = Math.sin(distance / 10) * Math.exp(-Math.pow(distance / 30, 2));
          return `${point ? "L" : "M"}${x.toFixed(1)},${(height - WATER_EDGE + wave * 3 * envelope).toFixed(2)}`;
        });
        ripple.setAttribute("d", points.join(" "));
        ripple.style.opacity = String(envelope);
      });
      element.dataset.rippling = String(elapsed < SEQUENCE_MS);
    };
    const paint = (time: number) => {
      frame = 0;
      if (!inView || document.hidden || reduced.matches || forced.matches) return;
      elapsed = Math.min(SEQUENCE_MS, elapsed + (previousTime ? Math.min(time - previousTime, 50) : 0));
      previousTime = time;
      if (time - lastPaint >= FRAME_MS || elapsed >= SEQUENCE_MS) { draw(); lastPaint = time; }
      if (elapsed < SEQUENCE_MS) frame = requestAnimationFrame(paint);
    };
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0; previousTime = 0; previousY = null;
      elapsed = SEQUENCE_MS;
      draw();
    };
    const pointerMove = (event: PointerEvent) => {
      if (!inView || document.hidden || reduced.matches || forced.matches || event.pointerType === "touch") {
        previousY = null;
        return;
      }
      const box = element.getBoundingClientRect();
      const lineY = box.bottom - WATER_EDGE;
      // Direction matters: entering from the footer or hovering below is inert.
      const crossed = previousY !== null && crossesDownward(previousY, event.clientY, lineY);
      const contactX = crossed
        ? previousX + (event.clientX - previousX) * (lineY - previousY!) / (event.clientY - previousY!)
        : event.clientX;
      previousY = event.clientY; previousX = event.clientX;
      if (!crossed || contactX < box.left || contactX > box.right || elapsed < SEQUENCE_MS) return;
      origin = contactX - box.left;
      elapsed = 0; previousTime = 0; lastPaint = 0;
      element.dataset.rippling = "true";
      frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      const box = element.getBoundingClientRect();
      width = box.width; height = box.height;
      water?.setAttribute("viewBox", `0 0 ${width} ${height}`);
      draw();
    };
    const layout = new ResizeObserver(measure);
    layout.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) reset();
    });
    observer.observe(element);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    document.addEventListener("visibilitychange", reset);
    reduced.addEventListener("change", reset);
    forced.addEventListener("change", reset);
    measure();
    return () => {
      observer.disconnect(); layout.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("visibilitychange", reset);
      reduced.removeEventListener("change", reset); forced.removeEventListener("change", reset);
    };
  }, [pathname]);
  return <div ref={root} className={styles.scene} aria-hidden="true" data-rippling="false">
    <div className={styles.line} />
    <svg className={styles.water} preserveAspectRatio="none">{Array.from({ length: RIPPLE_COUNT }, (_, index) => <path key={index} />)}</svg>
  </div>;
}

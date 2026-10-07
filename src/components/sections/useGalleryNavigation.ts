"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const WHEEL_LINE_PIXELS = 16;

export function useGalleryNavigation(resetKey = "all") {
  const gallery = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const rail = gallery.current;
    if (!rail) return;
    let frame = 0;
    let maximum = 0;
    const refresh = () => {
      frame = 0;
      const start = rail.scrollLeft <= 1;
      const end = rail.scrollLeft >= maximum - 1;
      setEdges(current => current.start === start && current.end === end ? current : { start, end });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(refresh); };
    const measure = () => { maximum = Math.max(0, rail.scrollWidth - rail.clientWidth); schedule(); };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? WHEEL_LINE_PIXELS : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? rail.clientWidth : 1;
      const delta = event.deltaY * unit;
      if ((delta > 0 && rail.scrollLeft >= maximum - 1) || (delta < 0 && rail.scrollLeft <= 1)) return;
      event.preventDefault();
      rail.scrollLeft += delta;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    rail.addEventListener("wheel", wheel, { passive: false });
    rail.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); rail.removeEventListener("wheel", wheel); rail.removeEventListener("scroll", schedule); };
  }, [resetKey]);
  const move = (direction: -1 | 1) => {
    const rail = gallery.current;
    if (rail) rail.scrollBy({ left: direction * rail.clientWidth, behavior: "instant" });
  };
  const updateEdges = useCallback(() => {
    const rail = gallery.current;
    if (rail) {
      const start = rail.scrollLeft <= 1;
      const end = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1;
      setEdges(current => current.start === start && current.end === end ? current : { start, end });
    }
  }, []);
  useLayoutEffect(() => {
    const rail = gallery.current;
    if (rail) rail.scrollLeft = 0;
    updateEdges();
  }, [resetKey, updateEdges]);
  return { gallery, edges, move, updateEdges };
}

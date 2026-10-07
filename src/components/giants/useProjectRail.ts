"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_READING_VIEWPORTS = 0.45;

export function useProjectRail(projectCount: number) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const geometry = useRef({ top: 0, travel: 0, hold: 0, pinned: false, stops: [0] });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const root = section.current, windowElement = viewport.current, rail = track.current;
    if (!root || !windowElement || !rail) return;
    const preference = window.matchMedia("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)");
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-project]"));
    let frame = 0, visible = false, listening = false, dead = false, currentPanel = -1;

    const update = () => {
      frame = 0;
      const { top, travel, hold, pinned, stops } = geometry.current;
      if (pinned && windowElement.scrollLeft !== 0) windowElement.scrollLeft = 0;
      const shift = Math.min(travel, Math.max(0, pinned ? window.scrollY - top - hold : windowElement.scrollLeft));
      if (pinned) rail.style.transform = `translate3d(${-shift}px,0,0)`;
      root.style.setProperty("--work-progress", String(travel ? shift / travel : 0));
      const nearest = stops.reduce((best, stop, index) => Math.abs(stop - shift) < Math.abs(stops[best] - shift) ? index : best, 0);
      if (nearest - 1 !== currentPanel) { currentPanel = nearest - 1; setActive(currentPanel); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const syncListener = () => {
      const want = geometry.current.pinned && visible;
      if (want === listening) return;
      listening = want;
      if (want) window.addEventListener("scroll", schedule, { passive: true });
      else window.removeEventListener("scroll", schedule);
    };
    const measure = () => {
      if (dead) return;
      const pinned = preference.matches;
      root.dataset.pinned = String(pinned);
      root.style.setProperty("--panel-width", `${windowElement.clientWidth}px`);
      if (pinned) windowElement.scrollLeft = 0;
      else rail.style.transform = "none";
      // Read geometry only on layout changes, not on each scroll frame.
      const travel = Math.max(0, rail.scrollWidth - windowElement.clientWidth);
      geometry.current = {
        top: root.getBoundingClientRect().top + window.scrollY, travel, pinned,
        hold: pinned ? windowElement.clientHeight * INTRO_READING_VIEWPORTS : 0,
        stops: [0, ...cards.map(card => Math.min(travel, card.offsetLeft))],
      };
      root.style.setProperty("--travel", `${travel}px`);
      root.style.setProperty("--intro-hold", `${geometry.current.hold}px`);
      syncListener();
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(windowElement);
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncListener();
      schedule();
    });
    visibility.observe(root);
    windowElement.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      observer.disconnect(); visibility.disconnect();
      window.removeEventListener("scroll", schedule);
      windowElement.removeEventListener("scroll", schedule);
      preference.removeEventListener("change", measure);
    };
  }, []);

  const moveTo = useCallback((index: number) => {
    const windowElement = viewport.current;
    if (!windowElement || index < -1 || index >= projectCount) return;
    const { top, hold, pinned, stops } = geometry.current;
    const destination = stops[index + 1] ?? 0;
    // Direct navigation also works without scroll animation or precise wheel input.
    const behavior = "instant";
    if (pinned) window.scrollTo({ top: top + (index < 0 ? 0 : hold) + destination, behavior });
    else windowElement.scrollTo({ left: destination, behavior });
  }, [projectCount]);

  const revealFocusedProject = (index: number) => {
    const { stops, pinned, top, hold } = geometry.current;
    const shift = pinned ? Math.max(0, window.scrollY - top - hold) : viewport.current?.scrollLeft ?? 0;
    if (Math.abs(shift - stops[index + 1]) > 1) moveTo(index);
  };

  return { section, viewport, track, active, moveTo, revealFocusedProject };
}

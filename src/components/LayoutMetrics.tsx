"use client";

import { useLayoutEffect } from "react";

export function LayoutMetrics() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const measure = () => {
      const width = `${document.body.getBoundingClientRect().width}px`;
      if (root.style.getPropertyValue("--viewport-width") !== width) root.style.setProperty("--viewport-width", width);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    measure();
    return () => { observer.disconnect(); root.style.removeProperty("--viewport-width"); };
  }, []);
  return null;
}

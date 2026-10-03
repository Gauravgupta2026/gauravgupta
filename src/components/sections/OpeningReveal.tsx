"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** A local, once-only entrance; opening copy remains readable before it runs. */
export function OpeningReveal({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "figure";
  className?: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const Tag = as === "figure" ? m.figure : m.div;
  return (
    <Tag
      className={className}
      initial={{ y: 0 }}
      whileInView={reducedMotion ? { y: 0 } : { y: [12, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      {children}
    </Tag>
  );
}

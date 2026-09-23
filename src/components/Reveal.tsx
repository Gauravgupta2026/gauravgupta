"use client";

import { m, useReducedMotion, type Transition } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE: Transition["ease"] = [0.16, 0.7, 0.2, 1];

const MOTION_TAGS = {
  article: m.article,
  div: m.div,
  figure: m.figure,
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  p: m.p,
  span: m.span,
} as const;

type RevealTag = keyof typeof MOTION_TAGS;

/**
 * Scroll-in rise, driven by Framer Motion's `whileInView` instead of a
 * hand-rolled IntersectionObserver — same trigger point (12% visible, bottom
 * 7% trimmed) but interpolated on the compositor, so it stays smooth even
 * when several reveals fire in the same frame (e.g. a fast scroll past a
 * stacked list). `once: true` mirrors the old unobserve-after-first-reveal.
 *
 * Content stays visible before the observer fires, so a missed or delayed
 * intersection can never leave page copy hidden. Only `transform` animates
 * (compositor-only, no layout/paint) and
 * disconnects its observer after firing once — no ongoing per-frame cost.
 * Uses the `m` component (not `motion`) paired with `<LazyMotion>` in
 * layout.tsx, which loads only the `domAnimation` feature set instead of
 * Framer Motion's full bundle — this is the one animated primitive on the
 * site, so keep it on the lightweight import path.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}: {
  as?: RevealTag;
  className?: string;
  /** Optional stagger, in ms. */
  delay?: number;
  children: ReactNode;
} & Record<string, unknown>) {
  const reducedMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[Tag] as ElementType;

  if (reducedMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.45, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

"use client";

import { m, useReducedMotion, type Transition } from "framer-motion";
import { useMemo, type ElementType, type ReactNode } from "react";

const EASE: Transition["ease"] = [0.16, 0.7, 0.2, 1];

/**
 * Scroll-in fade + rise, driven by Framer Motion's `whileInView` instead of a
 * hand-rolled IntersectionObserver — same trigger point (12% visible, bottom
 * 7% trimmed) but interpolated on the compositor, so it stays smooth even
 * when several reveals fire in the same frame (e.g. a fast scroll past a
 * stacked list). `once: true` mirrors the old unobserve-after-first-reveal.
 *
 * Only animates `opacity`/`transform` (compositor-only, no layout/paint) and
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
  as?: ElementType;
  className?: string;
  /** Optional stagger, in ms. */
  delay?: number;
  children: ReactNode;
} & Record<string, unknown>) {
  const reducedMotion = useReducedMotion();
  // Memoized on Tag: m.create() returns a new component identity on every
  // call, and recreating it per-render would make React remount the element
  // each time — resetting whileInView mid-animation into an abrupt pop
  // instead of a smooth transition.
  const MotionTag = useMemo(() => m.create(Tag), [Tag]);

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

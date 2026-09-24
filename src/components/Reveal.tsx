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
type RevealVariant = "default" | "chapter" | "project";

const VARIANTS = {
  default: {
    initial: { opacity: 1, y: 20, scale: 1 },
    transition: { duration: 0.45, ease: EASE },
  },
  chapter: {
    initial: { opacity: 0.35, y: 44, scale: 0.985 },
    transition: { duration: 0.82, ease: EASE },
  },
  project: {
    initial: { opacity: 0.42, y: 54, scale: 0.99 },
    transition: { duration: 0.72, ease: EASE },
  },
} satisfies Record<RevealVariant, { initial: { opacity: number; y: number; scale: number }; transition: Transition }>;

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
  variant = "default",
  children,
  ...rest
}: {
  as?: RevealTag;
  className?: string;
  /** Optional stagger, in ms. */
  delay?: number;
  /** A slower chapter or project entrance for major landing-page transitions. */
  variant?: RevealVariant;
  children: ReactNode;
} & Record<string, unknown>) {
  const reducedMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[Tag] as ElementType;
  const motion = VARIANTS[variant];

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
      initial={motion.initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: variant === "project" ? 0.3 : 0.22, margin: "0px 0px -7% 0px" }}
      transition={{ ...motion.transition, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

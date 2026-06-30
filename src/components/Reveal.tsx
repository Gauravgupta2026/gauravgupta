"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-in fade + rise. Mirrors the reference IntersectionObserver:
 * threshold 0.12, rootMargin trims the bottom 7% so reveals fire slightly
 * before the element is fully on screen. Unobserves after first reveal.
 *
 * The `.reveal` base + `.is-visible` classes live in globals.css, which also
 * neutralizes the effect under prefers-reduced-motion.
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
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

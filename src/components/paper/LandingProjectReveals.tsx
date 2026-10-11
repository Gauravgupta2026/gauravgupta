"use client";

import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function LandingProjectReveals({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}

export function LandingProject({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const focused = useInView(ref, { amount: 0.3, margin: "-10% 0px -20% 0px" });
  return <Reveal ref={ref} as="article" variant="project" viewport={{ once: true, amount: 0.3, margin: "0px 0px -35% 0px" }} className={className} data-focused={focused}>{children}</Reveal>;
}

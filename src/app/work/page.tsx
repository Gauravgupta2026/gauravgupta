import type { Metadata } from "next";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { LandingNav } from "@/components/sections/LandingNav";
import { WorkEditorial } from "@/components/sections/WorkEditorial";

export const metadata: Metadata = {
  title: "Work — Gaurav Gupta",
  description: "Product design and building work across social play, student wellbeing, and research tools.",
};

export default function WorkPage() {
  return (
    <main id="top" style={{ position: "relative", isolation: "isolate" }}>
      <LandingNav />
      <WorkEditorial />
      <FooterCTA />
    </main>
  );
}

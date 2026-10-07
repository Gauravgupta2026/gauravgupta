import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";
import { WorkEditorial } from "@/components/sections/WorkEditorial";

export const metadata: Metadata = {
  title: "Work — Gaurav Gupta",
  description: "Selected product design and building work by Gaurav Gupta.",
};

export default function WorkPage() {
  return (
    <PortfolioPage title="Ideas, made real." description="Selected product design and building work." active="work">
      <WorkEditorial />
    </PortfolioPage>
  );
}

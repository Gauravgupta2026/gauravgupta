import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";
import { LabsGrid } from "@/components/sections/LabsGrid";

export const metadata: Metadata = {
  title: "Labs — Gaurav Gupta",
  description: "Half-finished things kept in public. Nothing here is a product yet, and some of it never will be.",
};

export default function LabsPage() {
  return (
    <PortfolioPage title="Experiments" description="Half-finished things kept in public. Nothing here is a product yet, and some of it never will be." active="labs">
      <LabsGrid />
    </PortfolioPage>
  );
}

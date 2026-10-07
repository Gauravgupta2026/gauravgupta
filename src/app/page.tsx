import type { Viewport } from "next";
import { LandingPage } from "@/components/giants/LandingPage";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function Home() {
  return <LandingPage />;
}

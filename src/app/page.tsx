import type { Viewport } from "next";
import { LIGHT_FLOWER_DEFAULTS } from "@/components/giants/lightFlowerSettings";
import { LandingPage } from "@/components/giants/LandingPage";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: LIGHT_FLOWER_DEFAULTS.background },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

export default function Home() {
  return <LandingPage />;
}

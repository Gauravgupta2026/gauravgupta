import localFont from "next/font/local";
import { LandingExperience } from "./LandingExperience";
import { LIGHT_FLOWER_DEFAULTS } from "./lightFlowerSettings";
import type { CSSProperties } from "react";
import styles from "./EdnaOpening.module.css";

const switzer = localFont({
  src: [
    { path: "../../../public/fonts/frosted/switzer.woff2", weight: "400" },
    { path: "../../../public/fonts/frosted/switzer-light.woff", weight: "300" },
  ],
  variable: "--font-giants-body",
  display: "swap",
});
const albert = localFont({
  src: "../../../public/fonts/frosted/albert.ttf",
  variable: "--font-edna-ui",
  weight: "400",
  display: "swap",
});
const name = localFont({
  src: "../../../public/fonts/frosted/cormorant-italic.ttf",
  variable: "--font-edna-name",
  weight: "600",
  style: "italic",
  display: "swap",
});

export function LandingPage() {
  return (
    <main
      className={`${styles.page} ${switzer.variable} ${albert.variable} ${name.variable}`}
      style={{
        "--light-surface": LIGHT_FLOWER_DEFAULTS.background,
        "--light-veil": LIGHT_FLOWER_DEFAULTS.veil,
        fontFamily: "var(--font-giants-body), sans-serif",
      } as CSSProperties}
    >
      <LandingExperience />
    </main>
  );
}

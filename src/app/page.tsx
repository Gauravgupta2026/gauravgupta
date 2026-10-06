import localFont from "next/font/local";
import { LandingExperience } from "@/components/giants/LandingExperience";

const switzer = localFont({
  src: [
    { path: "../../public/fonts/frosted/switzer.woff2", weight: "400" },
    { path: "../../public/fonts/frosted/switzer-light.woff", weight: "300" },
  ],
  variable: "--font-giants-body",
  display: "swap",
});
const albert = localFont({
  src: "../../public/fonts/frosted/albert.ttf",
  variable: "--font-edna-ui",
  weight: "400",
  display: "swap",
});
const name = localFont({
  src: "../../public/fonts/frosted/cormorant-italic.ttf",
  variable: "--font-edna-name",
  weight: "600",
  style: "italic",
  display: "swap",
});

export default function Home() {
  return (
    <main className={`${switzer.variable} ${albert.variable} ${name.variable}`} style={{ background: "#0a0a0a", fontFamily: "var(--font-giants-body), sans-serif" }} data-browser-theme-color="#0a0a0a">
      <LandingExperience />
    </main>
  );
}

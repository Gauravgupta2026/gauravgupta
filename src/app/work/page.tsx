import type { Metadata } from "next";
import localFont from "next/font/local";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { WorkEditorial } from "@/components/sections/WorkEditorial";

const workNewsreader = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/Newsreader-VariableFont_opsz,wght.ttf",
      style: "normal",
      weight: "200 800",
    },
    {
      path: "../../../public/assets/fonts/Newsreader-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
      weight: "200 800",
    },
  ],
  variable: "--font-work-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Work — Gaurav Gupta",
  description:
    "Selected product design and building work by Gaurav Gupta.",
};

export default function WorkPage() {
  return (
    <main className={workNewsreader.variable} id="top">
      <WorkEditorial />
      <AboutFooter />
    </main>
  );
}

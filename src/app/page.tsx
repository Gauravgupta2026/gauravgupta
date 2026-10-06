import localFont from "next/font/local";
import Link from "next/link";
import { GiantsOpening } from "@/components/giants/GiantsOpening";
import { SelectedWork } from "@/components/giants/SelectedWork";
import styles from "@/components/giants/GiantsOpening.module.css";

const switzer = localFont({
  src: [
    { path: "../../public/fonts/frosted/switzer.woff2", weight: "400" },
    { path: "../../public/fonts/frosted/switzer-light.woff", weight: "300" },
  ],
  variable: "--font-giants-body",
  display: "swap",
});

const cormorant = localFont({
  src: "../../public/fonts/frosted/cormorant.ttf",
  variable: "--font-signature-editorial",
  weight: "400",
  display: "swap",
  preload: false,
});

const instrument = localFont({
  src: [
    { path: "../../public/fonts/frosted/instrument.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/frosted/instrument-italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-signature-instrument",
  display: "swap",
  preload: false,
});

const bodoni = localFont({
  src: "../../public/fonts/frosted/bodoni.ttf",
  variable: "--font-signature-bodoni",
  weight: "400",
  display: "swap",
  preload: false,
});

export default async function Home({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const requested = (await searchParams).type;
  const nameStyle = requested === "editorial" || requested === "bodoni" || requested === "italic" ? requested : "instrument";
  return (
    <main className={`${styles.page} ${switzer.variable} ${cormorant.variable} ${instrument.variable} ${bodoni.variable}`} data-browser-theme-color="#fffef7">
      <GiantsOpening nameStyle={nameStyle} />
      <section id="introduction" className={styles.introduction} aria-labelledby="intro-title">
        <p className={styles.eyebrow}>A way of seeing</p>
        <h2 id="intro-title">I design and build digital products, with care for how they work and feel.</h2>
        <div className={styles.introCopy}>
          <p>I’m drawn to good writing, thoughtful interfaces, and the small details that make an experience worth remembering.</p>
          <Link href="/about">More about me ↗</Link>
        </div>
      </section>
      <SelectedWork />
    </main>
  );
}

import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { IntroSplash } from "@/components/intro/IntroSplash";

/**
 * Decides — before first paint — whether the intro curtain plays.
 *
 * This has to be a blocking inline script rather than an effect: <IntroSplash>
 * is CSS-hidden by default, and only this script can reveal it early enough
 * that a first-time visitor never sees the page flash before the curtain drops.
 * The inverse (render visible, hide on mount) would flash the curtain at every
 * returning visitor, which is the exact failure this avoids.
 *
 * Skips entirely for reduced-motion and repeat visits within the session.
 */
const INTRO_BOOTSTRAP = `(function(){try{
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(sessionStorage.getItem('intro-seen'))return;
document.documentElement.dataset.intro='play';
document.documentElement.classList.add('intro-lock');
}catch(e){}})();`;

/**
 * Display serif. Italic 400 = headings/eyebrows, roman 500 = titles.
 * `opsz` is variable (6..72) so Newsreader optically adjusts across sizes.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/** UI / body / labels. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "Gaurav Gupta";
const DESCRIPTION =
  "I build AI systems and user-facing tools, moving from idea to interface to shipped product. Interested in long-horizon agents.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Gaurav Gupta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrainsMono.variable}`}
      // INTRO_BOOTSTRAP stamps data-intro / .intro-lock onto <html> before
      // hydration, which React would otherwise flag as a server/client mismatch
      // and repair — restarting the intro's animations from zero.
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
        <IntroSplash />
        {children}
      </body>
    </html>
  );
}

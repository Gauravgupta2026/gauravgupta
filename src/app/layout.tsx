import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
const TITLE = "Gaurav Gupta — AI systems & user-facing tools";
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
    >
      <body>{children}</body>
    </html>
  );
}

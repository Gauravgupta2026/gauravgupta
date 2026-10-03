import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

/** Body copy. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Code and technical annotations only. */
const dmMono = localFont({
  src: [
    { path: "./fonts/DMMono-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/DMMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DMMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
});

const editorial = localFont({
  src: [
    { path: "../../public/fonts/itc-garamond/ITCGaramondStd-Lt.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/itc-garamond/ITCGaramondStd-LtIta.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/itc-garamond/ITCGaramondStd-Bk.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-editorial-local",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "Gaurav Gupta — Design Engineer";
const DESCRIPTION =
  "I design and build thoughtful digital products, moving from idea and interface to shipped software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: false, follow: false },
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

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} ${editorial.variable}`}
    >
      <body>
        <PostHogProvider>
          {/* strict: throws if any component reaches for `motion` (full
              bundle) instead of `m` — keeps the site on the small
              domAnimation feature set (whileInView + basic transitions
              only, no gestures/layout/drag) instead of Framer Motion's
              full ~35kb bundle. */}
          <LazyMotion features={domAnimation} strict>
            {children}
          </LazyMotion>
        </PostHogProvider>
      </body>
    </html>
  );
}

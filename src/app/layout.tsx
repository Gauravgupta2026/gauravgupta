import type { Metadata, Viewport } from "next";
import {
  Inter,
  Allison,
  Benne,
  Geist_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

/** Display serif, weight 300 roman — headings only. */
const newsreader = localFont({
  src: [
    { path: "./fonts/Newsreader-Variable.ttf", style: "normal" },
    { path: "./fonts/Newsreader-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

/** Body copy. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/** UI / labels / nav / meta. */
const dmMono = localFont({
  src: [
    { path: "./fonts/DMMono-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/DMMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DMMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Logo mark — "GG" wordmark. */
const allison = Allison({
  variable: "--font-allison",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/** Editorial nameplate used in the landing hero. */
const benne = Benne({
  variable: "--font-benne",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Local Seratonin display face used in the landing hero. */
const seratonin = localFont({
  src: "./fonts/Seratonin-Regular.otf",
  variable: "--font-seratonin-local",
  display: "swap",
});

const editorial = localFont({
  src: [
    { path: "../../public/fonts/itc-garamond/ITCGaramondStd-Lt.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/itc-garamond/ITCGaramondStd-LtIta.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/itc-garamond/ITCGaramondStd-Bk.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-editorial-local",
  display: "swap",
});

const projectWordmark = localFont({
  src: "../../public/fonts/Pixelta.ttf",
  variable: "--font-project-local",
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

export const viewport: Viewport = {
  themeColor: "#080808",
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
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${dmMono.variable} ${geistMono.variable} ${allison.variable} ${benne.variable} ${seratonin.variable} ${editorial.variable} ${projectWordmark.variable}`}
    >
      <body>
        <script
          // Runs before paint so a stored "dark" choice never flashes light first.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}",
          }}
        />
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

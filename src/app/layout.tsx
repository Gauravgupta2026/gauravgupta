import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono, Allison } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

/** Display serif, weight 300 roman — headings only. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
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
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** Logo mark — "GG" wordmark. */
const allison = Allison({
  variable: "--font-allison",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} ${allison.variable}`}
    >
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

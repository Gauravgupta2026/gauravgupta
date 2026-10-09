import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PaperShell } from "@/components/paper/PaperShell";
import "./globals.css";
const serif = localFont({ src: "../../public/assets/fonts/Newsreader-VariableFont_opsz,wght.ttf", variable: "--font-paper-serif", display: "swap", weight: "200 800" });
const script = localFont({ src: "../../public/reference-dwija/JaneAusten.ttf", variable: "--font-paper-script", display: "swap" });
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const metadata: Metadata = {
 metadataBase: new URL(SITE_URL), title: "Gaurav Gupta — Design & code",
 description: "A small collection of products, experiments and notes by Gaurav Gupta, a designer and engineer in Bengaluru.",
 robots: { index: false, follow: false },
 openGraph: { title: "Gaurav Gupta — Design & code", description: "Products, experiments and notes. A little corner of the internet.", url: "/", siteName: "Gaurav Gupta", type: "website" },
 twitter: { card: "summary_large_image", title: "Gaurav Gupta — Design & code" },
};
export const viewport: Viewport = { themeColor: "#ffffff", viewportFit: "cover" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en" className={`${serif.variable} ${script.variable}`}><body><PostHogProvider><PaperShell>{children}</PaperShell></PostHogProvider></body></html>;
}

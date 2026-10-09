import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { paperProjects } from "@/content/paperPortfolio";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
 return [...["", "/playground", "/work", "/labs", "/notes", "/about", "/contact"].map(path => ({ url: SITE_URL + path, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8 })), ...articles.map(a => ({ url: SITE_URL + "/notes/" + a.slug, changeFrequency: "yearly" as const, priority: .6 })), ...paperProjects.map(p => ({ url: SITE_URL + "/projects/" + p.slug, changeFrequency: "monthly" as const, priority: .7 }))];
}

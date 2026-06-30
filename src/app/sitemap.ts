import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { projectDetails } from "@/content/projectDetails";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const noteRoutes = articles.map((a) => ({
    url: `${SITE_URL}/notes/${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const projectRoutes = Object.keys(projectDetails).map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...noteRoutes, ...projectRoutes];
}

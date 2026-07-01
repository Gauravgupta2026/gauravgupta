import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Shell } from "@/components/Shell";
import { ArticleBody } from "@/components/article/ArticleBody";
import { SourceIcon } from "@/components/ui/SourceIcon";
import { articles, getArticle } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Note not found" };
  return { title: `${article.title} — Gaurav Gupta`, description: article.dek };
}

const SOURCE_NAME: Record<string, string> = {
  substack: "Substack",
  medium: "Medium",
  site: "On-site",
};

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Nav />
      <Shell as="article" className="pt-[40px] md:pt-[60px]">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/#notes"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft-ink no-underline transition-colors duration-300 hover:text-blue"
          >
            &larr; Notes
          </Link>

          <div className="mt-[34px] flex items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
            <SourceIcon source={article.source} />
            <span>{SOURCE_NAME[article.source]}</span>
            <span className="opacity-50">&middot;</span>
            <span>{article.date}</span>
            <span className="opacity-50">&middot;</span>
            <span>{article.readingTime}</span>
          </div>

          <h1 className="m-0 mt-[20px] font-display text-[clamp(28px,6vw,48px)] font-normal italic leading-[1.1] tracking-[-0.01em] text-ink md:leading-[1.08]">
            {article.title}
          </h1>

          <p className="m-0 mt-[22px] font-display text-[18px] leading-[1.5] text-soft-ink md:text-[21px]">
            {article.dek}
          </p>

          <hr className="my-[40px] border-0 border-t border-ink/12" />

          <ArticleBody body={article.body} />

          <hr className="mt-[56px] border-0 border-t border-ink/12" />
          <div className="flex items-center justify-between py-[28px]">
            <Link
              href="/#notes"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft-ink no-underline transition-colors duration-300 hover:text-blue"
            >
              &larr; All notes
            </Link>
            <Link
              href="/#cta"
              className="font-mono text-[11px] text-blue no-underline"
            >
              Work with me &rarr;
            </Link>
          </div>
        </div>
      </Shell>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site/PageShell';
import { findProject, PROJECTS } from '@/content/projects';

interface Props { params: Promise<{ slug: string }> }

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: findProject((await params).slug)?.name };
}

export default async function Page({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  return <PageShell title={project.name} lead="This case study is being written." />;
}

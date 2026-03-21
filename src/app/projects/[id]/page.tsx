import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readData } from '@/lib/data';
import ProjectDetailClient from './ProjectDetailClient';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
  tags: string[];
}

export async function generateStaticParams() {
  const projects = readData<Project[]>('projects.json');
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const projects = readData<Project[]>('projects.json');
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: 'Project Not Found | NeoCodeHub' };
  }

  return {
    title: `${project.title} | NeoCodeHub`,
    description: project.description,
    openGraph: {
      title: `${project.title} | NeoCodeHub`,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projects = readData<Project[]>('projects.json');
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Get related projects (same category, excluding current)
  const related = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return <ProjectDetailClient project={project} relatedProjects={related} />;
}

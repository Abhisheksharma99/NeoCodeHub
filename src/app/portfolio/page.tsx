import { Metadata } from 'next';
import { readData } from '@/lib/data';
import ProjectsClient from '../projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Portfolio | NeoCodeHub',
  description:
    'Explore the projects NeoCodeHub has delivered — from full-stack web platforms to AI solutions and mobile applications.',
  openGraph: {
    title: 'Portfolio | NeoCodeHub',
    description:
      'Explore the projects NeoCodeHub has delivered — from full-stack web platforms to AI solutions and mobile applications.',
    type: 'website',
  },
};

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
  tags: string[];
}

export default function PortfolioPage() {
  const projects = readData<Project[]>('projects.json');

  return <ProjectsClient projects={projects} />;
}

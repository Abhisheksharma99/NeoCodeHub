import { Metadata } from 'next';
import { readData } from '@/lib/data';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Our Blog | NeoCodeHub',
  description:
    'Insights, tutorials, and industry trends from the NeoCodeHub team. Stay up to date with the latest in web development, AI, and software engineering.',
  openGraph: {
    title: 'Our Blog | NeoCodeHub',
    description:
      'Insights, tutorials, and industry trends from the NeoCodeHub team.',
    type: 'website',
  },
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  date: string;
  author: string;
  image: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function BlogPage() {
  const posts = readData<BlogPost[]>('blog-posts.json');
  const published = posts
    .filter((p) => p.status === 'published')
    .map((p) => ({ ...p, slug: slugify(p.title) }));

  return <BlogClient posts={published} />;
}

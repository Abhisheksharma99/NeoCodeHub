import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readData } from '@/lib/data';
import BlogPostClient from './BlogPostClient';

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

function getAllPublished() {
  const posts = readData<BlogPost[]>('blog-posts.json');
  return posts
    .filter((p) => p.status === 'published')
    .map((p) => ({ ...p, slug: slugify(p.title) }));
}

export async function generateStaticParams() {
  const posts = getAllPublished();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPublished();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post Not Found | NeoCodeHub' };
  }

  return {
    title: `${post.title} | NeoCodeHub Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | NeoCodeHub Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getAllPublished();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts: same category, excluding current, up to 2
  const related = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return <BlogPostClient post={post} relatedPosts={related} />;
}

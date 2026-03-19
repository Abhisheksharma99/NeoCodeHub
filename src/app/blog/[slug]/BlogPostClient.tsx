'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion';
import type { MouseEvent as ReactMouseEvent } from 'react';

/* ---------- types ---------- */
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
  slug: string;
}

/* ---------- constants ---------- */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const categoryGradients: Record<string, string> = {
  Development: 'from-blue-500/20 via-cyan-500/10 to-neutral-200/5',
  'AI & ML': 'from-purple-500/20 via-pink-500/10 to-neutral-200/5',
  Architecture: 'from-amber-500/20 via-orange-500/10 to-neutral-200/5',
  default: 'from-neutral-300/20 via-neutral-200/10 to-neutral-100/5',
};

function getGradient(category: string) {
  return categoryGradients[category] || categoryGradients.default;
}

/* ---------- sub-components ---------- */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #171717 0%, #525252 40%, #a3a3a3 70%, #171717 100%)',
      }}
    />
  );
}

function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouse(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(-((y - centerY) / centerY) * 6);
    rotateY.set(((x - centerX) / centerX) * 6);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE_OUT,
      }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ---------- main component ---------- */

export default function BlogPostClient({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const gradient = getGradient(post.category);

  return (
    <div className="relative min-h-screen">
      <ScrollProgressBar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
        <div className="absolute top-16 -right-40 w-[500px] h-[500px] bg-neutral-200/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-neutral-100/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <span className="section-badge">
              <span className="text-neutral-600">{post.category}</span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900 leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT }}
          >
            {/* Author avatar */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                {post.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-heading font-semibold text-neutral-900">{post.author}</p>
                <p className="text-xs text-neutral-500">{formatDate(post.date)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <section className="container mx-auto px-6 lg:px-8 pb-12 max-w-4xl">
        <ScrollReveal>
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.12) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-neutral-300/30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-6 lg:px-8 pb-16 max-w-4xl">
        <ScrollReveal>
          <article className="prose prose-neutral max-w-none">
            {/* Use content if available, otherwise use excerpt */}
            {post.content ? (
              <div
                className="text-neutral-700 text-base md:text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="space-y-6">
                <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="glass-card p-8 text-center">
                  <p className="text-neutral-500 text-sm font-heading">
                    Full article coming soon. Stay tuned for the complete deep dive
                    into this topic.
                  </p>
                </div>
              </div>
            )}
          </article>
        </ScrollReveal>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-6 lg:px-8 py-16 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 tracking-tight mb-8">
              Related Posts
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rp, i) => {
              const rpGradient = getGradient(rp.category);
              return (
                <ScrollReveal key={rp.id} delay={i * 0.1}>
                  <Link href={`/blog/${rp.slug}`} className="block group">
                    <TiltCard>
                      <div className="glass-card overflow-hidden">
                        <div className="relative w-full h-40 overflow-hidden">
                          {rp.image ? (
                            <img
                              src={rp.image}
                              alt={rp.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${rpGradient} flex items-center justify-center transition-all duration-500 group-hover:scale-105`}
                            >
                              <svg
                                className="w-10 h-10 text-neutral-300/40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-heading font-medium bg-white/90 backdrop-blur-sm text-neutral-700 border border-neutral-200/50">
                              {rp.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-xs text-neutral-500 mb-1">{formatDate(rp.date)}</p>
                          <h3 className="text-base font-heading font-bold text-neutral-900 tracking-tight mb-1 group-hover:text-neutral-700 transition-colors">
                            {rp.title}
                          </h3>
                          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                            {rp.excerpt}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

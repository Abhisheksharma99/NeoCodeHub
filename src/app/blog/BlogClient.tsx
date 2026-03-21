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

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="relative min-h-screen">
      <ScrollProgressBar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
        <div className="absolute top-16 -right-40 w-[500px] h-[500px] bg-neutral-200/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-neutral-100/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <span className="section-badge">
              <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
              <span className="text-neutral-600">Insights</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-neutral-900 text-center leading-[1.05]"
            style={{ perspective: 600 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          >
            Our{' '}
            <span className="text-shimmer">Blog</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-700 mt-6 mb-12 max-w-2xl mx-auto text-center leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          >
            Insights, tutorials, and industry perspectives from our team.
            Stay ahead with the latest trends in technology and development.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const gradient = getGradient(post.category);

            return (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <TiltCard className="h-full">
                    <div className="glass-card overflow-hidden h-full flex flex-col group cursor-pointer">
                      {/* Image / Gradient Placeholder */}
                      <div className="relative w-full h-48 overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-105`}
                          >
                            <svg
                              className="w-12 h-12 text-neutral-300/40"
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
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-heading font-medium tracking-wide bg-white/90 backdrop-blur-sm text-neutral-700 border border-neutral-200/50">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow" style={{ transform: 'translateZ(20px)' }}>
                        {/* Date & Author */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs text-neutral-500">{formatDate(post.date)}</span>
                          <span className="w-1 h-1 rounded-full bg-neutral-300" />
                          <span className="text-xs text-neutral-500">{post.author}</span>
                        </div>

                        <h3 className="text-lg font-heading font-bold mb-2 text-neutral-900 tracking-tight group-hover:text-neutral-700 transition-colors duration-300 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                          {post.excerpt}
                        </p>

                        {/* Read more */}
                        <div className="flex items-center gap-2 text-sm font-heading font-semibold text-neutral-900 group-hover:gap-3 transition-all duration-300">
                          <span>Read More</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {posts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-neutral-500 text-lg font-heading">
              No blog posts published yet. Check back soon!
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

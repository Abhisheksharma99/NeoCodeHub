'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import type { MouseEvent as ReactMouseEvent } from 'react';

/* ---------- types ---------- */
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
  tags: string[];
}

/* ---------- constants ---------- */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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

/* ---------- gradient helpers ---------- */
const categoryGradients: Record<string, string> = {
  'Web Development': 'from-blue-500/20 via-cyan-500/10 to-neutral-200/5',
  'AI & ML': 'from-purple-500/20 via-pink-500/10 to-neutral-200/5',
  'Mobile Development': 'from-green-500/20 via-emerald-500/10 to-neutral-200/5',
  default: 'from-neutral-300/20 via-neutral-200/10 to-neutral-100/5',
};

function getGradient(category: string) {
  return categoryGradients[category] || categoryGradients.default;
}

const statusColors: Record<string, { dot: string; text: string }> = {
  completed: { dot: 'bg-green-500', text: 'text-green-700' },
  'in-progress': { dot: 'bg-amber-500', text: 'text-amber-700' },
  default: { dot: 'bg-neutral-400', text: 'text-neutral-600' },
};

function getStatus(status: string) {
  return statusColors[status] || statusColors.default;
}

/* ---------- main client component ---------- */
export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

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
              <span className="text-neutral-600">Portfolio</span>
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
            <span className="text-shimmer">Work</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-700 mt-6 mb-12 max-w-2xl mx-auto text-center leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          >
            Explore the projects we have brought to life for our clients. From concept
            to deployment, every project represents our dedication to quality and innovation.
          </motion.p>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-heading font-medium tracking-tight transition-all duration-300 cursor-pointer ${
                  active === cat
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white/80 text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6 lg:px-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {filtered.map((project, index) => {
              const gradient = getGradient(project.category);
              const status = getStatus(project.status);

              return (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <Link href={`/projects/${project.id}`} className="block h-full">
                    <TiltCard className="h-full">
                      <div className="glass-card overflow-hidden h-full flex flex-col group cursor-pointer">
                        {/* Image / Gradient Placeholder */}
                        <div className="relative w-full h-52 overflow-hidden">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-105`}
                            >
                              <span className="text-4xl font-heading font-bold text-neutral-300/40">
                                {project.title.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Category badge overlay */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-heading font-medium tracking-wide bg-white/90 backdrop-blur-sm text-neutral-700 border border-neutral-200/50">
                              {project.category}
                            </span>
                          </div>
                          {/* Status indicator */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-heading font-medium bg-white/90 backdrop-blur-sm border border-neutral-200/50">
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                              <span className={`${status.text} capitalize`}>
                                {project.status === 'in-progress' ? 'In Progress' : project.status}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow" style={{ transform: 'translateZ(20px)' }}>
                          <h3 className="text-lg font-heading font-bold mb-2 text-neutral-900 tracking-tight group-hover:text-neutral-700 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* View Project link */}
                          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-neutral-900 group-hover:gap-3 transition-all duration-300">
                            <span>View Project</span>
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
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-neutral-500 text-lg font-heading">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 lg:px-8 pb-20">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-10 md:p-16 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-neutral-700 rounded-full blur-[100px] opacity-30" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neutral-600 rounded-full blur-[100px] opacity-20" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                We would love to hear about your next big idea. Let us help you turn it
                into reality with our expertise.
              </p>
              <Link
                href="/#Contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-heading font-semibold text-sm tracking-tight hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.03]"
              >
                Let&apos;s Talk
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

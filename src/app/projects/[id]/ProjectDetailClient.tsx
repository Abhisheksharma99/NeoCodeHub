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

const categoryGradients: Record<string, string> = {
  'Web Development': 'from-blue-500/20 via-cyan-500/10 to-neutral-200/5',
  'AI & ML': 'from-purple-500/20 via-pink-500/10 to-neutral-200/5',
  'Mobile Development': 'from-green-500/20 via-emerald-500/10 to-neutral-200/5',
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

/* ---------- main component ---------- */

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  const gradient = getGradient(project.category);
  const isCompleted = project.status === 'completed';

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
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Projects
            </Link>
          </motion.div>

          {/* Category & Status */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <span className="section-badge">
              <span className="text-neutral-600">{project.category}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-white/80 backdrop-blur-sm border border-neutral-200/50">
              <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-amber-500'}`} />
              <span className={isCompleted ? 'text-green-700' : 'text-amber-700'}>
                {isCompleted ? 'Completed' : 'In Progress'}
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tight text-neutral-900 leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-neutral-700 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Large Image / Gradient Area */}
      <section className="container mx-auto px-6 lg:px-8 pb-16">
        <ScrollReveal>
          <div className="relative w-full h-72 md:h-96 lg:h-[28rem] rounded-3xl overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
              >
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.12) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl md:text-9xl font-heading font-bold text-neutral-300/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Project Details */}
      <section className="container mx-auto px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* About */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-900 tracking-tight mb-4">
                  About This Project
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {project.description}. This project showcases our expertise in
                  delivering high-quality {project.category.toLowerCase()} solutions
                  that meet real business needs. Our team worked closely with the client
                  to ensure every aspect of the product met their vision and requirements.
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-900 tracking-tight mb-4">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/50 font-heading"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="container mx-auto px-6 lg:px-8 pb-20">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 tracking-tight mb-8">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProjects.map((rp, i) => {
                  const rpGradient = getGradient(rp.category);
                  return (
                    <ScrollReveal key={rp.id} delay={i * 0.1}>
                      <Link href={`/projects/${rp.id}`} className="block group">
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
                                  <span className="text-3xl font-heading font-bold text-neutral-300/40">
                                    {rp.title.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-5">
                              <h3 className="text-base font-heading font-bold text-neutral-900 tracking-tight mb-1">
                                {rp.title}
                              </h3>
                              <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                                {rp.description}
                              </p>
                            </div>
                          </div>
                        </TiltCard>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-6 lg:px-8 pb-20">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-10 md:p-16 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-neutral-700 rounded-full blur-[100px] opacity-30" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neutral-600 rounded-full blur-[100px] opacity-20" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white mb-4">
                Want Something Similar?
              </h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                We can build a tailored solution for your business. Let us discuss
                your requirements and bring your vision to life.
              </p>
              <Link
                href="/#Contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-heading font-semibold text-sm tracking-tight hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.03]"
              >
                Get in Touch
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

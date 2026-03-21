'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute top-10 -right-32 w-[420px] h-[420px] bg-neutral-200/50 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-16 -left-32 w-[360px] h-[360px] bg-neutral-100/60 rounded-full blur-[100px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-300 font-medium"
          >
            <FaArrowLeft className="text-xs" />
            Back to Home
          </Link>
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div
            className="flex justify-center md:justify-start mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          >
            <span className="section-badge">
              <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
              <span className="text-neutral-600">{badge}</span>
            </span>
          </motion.div>
        )}

        {/* Large animated heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05] font-heading tracking-tight text-center md:text-left"
          style={{ perspective: 600 }}
        >
          {title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: easeOut }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-neutral-700 mt-6 max-w-2xl leading-relaxed text-center md:text-left"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

function AnimatedCounter({
  value,
  suffix,
  onComplete,
}: {
  value: number;
  suffix: string;
  onComplete?: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
        onComplete: () => onComplete?.(),
      });
      return controls.stop;
    }
  }, [isInView, value, onComplete]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showGlow, setShowGlow] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleCountComplete = useCallback(() => {
    setShowGlow(true);
    // Remove glow after animation
    const timer = setTimeout(() => setShowGlow(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="text-center relative p-6 rounded-2xl cursor-default"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 600,
        transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow pulse ring */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.2)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255, 255, 255, 0.2)',
              '0 0 0 12px rgba(255, 255, 255, 0)',
            ],
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      )}

      <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          onComplete={handleCountComplete}
        />
      </div>
      <p className="text-neutral-500 text-xs md:text-sm font-medium tracking-wider uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Background parallax for ambient glows
  const glowY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Card scale and opacity on scroll
  const cardScale = useTransform(scrollYProgress, [0.15, 0.45], [0.8, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  return (
    <section id="stats" className="relative bg-neutral-950 py-16 md:py-24 overflow-hidden" ref={sectionRef}>
      {/* Subtle ambient glows - scroll-linked parallax */}
      <motion.div style={{ y: glowY1 }}>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-neutral-800 rounded-full blur-[120px] opacity-40" />
      </motion.div>
      <motion.div style={{ y: glowY2 }}>
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-neutral-800 rounded-full blur-[100px] opacity-30" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.p
          className="text-center text-neutral-500 text-sm font-medium tracking-widest uppercase mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Impact in Numbers
        </motion.p>

        <motion.div style={{ scale: cardScale, opacity: cardOpacity }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" style={{ perspective: 800 }}>
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

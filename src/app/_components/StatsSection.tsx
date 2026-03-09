'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
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
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-neutral-950 py-16 md:py-24 overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-neutral-800 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-neutral-800 rounded-full blur-[100px] opacity-30" />

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-neutral-500 text-xs md:text-sm font-medium tracking-wider uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

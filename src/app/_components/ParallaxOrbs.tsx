'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const orbs = [
  {
    // Top-left
    className: 'top-[10%] left-[-5%] w-[500px] h-[500px]',
    bg: 'bg-neutral-300/[0.06]',
    speed: -0.3,
  },
  {
    // Top-right
    className: 'top-[25%] right-[-8%] w-[400px] h-[400px]',
    bg: 'bg-neutral-400/[0.04]',
    speed: -0.15,
  },
  {
    // Center
    className: 'top-[55%] left-[20%] w-[600px] h-[600px]',
    bg: 'bg-neutral-200/[0.05]',
    speed: -0.4,
  },
  {
    // Lower-right
    className: 'top-[75%] right-[10%] w-[350px] h-[350px]',
    bg: 'bg-neutral-300/[0.03]',
    speed: -0.2,
  },
];

export default function ParallaxOrbs() {
  const { scrollY } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} scrollY={scrollY} />
      ))}
    </div>
  );
}

function ParallaxOrb({
  orb,
  scrollY,
}: {
  orb: (typeof orbs)[number];
  scrollY: ReturnType<typeof useScroll>['scrollY'];
}) {
  const y = useTransform(scrollY, [0, 5000], [0, 5000 * orb.speed]);

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${orb.className} ${orb.bg}`}
      style={{ y }}
    />
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxDoodleProps {
  children: ReactNode;
  /** Negative = moves slower (background), positive = moves faster. Range: -0.5 to 0.5 */
  speed?: number;
  className?: string;
}

/**
 * Wraps any element and applies scroll-linked Y parallax.
 * Used to float doodle SVGs at different depths across sections.
 */
export default function ParallaxDoodle({
  children,
  speed = -0.2,
  className = "",
}: ParallaxDoodleProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -200, speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

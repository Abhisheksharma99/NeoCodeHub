"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollDividerProps {
  className?: string;
  direction?: "center" | "left" | "right";
}

/**
 * Animated section divider that draws itself on scroll.
 * Replaces static `section-divider` divs.
 */
export default function ScrollDivider({
  className = "",
  direction = "center",
}: ScrollDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const origin =
    direction === "left"
      ? "left"
      : direction === "right"
        ? "right"
        : "center";

  return (
    <div ref={ref} className={`w-full py-10 ${className}`}>
      <motion.div
        className="mx-auto h-px max-w-2xl"
        style={{
          scaleX,
          opacity,
          transformOrigin: origin,
          background:
            "linear-gradient(90deg, transparent, rgba(163,163,163,0.2), rgba(163,163,163,0.4), rgba(163,163,163,0.2), transparent)",
        }}
      />
    </div>
  );
}

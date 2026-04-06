"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const sectionIds = ["stats", "services", "tech", "process", "about", "testimonials", "contact"];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [marks, setMarks] = useState<number[]>([]);

  useEffect(() => {
    const calc = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      setMarks(
        sectionIds
          .map((id) => {
            const el = document.getElementById(id);
            return el ? el.offsetTop / docH : -1;
          })
          .filter((m) => m >= 0)
      );
    };
    const t = setTimeout(calc, 1000);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <motion.div
        className="h-[3px] origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, #171717 0%, #525252 40%, #a3a3a3 70%, #171717 100%)",
        }}
      />
      {marks.map((m, i) => (
        <div
          key={i}
          className="absolute top-0 w-px h-[6px] bg-neutral-500/30"
          style={{ left: `${m * 100}%` }}
        />
      ))}
    </div>
  );
}

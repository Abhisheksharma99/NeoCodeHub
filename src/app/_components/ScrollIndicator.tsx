"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "stats", label: "Stats" },
  { id: "services", label: "Services" },
  { id: "tech", label: "Tech" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Voices" },
  { id: "contact", label: "Contact" },
];

/**
 * Fixed right-side dot navigation showing current scroll position.
 * Hidden on mobile.
 */
export default function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative flex items-center gap-3 py-0.5"
          aria-label={`Go to ${section.label}`}
        >
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
                className="font-body text-[10px] tracking-wider uppercase text-neutral-400 whitespace-nowrap"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            className={`rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-2.5 h-2.5 bg-neutral-300 shadow-[0_0_6px_rgba(255,255,255,0.2)]"
                : "w-1.5 h-1.5 bg-neutral-600 group-hover:bg-neutral-400"
            }`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </button>
      ))}
      <div className="mt-2 font-body text-[9px] tracking-widest text-neutral-600">
        {String(activeIndex + 1).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

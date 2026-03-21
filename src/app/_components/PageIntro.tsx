'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;

const LOGO_LETTER = 'N';
const BRAND_NAME = 'eoCodeHub';

export default function PageIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shown = sessionStorage.getItem('nch-intro-shown');
    if (shown) {
      setShow(false);
      return;
    }
    setShow(true);
    sessionStorage.setItem('nch-intro-shown', '1');

    // Phase timeline
    const textTimer = setTimeout(() => setPhase('text'), 400);
    const exitTimer = setTimeout(() => setPhase('exit'), 1500);
    const hideTimer = setTimeout(() => setShow(false), 2100);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] bg-neutral-950 flex items-center justify-center"
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        exit={{ y: '-100%' }}
        transition={{
          duration: 0.6,
          ease: easeOut,
        }}
      >
        <div className="flex items-center select-none">
          {/* N logo letter */}
          <motion.span
            className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            {LOGO_LETTER}
          </motion.span>

          {/* Remaining letters revealed one by one */}
          {BRAND_NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold text-white"
              initial={{ opacity: 0, x: -8 }}
              animate={
                phase === 'text' || phase === 'exit'
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -8 }
              }
              transition={{
                duration: 0.3,
                delay: i * 0.04,
                ease: easeOut,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtle tagline */}
        <motion.p
          className="absolute bottom-12 text-neutral-500 text-xs sm:text-sm tracking-widest uppercase font-body"
          initial={{ opacity: 0 }}
          animate={
            phase === 'text' || phase === 'exit'
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Transforming Ideas into Digital Reality
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

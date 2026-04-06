'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import { FaSearch, FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';
import DiscussSvg from "@/app/assets/Discuss.svg";
import ParallaxDoodle from "./ParallaxDoodle";

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We understand your vision, goals, and requirements through in-depth consultation and research.',
    icon: <FaSearch />,
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our designers create intuitive, beautiful interfaces tailored to your brand identity.',
    icon: <FaPaintBrush />,
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Expert developers bring designs to life with clean, scalable, and performant code.',
    icon: <FaCode />,
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'Rigorous testing and smooth deployment ensure a flawless launch and ongoing support.',
    icon: <FaRocket />,
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Scroll-linked line draw
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  // Step card stagger - 4 separate sets of transforms (hooks cannot be called in loops)
  const stepOpacity0 = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const stepY0 = useTransform(scrollYProgress, [0.15, 0.28], [80, 0]);
  const stepOpacity1 = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);
  const stepY1 = useTransform(scrollYProgress, [0.25, 0.38], [80, 0]);
  const stepOpacity2 = useTransform(scrollYProgress, [0.35, 0.48], [0, 1]);
  const stepY2 = useTransform(scrollYProgress, [0.35, 0.48], [80, 0]);
  const stepOpacity3 = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);
  const stepY3 = useTransform(scrollYProgress, [0.45, 0.58], [80, 0]);

  const stepTransforms = [
    { opacity: stepOpacity0, y: stepY0 },
    { opacity: stepOpacity1, y: stepY1 },
    { opacity: stepOpacity2, y: stepY2 },
    { opacity: stepOpacity3, y: stepY3 },
  ];

  return (
    <section id="process" className="relative overflow-hidden" ref={sectionRef}>
      <ParallaxDoodle speed={-0.15} className="absolute top-16 left-[4%] hidden lg:block z-0 opacity-15 pointer-events-none">
        <Image src={DiscussSvg} alt="" width={160} height={160} />
      </ParallaxDoodle>

      <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="section-badge">Our Methodology</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            How We Work
          </h2>
          <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            A proven four-step process that transforms your ideas into
            exceptional digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative" style={{ perspective: 800 }}>
          {/* Connecting line (desktop) - scroll-linked */}
          <motion.div
            className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-px overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
              initial={{ scaleX: 0 }}
              style={{ scaleX: lineScaleX, transformOrigin: 'left center' }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-50"
              style={{
                backgroundSize: '8px 1px',
                backgroundImage: 'repeating-linear-gradient(90deg, #d4d4d4 0, #d4d4d4 4px, transparent 4px, transparent 8px)',
                transformOrigin: 'left center',
                scaleX: lineScaleX,
              }}
              initial={{ scaleX: 0 }}
            />
          </motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              style={{ opacity: stepTransforms[index].opacity, y: stepTransforms[index].y }}
            >
              <motion.div
                className="relative text-center"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Icon circle */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-2xl relative z-10 shadow-lg shadow-neutral-900/20"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {step.icon}
                </motion.div>

                {/* Step number */}
                <motion.span
                  className="inline-block text-[0.7rem] font-mono font-bold text-neutral-500 tracking-widest mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  STEP {step.number}
                </motion.span>

                <h3 className="text-xl font-heading font-bold text-neutral-900 tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-700 text-sm leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

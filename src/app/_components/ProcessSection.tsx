'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';

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
  return (
    <section className="relative">
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
          {/* Connecting line (desktop) - animated on scroll */}
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
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
              style={{ transformOrigin: 'left center' }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-50"
              style={{
                backgroundSize: '8px 1px',
                backgroundImage: 'repeating-linear-gradient(90deg, #d4d4d4 0, #d4d4d4 4px, transparent 4px, transparent 8px)',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
            />
          </motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative text-center"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: easeOut,
              }}
            >
              {/* Icon circle */}
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-2xl relative z-10 shadow-lg shadow-neutral-900/20"
                initial={{ scale: 0.7 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
              >
                {step.icon}
              </motion.div>

              {/* Step number with scale-up animation */}
              <motion.span
                className="inline-block text-[0.7rem] font-mono font-bold text-neutral-500 tracking-widest mb-2"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + index * 0.15,
                  type: 'spring',
                  stiffness: 250,
                  damping: 12,
                }}
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
          ))}
        </div>
      </div>
    </section>
  );
}

'use client'

import { useRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Card, ServiceData } from './Card';
import Innovation from '../assets/Visionary technology-bro.svg';
import Quality from '../assets/Quality.svg';
import Collaboration from '../assets/Partnership-bro.svg';
import { IoLeaf, IoRocket } from 'react-icons/io5';
import { FaCloud, FaMobileAlt, FaGlobe, FaCubes } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import ParallaxDoodle from './ParallaxDoodle';

const timeline = [
  {
    year: 2020,
    title: 'Company Founded',
    description:
      'NeoCodeHub was founded to transform innovative ideas into digital realities...',
    service: {
      title: 'Web Development',
      description:
        'We launched web development services, creating responsive websites...',
      icon: <FaGlobe />,
    },
  },
  {
    year: 2021,
    title: 'First Major Project',
    description:
      'We delivered an enterprise-level web application, setting a growth foundation...',
    service: {
      title: 'Mobile App Development',
      description:
        'We expanded into mobile app development for both iOS and Android...',
      icon: <FaMobileAlt />,
    },
  },
  {
    year: 2022,
    title: 'Expansion into AI',
    description:
      'We integrated AI and ML into our services, enhancing data-driven insights...',
    service: {
      title: 'AI & Machine Learning',
      description:
        'We started implementing predictive analytics and NLP-based AI solutions...',
      icon: <GiArtificialIntelligence />,
    },
  },
  {
    year: 2023,
    title: 'Cloud Integration',
    description:
      'We launched comprehensive cloud solutions to harness scalability and flexibility...',
    service: {
      title: 'Cloud Solutions',
      description:
        'Our experts provide scalable cloud infrastructure ensuring accessibility...',
      icon: <FaCloud />,
    },
  },
  {
    year: 2024,
    title: 'Future-Ready Innovation',
    description:
      'We focused on sustainability and future-ready technologies like blockchain, building eco-friendly digital infrastructure for forward-thinking clients.',
    service: {
      title: 'Sustainable Tech Solutions',
      description:
        'We integrate eco-friendly practices and energy-efficient digital infrastructures...',
      icon: <IoLeaf />,
    },
  },
  {
    year: 2025,
    title: 'AI-First Product Studio',
    description:
      'We evolved into a full-spectrum product studio, shipping AI-powered SaaS platforms, intelligent automation pipelines, and LLM-integrated applications for startups and enterprises.',
    service: {
      title: 'AI Product Development',
      description:
        'End-to-end AI product builds — from model selection and fine-tuning to production-grade APIs and user-facing interfaces powered by large language models.',
      icon: <FaCubes />,
    },
  },
  {
    year: 2026,
    title: 'Scaling Global Impact',
    description:
      'Expanding our reach with a distributed team across time zones, delivering high-velocity engineering for clients worldwide — from seed-stage startups to Fortune 500 digital transformation initiatives.',
    service: {
      title: 'End-to-End Digital Ventures',
      description:
        'Full lifecycle partnerships — strategy, design, engineering, DevOps, and growth — turning ambitious ideas into market-ready products at startup speed.',
      icon: <IoRocket />,
    },
  },
];

const values: ServiceData[] = [
  {
    title: 'Innovation',
    imageUrl: Innovation,
    description:
      'Innovation is at the heart of our mission, driving us to explore new frontiers...',
  },
  {
    title: 'Quality',
    imageUrl: Quality,
    description:
      'Quality ensures we exceed expectations through rigorous standards...',
  },
  {
    title: 'Collaboration',
    imageUrl: Collaboration,
    description:
      'Collaboration fosters teamwork and open communication, essential for success...',
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function AboutUs() {
  const [selectedYear, setSelectedYear] = useState(timeline[timeline.length - 1]);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Scroll-linked value cards entrance
  const valuesOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const valuesY = useTransform(scrollYProgress, [0.45, 0.6], [80, 0]);

  const handleYearSelect = useCallback((yearIndex: number) => {
    setSelectedYear(timeline[yearIndex]);
  }, []);

  const yearButtons = useMemo(
    () =>
      timeline.map((item, index) => (
        <motion.button
          key={item.year}
          aria-pressed={selectedYear.year === item.year}
          className={`relative px-4 md:px-6 py-2.5 rounded-full text-sm font-heading font-semibold tracking-tight transition-all duration-300 ${
            selectedYear.year === item.year
              ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 shining-button'
              : 'bg-white/70 backdrop-blur-sm border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:bg-white/90'
          }`}
          onClick={() => handleYearSelect(index)}
          animate={
            selectedYear.year === item.year
              ? { scale: 1.08 }
              : { scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.year}
        </motion.button>
      )),
    [selectedYear, handleYearSelect]
  );

  return (
    <section id="about" className="relative overflow-hidden" ref={sectionRef}>
      <ParallaxDoodle speed={-0.1} className="absolute bottom-24 right-[6%] hidden lg:block z-0 opacity-15 pointer-events-none">
        <Image src={Collaboration} alt="" width={140} height={140} />
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
          <span className="section-badge">Our Story</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            About Us
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mb-20"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
        >
          <p className="text-lg text-center text-neutral-700 leading-relaxed mb-4">
            At <strong className="text-neutral-900 font-semibold">NeoCodeHub</strong>, we transform ideas into digital solutions. Our experts create
            cutting-edge technology for businesses.
          </p>
          <p className="text-lg text-center text-neutral-700 leading-relaxed">
            Since our founding in 2020, we have stayed at the forefront of web, AI, and mobile development,
            empowering businesses to grow with technology.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          className="mb-24"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-center mb-10 text-neutral-900">
            Our Journey & Services
          </h3>

          {/* Year Buttons */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mb-10 overflow-x-auto py-2 px-4">
            {yearButtons}
          </div>

          {/* Timeline Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear.year}
              initial={{ opacity: 0, x: -30, rotateY: 5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 30, rotateY: -5 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="glass-card p-8 md:p-10 max-w-3xl mx-auto"
              style={{ transformStyle: 'preserve-3d', perspective: 800 }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {selectedYear.year}
                  </span>
                  <h4 className="text-xl font-heading font-bold text-neutral-900 tracking-tight">
                    {selectedYear.title}
                  </h4>
                </div>
                <p className="text-neutral-700 leading-relaxed">{selectedYear.description}</p>
              </div>
              <div className="border-t border-neutral-100 pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-lg">
                    {selectedYear.service.icon}
                  </span>
                  <h5 className="text-lg font-heading font-bold text-neutral-900 tracking-tight">
                    {selectedYear.service.title}
                  </h5>
                </div>
                <p className="text-neutral-700 leading-relaxed">{selectedYear.service.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Values Section */}
        <div className="text-center">
          <motion.div
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="section-badge">What We Stand For</span>
            <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-neutral-900 mb-12">
              Our Values
            </h3>
          </motion.div>
          <motion.div style={{ opacity: valuesOpacity, y: valuesY }}>
            <div className="flex flex-wrap -mx-4" style={{ perspective: 800 }}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 flex"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="p-4 flex w-full" style={{ transform: 'translateZ(20px)' }}>
                    <Card {...value} noOuterWrapper />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

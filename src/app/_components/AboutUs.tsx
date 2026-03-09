'use client'

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, ServiceData } from './Card';
import Innovation from '../assets/Visionary technology-bro.svg';
import Quality from '../assets/Quality.svg';
import Collaboration from '../assets/Partnership-bro.svg';
import { IoLeaf } from 'react-icons/io5';
import { FaCloud, FaMobileAlt, FaGlobe } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';

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
      'We focus on sustainability and future-ready technologies like blockchain...',
    service: {
      title: 'Sustainable Tech Solutions',
      description:
        'We integrate eco-friendly practices and energy-efficient digital infrastructures...',
      icon: <IoLeaf />,
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

export default function AboutUs() {
  const [selectedYear, setSelectedYear] = useState(timeline[timeline.length - 1]);

  const handleYearSelect = useCallback((yearIndex: number) => {
    setSelectedYear(timeline[yearIndex]);
  }, []);

  const yearButtons = useMemo(
    () =>
      timeline.map((item, index) => (
        <button
          key={item.year}
          aria-pressed={selectedYear.year === item.year}
          className={`relative px-4 md:px-6 py-2.5 rounded-full text-sm font-heading font-semibold tracking-tight transition-all duration-300 ${
            selectedYear.year === item.year
              ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 shining-button'
              : 'bg-white/70 backdrop-blur-sm border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 hover:bg-white/90'
          }`}
          onClick={() => handleYearSelect(index)}
        >
          {item.year}
        </button>
      )),
    [selectedYear, handleYearSelect]
  );

  return (
    <section id="About" className="relative">
      <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Our Story</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            About Us
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <p className="text-lg text-center text-neutral-500 leading-relaxed mb-4">
            At <strong className="text-neutral-900 font-semibold">NeoCodeHub</strong>, we transform ideas into digital solutions. Our experts create
            cutting-edge technology for businesses.
          </p>
          <p className="text-lg text-center text-neutral-500 leading-relaxed">
            Since our founding in 2020, we have stayed at the forefront of web, AI, and mobile development,
            empowering businesses to grow with technology.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="mb-24">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 md:p-10 max-w-3xl mx-auto"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {selectedYear.year}
                  </span>
                  <h4 className="text-xl font-heading font-bold text-neutral-900 tracking-tight">
                    {selectedYear.title}
                  </h4>
                </div>
                <p className="text-neutral-500 leading-relaxed">{selectedYear.description}</p>
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
                <p className="text-neutral-500 leading-relaxed">{selectedYear.service.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Values Section */}
        <div className="text-center">
          <span className="section-badge">What We Stand For</span>
          <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-neutral-900 mb-12">
            Our Values
          </h3>
          <div className="flex flex-wrap -mx-4">
            {values.map((value, index) => (
              <Card key={index} {...value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

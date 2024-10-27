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

  // UseCallback ensures button click handler is stable between renders
  const handleYearSelect = useCallback((yearIndex: number) => {
    setSelectedYear(timeline[yearIndex]);
  }, []);

  const yearButtons = useMemo(
    () =>
      timeline.map((item, index) => (
        <button
          key={item.year}
          aria-pressed={selectedYear.year === item.year}
          className={`px-2 md:px-4 py-2 rounded-full transition-colors duration-300 ${
            selectedYear.year === item.year
              ? 'bg-black text-white shining-button'
              : 'bg-white-200 border border-black-500 text-black hover:bg-white-300 hover:border-black'
          }`}
          onClick={() => handleYearSelect(index)}
        >
          {item.year}
        </button>
      )),
    [selectedYear, handleYearSelect]
  );

  return (
    <div id="About" className="ms-4 me-4 text-black">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>
        </header>

        <section className="max-w-3xl mx-auto mb-16">
          <article>
            <p className="text-lg text-center mb-4">
              At <strong>NeoCodeHub</strong>, we transform ideas into digital solutions. Our experts create
              cutting-edge technology for businesses.
            </p>
            <p className="text-lg text-center mb-4">
              Since our founding in 2020, we have stayed at the forefront of web, AI, and mobile development,
              empowering businesses to grow with technology.
            </p>
          </article>
        </section>

        <section aria-labelledby="journey-title" className="mb-16">
          <h2 id="journey-title" className="text-3xl font-bold text-center mb-12">
            Our Journey & Services
          </h2>
          <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-8 overflow-x-auto py-4">
            {yearButtons}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              key={selectedYear.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white-100 p-8 rounded-lg shadow-2xl"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">{selectedYear.title}</h3>
                <p className="text-lg">{selectedYear.description}</p>
              </div>
              <div className="border-t pt-6">
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2 text-2xl">{selectedYear.service.icon}</span>
                  {selectedYear.service.title}
                </h4>
                <p className="text-lg">{selectedYear.service.description}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </section>

        <section className="mt-16 text-center" aria-labelledby="values-title">
          <h2 id="values-title" className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="flex flex-wrap -mx-4">
            {values.map((value, index) => (
              <Card key={index} {...value} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

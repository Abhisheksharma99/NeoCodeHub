'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoLeaf } from 'react-icons/io5';
import { FaCloud, FaMobileAlt, FaGlobe } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import PageHeader from '../_components/PageHeader';
import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import MagneticButton from '../_components/MagneticButton';
import { Button } from '../_components/Button';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ---- Timeline Data ---- */
const timeline = [
  {
    year: 2020,
    title: 'Company Founded',
    description:
      'NeoCodeHub was founded with a bold vision: to bridge the gap between innovative ideas and digital reality. Starting as a small team of passionate developers, we set out to build technology that empowers businesses to thrive in the digital age.',
    service: {
      title: 'Web Development',
      description:
        'We launched our web development services, crafting responsive, high-performance websites that combine stunning design with seamless functionality.',
      icon: <FaGlobe />,
    },
  },
  {
    year: 2021,
    title: 'First Major Project',
    description:
      'We delivered our first enterprise-level web application, establishing a reputation for reliability and technical excellence. This milestone set the foundation for rapid growth and attracted clients from diverse industries.',
    service: {
      title: 'Mobile App Development',
      description:
        'Expanding our capabilities, we ventured into mobile app development for both iOS and Android platforms, delivering native-quality experiences across devices.',
      icon: <FaMobileAlt />,
    },
  },
  {
    year: 2022,
    title: 'Expansion into AI',
    description:
      'Recognizing the transformative power of artificial intelligence, we integrated AI and machine learning into our service offerings. This allowed us to provide data-driven insights and intelligent automation solutions.',
    service: {
      title: 'AI & Machine Learning',
      description:
        'We began implementing predictive analytics, natural language processing, and computer vision solutions, helping businesses unlock the potential of their data.',
      icon: <GiArtificialIntelligence />,
    },
  },
  {
    year: 2023,
    title: 'Cloud Integration',
    description:
      'We launched comprehensive cloud solutions to help businesses harness the scalability and flexibility of modern cloud infrastructure. Our DevOps practices ensured seamless deployment and operations.',
    service: {
      title: 'Cloud Solutions',
      description:
        'Our cloud experts provide scalable infrastructure solutions on AWS, Azure, and GCP, ensuring maximum uptime, security, and accessibility for your applications.',
      icon: <FaCloud />,
    },
  },
  {
    year: 2024,
    title: 'Future-Ready Innovation',
    description:
      'Continuing our commitment to innovation, we focused on sustainability and future-ready technologies. From blockchain integration to green computing practices, we are shaping the future of digital experiences.',
    service: {
      title: 'Sustainable Tech Solutions',
      description:
        'We integrate eco-friendly practices and energy-efficient digital infrastructures, ensuring our solutions are not just cutting-edge but also responsible.',
      icon: <IoLeaf />,
    },
  },
];

/* ---- Values Data (expanded) ---- */
const values = [
  {
    title: 'Innovation',
    description:
      'Innovation drives everything we do. We constantly explore emerging technologies, experiment with new approaches, and challenge conventional thinking to deliver solutions that keep our clients ahead of the curve. From AI-powered automation to next-generation web frameworks, we embrace the future.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: 'Quality',
    description:
      'Quality is non-negotiable at NeoCodeHub. Every line of code undergoes rigorous review, every design is pixel-perfect, and every deployment is thoroughly tested. We maintain the highest standards because we know your business depends on software that works flawlessly, every single time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description:
      'Great products are built through great partnerships. We treat every client relationship as a collaboration, fostering open communication, transparency, and shared ownership. Your goals become our goals, and together we create solutions that exceed expectations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

/* ---- Stats ---- */
const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years of Experience' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Dedicated Support' },
];

export default function AboutPage() {
  const [selectedYear, setSelectedYear] = useState(timeline[timeline.length - 1]);

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
          animate={selectedYear.year === item.year ? { scale: 1.08 } : { scale: 1 }}
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
    <main className="relative">
      <Navbar />
      <PageHeader
        title="About NeoCodeHub"
        subtitle="We are a team of passionate developers, designers, and strategists dedicated to transforming ideas into powerful digital solutions."
        badge="Our Story"
      />

      {/* Mission / Vision Section */}
      <section className="relative">
        <div className="container mx-auto px-6 lg:px-8 pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="glass-card p-8 md:p-10"
              style={{ perspective: 800 }}
              initial={{ opacity: 0, y: 50, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: easeOut }}
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-lg mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-neutral-900 tracking-tight mb-3">
                Our Vision
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                To be the most trusted technology partner for businesses worldwide, empowering them to thrive in the digital age through innovative, scalable, and sustainable solutions that make a lasting impact.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 md:p-10"
              style={{ perspective: 800 }}
              initial={{ opacity: 0, y: 50, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-lg mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-neutral-900 tracking-tight mb-3">
                Our Mission
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                To deliver exceptional digital products by combining cutting-edge technology with human-centered design. We are committed to understanding each client&apos;s unique challenges and crafting tailored solutions that drive measurable business growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Company Timeline */}
      <section className="relative">
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            className="text-center mb-16"
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="section-badge">Our Journey</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
              The NeoCodeHub Story
            </h2>
            <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              From a small startup to a trusted technology partner, explore the milestones that have shaped who we are today.
            </p>
          </motion.div>

          {/* Year Buttons */}
          <motion.div
            className="flex justify-center items-center gap-2 md:gap-3 mb-10 overflow-x-auto py-2 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {yearButtons}
          </motion.div>

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
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Stats Section */}
      <section className="relative bg-neutral-950 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-neutral-800 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-neutral-800 rounded-full blur-[100px] opacity-30" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase mb-4">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-white">
              Numbers That Speak
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: easeOut }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
                  {stat.value}
                </div>
                <p className="text-neutral-500 text-xs md:text-sm font-medium tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section (expanded) */}
      <section className="relative">
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            className="text-center mb-16"
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="section-badge">What We Stand For</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
              Our Core Values
            </h2>
            <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              These principles guide every decision we make and every product we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" style={{ perspective: 800 }}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-card p-8"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 50, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: easeOut }}
              >
                <div className="w-14 h-14 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 tracking-tight mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* CTA Section */}
      <section className="relative">
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="section-badge">Let&apos;s Connect</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900 mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-neutral-700 text-lg leading-relaxed mb-10">
              Whether you have a project in mind or just want to explore the possibilities, we would love to hear from you. Let&apos;s build something amazing together.
            </p>
            <MagneticButton strength={0.2}>
              <Link href="/contact">
                <Button text="Get In Touch" btnClass="px-8 py-4 text-base" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

'use client';

import { motion } from 'framer-motion';
import MobileImage from "../assets/Mobile App.png";
import AiImage from "../assets/AI.png";
import WebImage from "../assets/Web Design.png";
import Expertise from "../assets/Expertise.svg";
import Innovation from "../assets/Innovation.svg";
import Customer from "../assets/Customer relationship management-bro.svg";
import { Card, ServiceData } from "./Card";

const services: ServiceData[] = [
  {
    title: "Web Development",
    imageUrl: WebImage,
    description:
      "Building modern and responsive websites with cutting-edge technology to enhance your online presence.",
  },
  {
    title: "AI & Machine Learning",
    imageUrl: AiImage,
    description:
      "Leveraging artificial intelligence and machine learning to create innovative solutions that transform data into actionable insights.",
  },
  {
    title: "Mobile App Development",
    imageUrl: MobileImage,
    description:
      "Designing user-friendly mobile applications that provide seamless experiences on iOS and Android platforms.",
  },
];

const chooseUs: ServiceData[] = [
  {
    title: "Expertise",
    imageUrl: Expertise,
    description:
      "Our team is composed of highly skilled professionals with extensive industry experience, bringing together a wealth of knowledge accumulated over the years.",
  },
  {
    title: "Innovation",
    imageUrl: Innovation,
    description:
      "We are committed to staying at the forefront of technology, constantly exploring new trends, tools, and methodologies to deliver innovative, future-ready solutions.",
  },
  {
    title: "Customer-Centric",
    imageUrl: Customer,
    description:
      "Your success is at the heart of everything we do. We believe that every client is unique, and we are dedicated to providing personalized solutions tailored to meet your specific needs and goals.",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  return (
    <section id="Services" className="relative">
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
          <span className="section-badge">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            Our Services
          </h2>
          <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            At NeoCodeHub, we offer a wide range of cutting-edge services to
            meet your digital needs. Our expert team is dedicated to delivering
            high-quality solutions tailored to your business.
          </p>
        </motion.div>

        <div className="flex flex-wrap -mx-4" style={{ perspective: 800 }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 flex"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 50, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: easeOut,
              }}
            >
              <div className="p-4 flex w-full" style={{ transform: 'translateZ(20px)' }}>
                <Card {...service} noOuterWrapper />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-28 text-center">
          <motion.div
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="section-badge">Our Strengths</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-neutral-900 mb-12">
              Why Choose Us?
            </h2>
          </motion.div>
          <div className="flex flex-wrap -mx-4" style={{ perspective: 800 }}>
            {chooseUs.map((service, index) => (
              <motion.div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 flex"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 50, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: easeOut,
                }}
              >
                <div className="p-4 flex w-full" style={{ transform: 'translateZ(20px)' }}>
                  <Card {...service} noOuterWrapper />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

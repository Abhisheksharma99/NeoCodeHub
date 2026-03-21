'use client'
import React, { useState } from "react";
import {
  FaReact, FaNodeJs, FaAngular, FaPython, FaPhp, FaSwift,
  FaLaravel, FaMagento, FaShopify, FaJava
} from "react-icons/fa";
import { TbBrandKotlin } from "react-icons/tb";
import {
  SiNextdotjs, SiDocker, SiFirebase, SiMongodb, SiTypescript,
  SiGraphql, SiRedux, SiTailwindcss, SiPostgresql, SiAmazon,
  SiJenkins, SiElasticsearch, SiSass
} from 'react-icons/si';
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const techs = [
  { icon: <FaReact />, name: "React", description: "A JavaScript library for building UIs." },
  { icon: <FaNodeJs />, name: "Node JS", description: "JavaScript runtime for server-side development." },
  { icon: <FaAngular />, name: "Angular", description: "A TypeScript-based front-end framework." },
  { icon: <FaPython />, name: "Python", description: "A versatile language for web and AI development." },
  { icon: <FaPhp />, name: "PHP", description: "A popular backend language for web development." },
  { icon: <FaSwift />, name: "Swift", description: "Apple's language for iOS app development." },
  { icon: <FaLaravel />, name: "Laravel", description: "A PHP framework for web applications." },
  { icon: <FaMagento />, name: "Magento", description: "E-commerce platform for online stores." },
  { icon: <FaShopify />, name: "Shopify", description: "Platform for building online stores." },
  { icon: <TbBrandKotlin />, name: "Kotlin", description: "A modern language for Android development." },
  { icon: <FaJava />, name: "Java", description: "A general-purpose programming language." },
  { icon: <SiNextdotjs />, name: "Next JS", description: "React framework for server-side rendering." },
  { icon: <SiDocker />, name: "Docker", description: "Containerization platform." },
  { icon: <SiMongodb />, name: "MongoDB", description: "NoSQL database for modern applications." },
  { icon: <SiTypescript />, name: "TypeScript", description: "A typed superset of JavaScript." },
  { icon: <SiGraphql />, name: "GraphQL", description: "A query language for APIs." },
  { icon: <SiRedux />, name: "Redux", description: "State management library for JavaScript apps." },
  { icon: <SiTailwindcss />, name: "Tailwind CSS", description: "Utility-first CSS framework." },
  { icon: <SiPostgresql />, name: "PostgreSQL", description: "Relational database system." },
  { icon: <SiFirebase />, name: "Firebase", description: "Backend-as-a-Service platform by Google." },
  { icon: <SiAmazon />, name: "AWS", description: "Amazon Web Services cloud platform." },
  { icon: <SiJenkins />, name: "Jenkins", description: "Automation server for CI/CD pipelines." },
  { icon: <SiElasticsearch />, name: "Elasticsearch", description: "Search engine for large datasets." },
  { icon: <SiSass />, name: "SASS", description: "CSS preprocessor for easier styling." }
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const TechStack = () => {
  const [search, setSearch] = useState("");

  const filteredTechs = techs.filter(tech =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="Tech" className="relative">
      <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="section-badge">Technologies</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            Our Technology Stack
          </h2>
          <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed mb-8">
            We are adept at all possible tech stacks for both web and mobile,
            as well as a wide range of platforms, languages, and database systems.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search technology..."
              className="w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-sm font-body text-neutral-700 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4" style={{ perspective: 800 }}>
          {filteredTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.03, ease: easeOut }}
              whileHover={{ scale: 1.06, rotateY: 12 }}
            >
              <div
                className="flex flex-col items-center justify-center py-5 px-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-neutral-100/80 hover:border-neutral-200 hover:bg-white/90 hover:shadow-md transition-all duration-300 cursor-default"
                data-tooltip-id={`tooltip-${tech.name}`}
              >
                <div className="text-3xl text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200 mb-2">
                  {tech.icon}
                </div>
                <p className="text-xs font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors text-center leading-tight">
                  {tech.name}
                </p>
              </div>
              <ReactTooltip
                id={`tooltip-${tech.name}`}
                place="top"
                className="!rounded-lg !text-xs !px-3 !py-2 !bg-neutral-900 !text-white"
              >
                {tech.description}
              </ReactTooltip>
            </motion.div>
          ))}
        </div>

        {filteredTechs.length === 0 && (
          <p className="text-center text-neutral-600 mt-12 text-sm">
            No technologies found matching &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </section>
  );
};

export default TechStack;

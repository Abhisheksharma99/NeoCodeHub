'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt, FaGlobe, FaMobileAlt, FaRobot } from "react-icons/fa";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    icon: <FaGlobe />,
    description:
      "Built a full-featured e-commerce platform with real-time inventory management, payment integration, and an admin dashboard. Resulted in 150% increase in online sales.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    metrics: { label: "Sales Increase", value: "150%" },
  },
  {
    title: "HealthTrack Mobile App",
    category: "Mobile Development",
    icon: <FaMobileAlt />,
    description:
      "Designed and developed a cross-platform health tracking app with wearable device integration, personalized insights, and telehealth features.",
    technologies: ["React Native", "Firebase", "Python", "TensorFlow"],
    metrics: { label: "User Engagement", value: "+200%" },
  },
  {
    title: "AI Customer Support Bot",
    category: "AI & Machine Learning",
    icon: <FaRobot />,
    description:
      "Implemented an intelligent customer support system using NLP that handles 60% of queries automatically, reducing response time by 80%.",
    technologies: ["Python", "TensorFlow", "AWS", "PostgreSQL"],
    metrics: { label: "Automation Rate", value: "60%" },
  },
  {
    title: "Enterprise CRM System",
    category: "Web Development",
    icon: <FaGlobe />,
    description:
      "Custom CRM solution for a mid-size enterprise with advanced analytics, workflow automation, and seamless third-party integrations.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    metrics: { label: "Efficiency Gain", value: "40%" },
  },
  {
    title: "Food Delivery App",
    category: "Mobile Development",
    icon: <FaMobileAlt />,
    description:
      "Full-stack food delivery application with real-time order tracking, route optimization, and integrated payment processing.",
    technologies: ["Kotlin", "Swift", "Firebase", "Google Maps"],
    metrics: { label: "Daily Orders", value: "5K+" },
  },
  {
    title: "Predictive Analytics Dashboard",
    category: "AI & Machine Learning",
    icon: <FaRobot />,
    description:
      "Data analytics platform with predictive modeling capabilities, helping businesses forecast trends and make data-driven decisions.",
    technologies: ["Python", "React", "Elasticsearch", "AWS"],
    metrics: { label: "Prediction Accuracy", value: "94%" },
  },
];

export default function Portfolio() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <FaArrowLeft className="text-xs" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Our Work</span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900 mb-4">
            Portfolio & Case Studies
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore how we have helped businesses transform their digital presence
            with innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Category & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-lg">
                  {project.icon}
                </div>
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-heading font-bold text-neutral-900 tracking-tight mb-3">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Metric */}
              <div className="bg-neutral-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-neutral-400 mb-0.5">{project.metrics.label}</p>
                <p className="text-2xl font-heading font-bold text-neutral-900 tracking-tight">
                  {project.metrics.value}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              <button className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-medium mt-auto">
                View Case Study <FaExternalLinkAlt className="text-[10px]" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaClock } from "react-icons/fa";

const posts = [
  {
    title: "The Future of Web Development: Trends to Watch in 2026",
    excerpt:
      "From AI-powered development tools to edge computing, explore the technologies shaping the future of web development and how businesses can stay ahead.",
    category: "Web Development",
    readTime: "5 min read",
    date: "March 15, 2026",
  },
  {
    title: "Why Your Business Needs a Mobile App in 2026",
    excerpt:
      "Mobile apps are no longer optional. Learn how a well-designed mobile app can drive customer engagement, increase revenue, and give you a competitive edge.",
    category: "Mobile Development",
    readTime: "4 min read",
    date: "March 10, 2026",
  },
  {
    title: "How AI is Transforming Small Business Operations",
    excerpt:
      "Artificial intelligence is not just for big tech. Discover practical ways small businesses are leveraging AI to automate workflows and improve decision-making.",
    category: "AI & Machine Learning",
    readTime: "6 min read",
    date: "March 5, 2026",
  },
  {
    title: "A Complete Guide to Choosing the Right Tech Stack",
    excerpt:
      "Selecting the right technology stack is critical for your project's success. We break down the key factors to consider and compare popular frameworks.",
    category: "Technology",
    readTime: "7 min read",
    date: "February 28, 2026",
  },
  {
    title: "The Importance of UI/UX Design in Digital Products",
    excerpt:
      "Great design is not just about aesthetics. Learn how user-centered design principles can dramatically improve user satisfaction and business outcomes.",
    category: "Design",
    readTime: "4 min read",
    date: "February 20, 2026",
  },
  {
    title: "Cloud Migration: A Step-by-Step Guide for Businesses",
    excerpt:
      "Planning to move to the cloud? This comprehensive guide covers everything from assessment and planning to execution and optimization of your cloud migration.",
    category: "Cloud",
    readTime: "8 min read",
    date: "February 15, 2026",
  },
];

export default function Blog() {
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
          <span className="section-badge">Blog</span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900 mb-4">
            Insights & Resources
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay informed with our latest articles on technology, development,
            and digital innovation.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <motion.article
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
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium mb-4 w-fit">
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-lg font-heading font-bold text-neutral-900 tracking-tight mb-3 leading-snug">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-[10px]" />
                    {post.readTime}
                  </span>
                </div>
                <button className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-medium">
                  Read <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

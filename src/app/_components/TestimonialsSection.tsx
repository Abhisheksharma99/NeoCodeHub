'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    quote:
      'NeoCodeHub transformed our outdated website into a modern, high-performing platform. Their attention to detail and technical expertise exceeded all our expectations.',
    name: 'Rajesh Kumar',
    role: 'CEO, TechVentures India',
    rating: 5,
  },
  {
    quote:
      'The mobile app they built for us has been a game-changer. User engagement increased by 200% within the first quarter of launch. Highly recommended!',
    name: 'Priya Sharma',
    role: 'Founder, ShopEase',
    rating: 5,
  },
  {
    quote:
      'Their AI integration solutions helped us automate 60% of our data processing. Professional team, delivered on time and within budget every single time.',
    name: 'Amit Patel',
    role: 'CTO, DataDrive Solutions',
    rating: 5,
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

function StackingCard({
  testimonial,
  index,
  total,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Once this card's top hits viewport top and continues scrolling,
  // it shrinks and fades (being covered by the next card)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4]);

  return (
    <div
      ref={cardRef}
      className="sticky top-[20vh]"
      style={{ zIndex: index + 1 }}
    >
      <motion.div style={{ scale, opacity }}>
        <div className="glass-card p-7 md:p-10 flex flex-col shadow-lg max-w-2xl mx-auto">
          {/* Quote icon */}
          <FaQuoteLeft className="text-neutral-200 text-2xl mb-4" />

          {/* Stars */}
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <FaStar key={i} className="text-amber-400 text-xs" />
            ))}
          </div>

          {/* Quote text */}
          <p className="text-neutral-700 text-base md:text-lg leading-relaxed mb-6 flex-1">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Author */}
          <div className="border-t border-neutral-100 pt-5 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-neutral-900 flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                {testimonial.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="font-heading font-bold text-neutral-900 text-sm tracking-tight">
                  {testimonial.name}
                </p>
                <p className="text-neutral-600 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Card number */}
          <div className="absolute top-7 right-7 md:top-10 md:right-10 font-mono text-[11px] tracking-widest text-neutral-300">
            {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-8 pt-20 md:pt-28">
        <motion.div
          className="text-center mb-8"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="section-badge">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            What Our Clients Say
          </h2>
          <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about working with us.
          </p>
        </motion.div>
      </div>

      {/* Stacking cards — each card is sticky, subsequent cards scroll over previous */}
      <div className="container mx-auto px-6 lg:px-8 pb-20 md:pb-28">
        {testimonials.map((testimonial, index) => (
          <StackingCard
            key={index}
            testimonial={testimonial}
            index={index}
            total={testimonials.length}
          />
        ))}
      </div>
    </section>
  );
}

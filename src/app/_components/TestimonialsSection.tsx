'use client';

import { motion } from 'framer-motion';
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

export default function TestimonialsSection() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            What Our Clients Say
          </h2>
          <p className="text-neutral-400 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass-card p-7 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Quote icon */}
              <FaQuoteLeft className="text-neutral-200 text-2xl mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-amber-400 text-xs" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-neutral-100 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-neutral-900 text-sm tracking-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-neutral-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

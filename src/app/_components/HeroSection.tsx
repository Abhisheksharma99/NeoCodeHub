'use client';

import Image from "next/image";
import Link from "next/link";
import HeroImage from "../assets/HeroImage.svg";
import { motion } from "framer-motion";
import ContactButton from "./ContactButton";

const easeOut = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  return (
    <main className="relative pt-24 md:pt-28 overflow-hidden">
      {/* Ambient gradient orbs for depth */}
      <div className="absolute top-16 -right-40 w-[500px] h-[500px] bg-neutral-200/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-neutral-100/60 rounded-full blur-[100px] pointer-events-none" />

      <div
        id="Home"
        className="container mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10"
      >
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {/* Status badge */}
          <motion.div
            className="section-badge mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-neutral-600">Available for New Projects</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-neutral-900 leading-[1.05] font-heading tracking-tight">
            Transforming Ideas
            <br />
            into{" "}
            <span className="text-shimmer">Digital Reality</span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-500 mt-6 mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          >
            Elevating businesses with cutting-edge solutions in web, mobile, and
            AI development.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
          >
            <Link
              href="/portfolio"
              className="shining-button px-8 py-4 text-base bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-semibold tracking-tight transition-all duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded-full flex items-center gap-2 text-sm"
            >
              <span className="whitespace-nowrap">See Our Work →</span>
            </Link>
            <ContactButton
              headerText="How can we help you with your project?"
              showProjectType={true}
              btnText="Get Free Quote"
              getQuote={true}
            />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex items-center gap-6 mt-10 pt-8 border-t border-neutral-200/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          >
            <div className="flex -space-x-2">
              {['RK', 'PS', 'AP', 'NK'].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-white flex items-center justify-center text-[0.6rem] text-white font-bold"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-0.5">
                {'★★★★★'}
              </div>
              <p className="text-neutral-400 text-xs">
                Trusted by <span className="text-neutral-700 font-semibold">30+</span> clients worldwide
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
        >
          <div className="animate-float">
            <Image
              src={HeroImage}
              alt="Digital Development Illustration"
              width={600}
              height={400}
              className="w-full h-auto object-cover drop-shadow-lg"
              quality={80}
              priority
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default HeroSection;

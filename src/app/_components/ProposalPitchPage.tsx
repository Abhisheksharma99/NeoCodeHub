"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from "framer-motion";
import dynamic from "next/dynamic";
import ContactButton from "./ContactButton";
import type { ProposalData } from "@/lib/personalization";

/* ---------- dynamic import for Three.js (SSR-safe) ---------- */
const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => null,
});

/* ---------- types ---------- */
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
}

interface ProposalPitchPageProps {
  data: ProposalData;
  projects: Project[];
}

/* ---------- constants ---------- */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const refLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  email: "Email",
  twitter: "Twitter",
  upwork: "Upwork",
  fiverr: "Fiverr",
  clutch: "Clutch",
  referral: "Referral",
};

const MARQUEE_WORDS = [
  "STRATEGY",
  "DESIGN",
  "DEVELOPMENT",
  "LAUNCH",
  "GROWTH",
  "INNOVATION",
  "PERFORMANCE",
  "SCALABILITY",
];

const approachCards = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
    title: "Strategy & Discovery",
    bullets: [
      "In-depth research & competitive analysis",
      "Information architecture planning",
      "User journey mapping & personas",
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
    title: "Design & Development",
    bullets: [
      "Pixel-perfect UI/UX implementation",
      "Modern tech stack & clean code",
      "Iterative feedback & refinement",
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
      </svg>
    ),
    title: "Launch & Growth",
    bullets: [
      "Performance-optimized deployment",
      "SEO & analytics integration",
      "Ongoing support & iteration",
    ],
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24/7", label: "Dedicated Support" },
];

/* ================================================================
   Sub-components
   ================================================================ */

/* ---- Scroll Progress Bar ---- */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
      style={{ scaleX }}
    />
  );
}

/* ---- Character-by-character text reveal ---- */
function CharReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, rotateX: -90, y: 30 }}
          animate={
            inView
              ? { opacity: 1, rotateX: 0, y: 0 }
              : { opacity: 0, rotateX: -90, y: 30 }
          }
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: EASE_OUT,
          }}
          style={{
            display: "inline-block",
            transformPerspective: 500,
            transformOrigin: "bottom",
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ---- Marquee Strip ---- */
function MarqueeStrip() {
  const content = MARQUEE_WORDS.map((w) => w + " \u2022 ").join("");
  const doubled = content + content;

  return (
    <div className="relative border-y border-neutral-800/40 overflow-hidden py-6 select-none">
      <motion.div
        className="whitespace-nowrap text-[clamp(3rem,8vw,6rem)] font-heading font-bold text-neutral-100 leading-none"
        style={{ opacity: 0.04 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubled}
      </motion.div>
    </div>
  );
}

/* ---- 3D Tilt Card ---- */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouse(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(-((y - centerY) / centerY) * 8);
    rotateY.set(((x - centerX) / centerX) * 8);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- Magnetic Button ---- */
function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouse(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- Animated Gradient Border Badge ---- */
function GradientBorderBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex rounded-full p-[1px] ${className}`}>
      {/* Subtle static gradient border */}
      <div
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background:
            "linear-gradient(135deg, #525252, #a3a3a3, #525252)",
        }}
      />
      {/* Soft glow */}
      <div className="absolute inset-[-1px] rounded-full bg-white/[0.04] blur-sm" />
      {/* Inner content */}
      <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900/95 backdrop-blur-sm border border-neutral-800/30">
        {children}
      </div>
    </div>
  );
}

/* ---- Scroll Reveal Wrapper ---- */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE_OUT,
      }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- Horizontal Scroll Gallery ---- */
function HorizontalScrollGallery({
  projects,
  heading,
  id,
}: {
  projects: Project[];
  heading: React.ReactNode;
  id?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const cardCount = projects.length;
  const cardWidth = 432; // 400px card + 32px gap
  const translateEnd = -(cardCount - 1) * cardWidth;
  const x = useTransform(scrollYProgress, [0, 1], [0, translateEnd]);

  return (
    <div
      ref={outerRef}
      id={id}
      className="relative"
      style={{ height: `calc(100vh + ${Math.abs(translateEnd)}px)` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section heading inside sticky so it stays visible */}
        <div className="px-6 max-w-6xl mx-auto w-full mb-8">
          {heading}
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          className="flex gap-8"
          style={{ x }}
        >
          {/* Leading spacer to center first card */}
          <div className="shrink-0" style={{ width: "calc(50vw - 200px)" }} />

          {projects.map((project) => (
            <div key={project.id} className="shrink-0 w-[400px]">
              <TiltCard className="h-full">
                <div className="relative h-full p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-neutral-700/80 hover:bg-neutral-900/70 group">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-700/0 to-neutral-800/0 group-hover:from-neutral-700/10 group-hover:to-neutral-800/5 transition-all duration-500 pointer-events-none" />

                  <div
                    className="relative"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-neutral-700/60 bg-neutral-800/60 text-neutral-400 mb-5">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-heading font-semibold mb-3 tracking-tight text-neutral-100">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          project.status === "completed"
                            ? "bg-green-400"
                            : "bg-amber-400"
                        }`}
                      />
                      <span className="text-xs font-mono text-neutral-500 capitalize">
                        {project.status === "in-progress"
                          ? "In Progress"
                          : project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}

          {/* Trailing spacer */}
          <div className="shrink-0 w-[50vw]" />
        </motion.div>
      </div>
    </div>
  );
}

/* ---- Proposal Navbar ---- */
function ProposalNavbar({ companyName }: { companyName: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#approach", label: "Process" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#why-us", label: "Why Us" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-2xl border-b border-neutral-800/50 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors duration-300">
            <span className="text-sm font-heading font-bold text-white">N</span>
          </div>
          <span className="text-sm font-heading font-semibold text-neutral-300 group-hover:text-white transition-colors duration-300 hidden sm:block">
            NeoCodeHub
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="px-4 py-2 text-xs font-mono tracking-[0.15em] uppercase text-neutral-500 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-heading font-semibold text-neutral-300 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all duration-300"
        >
          Get in Touch
        </motion.a>
      </div>
    </motion.nav>
  );
}

/* ================================================================
   Main Component
   ================================================================ */
export default function ProposalPitchPage({
  data,
  projects,
}: ProposalPitchPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  /* parallax orb offsets */
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const displayName = data.name || "there";
  const displayCompany = data.company || "your team";
  const displayProject = data.project || data.service || "your project";

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-x-clip font-body">
      <ProposalNavbar companyName={displayCompany} />
      <ScrollProgressBar />

      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Scene Background */}
        <Hero3DScene />

        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-[15%] left-[10%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-neutral-700/30 to-neutral-900/0 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute top-[40%] right-[5%] w-[340px] h-[340px] rounded-full bg-gradient-to-br from-neutral-600/20 to-transparent blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: orbY3 }}
          className="absolute bottom-[10%] left-[40%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-neutral-500/10 to-transparent blur-3xl pointer-events-none"
        />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          {/* Animated Gradient Border Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mb-8 flex justify-center"
          >
            <GradientBorderBadge>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
                Exclusive Proposal
              </span>
            </GradientBorderBadge>
          </motion.div>

          {/* Heading with character reveal */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.15,
              ease: EASE_OUT,
            }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[1.05] text-white"
          >
            Hi{" "}
            <CharReveal text={displayName} delay={0.3} className="text-white" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + displayName.length * 0.04 + 0.1 }}
            >
              ,
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: EASE_OUT,
            }}
            className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;ve crafted this proposal exclusively for{" "}
            <span className="text-neutral-200 font-medium">
              {displayCompany}
            </span>
          </motion.p>

          {/* Project badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: EASE_OUT,
            }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-700/50 bg-neutral-900/60 backdrop-blur-md"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-4 h-4 text-neutral-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <span className="text-sm font-mono text-neutral-300">
              {displayProject}
            </span>
          </motion.div>

          {/* Custom message */}
          {data.message && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.0,
                ease: EASE_OUT,
              }}
              className="mt-8 text-sm text-neutral-500 italic max-w-lg mx-auto"
            >
              &ldquo;{data.message}&rdquo;
            </motion.p>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 rounded-full bg-neutral-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== MARQUEE STRIP ==================== */}
      <MarqueeStrip />

      {/* ==================== APPROACH SECTION ==================== */}
      <section id="approach" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4">
                Our Process
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-white">
                How We&apos;ll Transform{" "}
                <span className="bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">
                  {displayProject}
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {approachCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <TiltCard className="h-full">
                  <div className="relative h-full p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-neutral-700/80 hover:bg-neutral-900/70 group">
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-700/0 to-neutral-800/0 group-hover:from-neutral-700/10 group-hover:to-neutral-800/5 transition-all duration-500 pointer-events-none" />

                    <div
                      className="relative"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 mb-6">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-heading font-semibold mb-4 tracking-tight text-white">
                        {card.title}
                      </h3>
                      <ul className="space-y-3">
                        {card.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-sm text-neutral-400 leading-relaxed"
                          >
                            <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MARQUEE STRIP (reversed) ==================== */}
      <MarqueeStrip />

      {/* ==================== PORTFOLIO - HORIZONTAL SCROLL ==================== */}
      <HorizontalScrollGallery
        id="portfolio"
        projects={projects}
        heading={
          <ScrollReveal>
            <div className="text-center">
              <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4">
                Portfolio
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-white">
                Relevant{" "}
                <span className="bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">
                  Work
                </span>
              </h2>
            </div>
          </ScrollReveal>
        }
      />

      {/* ==================== WHY NEOCODEHUB SECTION ==================== */}
      <section id="why-us" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4">
                Why Us
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-white">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">
                  NeoCodeHub
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="text-center p-6 rounded-2xl border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-sm">
                  <div className="text-3xl sm:text-4xl font-heading font-bold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono tracking-wider uppercase text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Description */}
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                NeoCodeHub is a team of dedicated developers, designers, and
                strategists passionate about transforming ideas into
                high-performance digital products. We combine cutting-edge
                technology with proven methodologies to deliver solutions that
                drive measurable business growth.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Full-Stack Development",
                  "UI/UX Design",
                  "Cloud & DevOps",
                  "AI & Machine Learning",
                  "Mobile Apps",
                  "Performance Optimization",
                ].map((cap) => (
                  <span
                    key={cap}
                    className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider border border-neutral-800/60 bg-neutral-900/40 text-neutral-400"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section id="contact" className="relative py-32 px-6">
        {/* Background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-neutral-700/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4">
              Next Steps
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-white mb-6">
              Ready to Start{" "}
              <span className="bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">
                {displayProject}
              </span>
              ?
            </h2>
            <p className="text-lg text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed">
              Let&apos;s discuss your vision for{" "}
              <span className="text-neutral-300">{displayCompany}</span> and
              turn it into reality.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <ContactButton
                  headerText={
                    data.project
                      ? `Let's discuss ${data.project}`
                      : data.company
                        ? `Let's discuss your project, ${data.name}`
                        : "Let's discuss your project"
                  }
                  showProjectType={true}
                  btnText="Get in Touch"
                  getQuote={true}
                />
              </MagneticButton>
              <MagneticButton>
                <a
                  href="mailto:neocodehub@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700/60 text-sm font-heading font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  Schedule a Call
                </a>
              </MagneticButton>
            </div>

            {data.ref && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-xs text-neutral-600 font-mono"
              >
                Referred via{" "}
                <span className="text-neutral-500">
                  {refLabels[data.ref] || data.ref}
                </span>
              </motion.p>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Footer stripe */}
      <div className="border-t border-neutral-800/60 py-8 text-center">
        <p className="text-xs text-neutral-600 font-mono tracking-wider">
          &copy; {new Date().getFullYear()} NeoCodeHub. Crafted with precision.
        </p>
      </div>
    </div>
  );
}

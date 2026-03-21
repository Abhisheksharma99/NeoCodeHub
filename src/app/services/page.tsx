'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaGlobe,
  FaMobileAlt,
  FaCloud,
  FaPaintBrush,
  FaShoppingCart,
  FaSearch,
  FaCode,
  FaRocket,
  FaReact,
  FaNodeJs,
  FaAngular,
  FaPython,
  FaSwift,
  FaPhp,
  FaJava,
} from 'react-icons/fa';
import {
  GiArtificialIntelligence,
} from 'react-icons/gi';
import {
  SiNextdotjs,
  SiDocker,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiFirebase,
  SiAmazon,
  SiGraphql,
  SiKubernetes,
  SiTensorflow,
  SiFigma,
  SiShopify,
  SiFlutter,
  SiRedux,
} from 'react-icons/si';
import { TbBrandKotlin } from 'react-icons/tb';
import PageHeader from '../_components/PageHeader';
import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import MagneticButton from '../_components/MagneticButton';
import ContactButton from '../_components/ContactButton';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ---- Service Data ---- */
const services = [
  {
    icon: <FaGlobe className="text-2xl" />,
    title: 'Web Development',
    description:
      'We build modern, responsive, and high-performance websites and web applications that drive business growth. From corporate sites to complex SaaS platforms, our web solutions are crafted with cutting-edge technology and meticulous attention to detail.',
    features: [
      'Custom website design and development',
      'Progressive Web Apps (PWA)',
      'Single Page Applications (SPA)',
      'Content Management Systems (CMS)',
      'API development and integration',
      'Performance optimization and SEO',
    ],
    technologies: [
      { icon: <FaReact />, name: 'React' },
      { icon: <SiNextdotjs />, name: 'Next.js' },
      { icon: <FaAngular />, name: 'Angular' },
      { icon: <FaNodeJs />, name: 'Node.js' },
      { icon: <SiTypescript />, name: 'TypeScript' },
      { icon: <SiTailwindcss />, name: 'Tailwind' },
    ],
  },
  {
    icon: <GiArtificialIntelligence className="text-2xl" />,
    title: 'AI & Machine Learning',
    description:
      'Transform your data into actionable intelligence with our AI and machine learning solutions. We build predictive models, natural language processing systems, and computer vision applications that automate processes and uncover valuable insights.',
    features: [
      'Predictive analytics and forecasting',
      'Natural Language Processing (NLP)',
      'Computer vision and image recognition',
      'Chatbot and virtual assistant development',
      'Recommendation engine systems',
      'Data pipeline and ETL automation',
    ],
    technologies: [
      { icon: <FaPython />, name: 'Python' },
      { icon: <SiTensorflow />, name: 'TensorFlow' },
      { icon: <FaNodeJs />, name: 'Node.js' },
      { icon: <SiPostgresql />, name: 'PostgreSQL' },
      { icon: <SiMongodb />, name: 'MongoDB' },
      { icon: <SiAmazon />, name: 'AWS' },
    ],
  },
  {
    icon: <FaMobileAlt className="text-2xl" />,
    title: 'Mobile App Development',
    description:
      'Deliver exceptional mobile experiences on iOS and Android with our native and cross-platform app development services. We focus on intuitive design, smooth performance, and seamless integration with backend services.',
    features: [
      'Native iOS and Android development',
      'Cross-platform apps with React Native and Flutter',
      'App Store optimization and deployment',
      'Push notifications and real-time features',
      'Offline-first architecture',
      'Mobile app maintenance and updates',
    ],
    technologies: [
      { icon: <FaSwift />, name: 'Swift' },
      { icon: <TbBrandKotlin />, name: 'Kotlin' },
      { icon: <FaReact />, name: 'React Native' },
      { icon: <SiFlutter />, name: 'Flutter' },
      { icon: <SiFirebase />, name: 'Firebase' },
      { icon: <SiRedux />, name: 'Redux' },
    ],
  },
  {
    icon: <FaCloud className="text-2xl" />,
    title: 'Cloud & DevOps',
    description:
      'Leverage the power of cloud computing to build scalable, reliable, and secure infrastructure. Our DevOps expertise ensures seamless CI/CD pipelines, automated deployments, and optimized cloud architecture.',
    features: [
      'Cloud migration and architecture design',
      'CI/CD pipeline setup and automation',
      'Container orchestration with Docker and Kubernetes',
      'Infrastructure as Code (IaC)',
      'Cloud security and compliance',
      'Performance monitoring and auto-scaling',
    ],
    technologies: [
      { icon: <SiAmazon />, name: 'AWS' },
      { icon: <SiDocker />, name: 'Docker' },
      { icon: <SiKubernetes />, name: 'Kubernetes' },
      { icon: <SiFirebase />, name: 'Firebase' },
      { icon: <SiPostgresql />, name: 'PostgreSQL' },
      { icon: <SiGraphql />, name: 'GraphQL' },
    ],
  },
  {
    icon: <FaPaintBrush className="text-2xl" />,
    title: 'UI/UX Design',
    description:
      'Create memorable digital experiences with our human-centered design approach. We combine aesthetics with usability, conducting thorough user research to deliver interfaces that are beautiful, intuitive, and conversion-optimized.',
    features: [
      'User research and persona development',
      'Wireframing and interactive prototyping',
      'Visual design and brand identity',
      'Design system and component library creation',
      'Usability testing and iteration',
      'Accessibility-compliant design (WCAG)',
    ],
    technologies: [
      { icon: <SiFigma />, name: 'Figma' },
      { icon: <SiTailwindcss />, name: 'Tailwind' },
      { icon: <FaReact />, name: 'React' },
      { icon: <SiNextdotjs />, name: 'Next.js' },
      { icon: <FaAngular />, name: 'Angular' },
      { icon: <SiTypescript />, name: 'TypeScript' },
    ],
  },
  {
    icon: <FaShoppingCart className="text-2xl" />,
    title: 'E-Commerce Solutions',
    description:
      'Build powerful online stores that convert visitors into customers. From custom storefronts to marketplace platforms, we deliver e-commerce solutions with seamless payment integration, inventory management, and analytics.',
    features: [
      'Custom e-commerce platform development',
      'Shopify and Magento development',
      'Payment gateway integration',
      'Inventory and order management systems',
      'Product recommendation engines',
      'Analytics and conversion optimization',
    ],
    technologies: [
      { icon: <SiShopify />, name: 'Shopify' },
      { icon: <FaReact />, name: 'React' },
      { icon: <FaNodeJs />, name: 'Node.js' },
      { icon: <SiMongodb />, name: 'MongoDB' },
      { icon: <FaPhp />, name: 'PHP' },
      { icon: <FaJava />, name: 'Java' },
    ],
  },
];

/* ---- Process Steps ---- */
const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start by understanding your vision, goals, target audience, and technical requirements through in-depth consultation and research.',
    icon: <FaSearch />,
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our designers create wireframes and visual prototypes, iterating based on your feedback until the design perfectly captures your brand.',
    icon: <FaPaintBrush />,
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Expert developers bring designs to life with clean, scalable, and performant code. You see progress through regular demos and reviews.',
    icon: <FaCode />,
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'After rigorous testing and QA, we deploy your project with zero downtime. Post-launch support ensures everything runs smoothly.',
    icon: <FaRocket />,
  },
];

/* ---- Tech Stack for Showcase ---- */
const techStack = [
  { icon: <FaReact />, name: 'React' },
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <FaAngular />, name: 'Angular' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <FaPython />, name: 'Python' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <SiTailwindcss />, name: 'Tailwind' },
  { icon: <SiMongodb />, name: 'MongoDB' },
  { icon: <SiPostgresql />, name: 'PostgreSQL' },
  { icon: <SiFirebase />, name: 'Firebase' },
  { icon: <SiDocker />, name: 'Docker' },
  { icon: <SiAmazon />, name: 'AWS' },
  { icon: <FaSwift />, name: 'Swift' },
  { icon: <TbBrandKotlin />, name: 'Kotlin' },
  { icon: <SiGraphql />, name: 'GraphQL' },
  { icon: <SiKubernetes />, name: 'Kubernetes' },
];

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navbar />
      <PageHeader
        title="Our Services"
        subtitle="From web and mobile development to AI and cloud solutions, we provide end-to-end digital services to help your business thrive."
        badge="What We Do"
      />

      {/* Services Grid - Detailed */}
      <section className="relative">
        <div className="container mx-auto px-6 lg:px-8 pb-20 md:pb-28">
          <div className="space-y-16 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="glass-card p-8 md:p-10"
                style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 60, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.05, ease: easeOut }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left: Icon + Title + Description */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-neutral-500 tracking-widest">
                          SERVICE {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-2xl font-heading font-bold text-neutral-900 tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-neutral-700 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Technologies */}
                    <div>
                      <p className="text-xs font-mono font-bold text-neutral-500 tracking-widest uppercase mb-3">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech.name}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-100 hover:border-neutral-200 hover:bg-white transition-all duration-200"
                          >
                            <span className="text-neutral-500">{tech.icon}</span>
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Features */}
                  <div className="md:w-[320px] shrink-0">
                    <p className="text-xs font-mono font-bold text-neutral-500 tracking-widest uppercase mb-4">
                      Key Deliverables
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-neutral-700 leading-relaxed"
                        >
                          <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Process Section */}
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
            <span className="section-badge">Our Methodology</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
              How We Work
            </h2>
            <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              A proven four-step process that transforms your ideas into exceptional digital products.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative"
            style={{ perspective: 800 }}
          >
            {/* Connecting line (desktop) */}
            <motion.div
              className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-px overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
                style={{ transformOrigin: 'left center' }}
              />
            </motion.div>

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: easeOut,
                }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-2xl relative z-10 shadow-lg shadow-neutral-900/20"
                  initial={{ scale: 0.7 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {step.icon}
                </motion.div>

                <motion.span
                  className="inline-block text-[0.7rem] font-mono font-bold text-neutral-500 tracking-widest mb-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.15,
                    type: 'spring',
                    stiffness: 250,
                    damping: 12,
                  }}
                >
                  STEP {step.number}
                </motion.span>

                <h3 className="text-xl font-heading font-bold text-neutral-900 tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-700 text-sm leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Technology Stack Showcase */}
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
            <span className="section-badge">Technologies</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
              Our Technology Stack
            </h2>
            <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              We use the best tools for every job, ensuring your project is built on a modern, scalable foundation.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 max-w-4xl mx-auto"
            style={{ perspective: 800 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.03, ease: easeOut }}
                whileHover={{ scale: 1.08, rotateY: 12 }}
              >
                <div className="flex flex-col items-center justify-center py-5 px-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-neutral-100/80 hover:border-neutral-200 hover:bg-white/90 hover:shadow-md transition-all duration-300 cursor-default">
                  <div className="text-2xl md:text-3xl text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200 mb-2">
                    {tech.icon}
                  </div>
                  <p className="text-[10px] md:text-xs font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors text-center leading-tight">
                    {tech.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Pricing CTA Section */}
      <section className="relative bg-neutral-950 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-neutral-800 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-neutral-800 rounded-full blur-[100px] opacity-30" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase mb-4">
              Get Started
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-white mb-6">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Every project is unique. Tell us about your vision and we will provide a tailored quote with transparent pricing and clear deliverables.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.2}>
                <ContactButton
                  headerText="Tell us about your project for a free quote!"
                  showProjectType={true}
                  btnText="Get a Free Quote"
                  getQuote={true}
                />
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="/contact"
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
                  Contact Us
                </Link>
              </MagneticButton>
            </div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-neutral-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '100%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-heading font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

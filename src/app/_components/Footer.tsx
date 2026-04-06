'use client';

import React from "react";
import TSILogo from "../assets/TSILogo.png";
import ContactButton from "./ContactButton";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaAddressCard,
  FaAddressBook,
  FaQuestionCircle,
  FaArrowUp,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaLinkedin, label: "LinkedIn", href: "#", hoverColor: "hover:text-blue-400" },
  { icon: FaTwitter, label: "Twitter", href: "#", hoverColor: "hover:text-neutral-300" },
  { icon: FaInstagram, label: "Instagram", href: "#", hoverColor: "hover:text-pink-400" },
  { icon: FaYoutube, label: "YouTube", href: "#", hoverColor: "hover:text-red-400" },
  { icon: FaFacebookF, label: "Facebook", href: "#", hoverColor: "hover:text-blue-400" },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "//api.whatsapp.com/send?phone=917015445629&text=Hi!, I have a query regarding",
    hoverColor: "hover:text-green-400",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const Footer = () => {
  const currentDate = new Date();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neutral-950 text-white mt-0">
      {/* Gradient transition from main content */}
      <div className="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-neutral-950 pointer-events-none" />

      {/* CTA Banner with ScrollReveal */}
      <div className="container mx-auto px-6 lg:px-8 pt-20 pb-12">
        <motion.div
          className="relative overflow-hidden rounded-3xl gradient-border-animated p-8 md:p-12 mb-16"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {/* Decorative orb */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-neutral-700 rounded-full blur-[100px] opacity-30" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-neutral-400 text-sm font-medium mb-2 tracking-wide uppercase">
                Ready to start?
              </p>
              <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-white">
                Let&apos;s Build Something<br />
                <span className="text-neutral-400">Amazing Together</span>
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton strength={0.2}>
                <ContactButton
                  getQuote={true}
                  headerText="Get a free quote for your project today!!"
                  btnText="Get a Free Quote"
                />
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <ContactButton
                  showProjectType={true}
                  headerText="How can we help you with your project?"
                  btnText="Discuss Project"
                />
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Social Strip with staggered entrance */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-10 border-b border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-neutral-400 text-sm font-medium">
            Get connected with us on social networks
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href, hoverColor }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  type: 'spring',
                  stiffness: 260,
                  damping: 15,
                }}
              >
                <MagneticButton strength={0.3}>
                  <a
                    href={href}
                    aria-label={label}
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800/80 text-neutral-500 ${hoverColor} hover:bg-neutral-700/80 transition-all duration-200`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Icon className="text-sm" />
                    </motion.span>
                  </a>
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <a href="/">
              <Image
                src={TSILogo}
                width={200}
                height={80}
                alt="NeoCodeHub logo"
                className="mx-auto md:mx-0 mb-4 brightness-0 invert opacity-90"
              />
            </a>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              NeoCodeHub is a leading software and website development company
              dedicated to transforming ideas into innovative digital solutions
              with a passion for technology.
            </p>
          </div>

          {/* Useful Links */}
          <div className="text-center">
            <h4 className="font-heading font-bold text-xs tracking-[0.15em] uppercase text-neutral-300 mb-6">
              Useful Links
            </h4>
            <div className="space-y-3">
              <a href="/#about" className="flex items-center justify-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm">
                <FaAddressCard className="text-xs" /> About Us
              </a>
              <a href="/#contact" className="flex items-center justify-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm">
                <FaAddressBook className="text-xs" /> Contact Us
              </a>
              <a href="tel:+917019797893" className="flex items-center justify-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm">
                <FaQuestionCircle className="text-xs" /> Query?
              </a>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="text-center md:text-right">
            <h4 className="font-heading font-bold text-xs tracking-[0.15em] uppercase text-neutral-300 mb-6">
              Contact & Address
            </h4>
            <div className="space-y-3">
              <p className="flex items-center justify-center md:justify-end gap-2 text-neutral-500 text-sm">
                <FaHome className="text-xs shrink-0" />
                Faridabad, Haryana, India
              </p>
              <a
                href="mailto:sales@NeoCodeHub.com"
                className="flex items-center justify-center md:justify-end gap-2 text-neutral-500 hover:text-white transition-colors text-sm"
              >
                <FaEnvelope className="text-xs shrink-0" />
                sales@NeoCodeHub.com
              </a>
              <a
                href="mailto:info@NeoCodeHub.com"
                className="flex items-center justify-center md:justify-end gap-2 text-neutral-500 hover:text-white transition-colors text-sm"
              >
                <FaEnvelope className="text-xs shrink-0" />
                info@NeoCodeHub.com
              </a>
              <a
                href="tel:+917015445629"
                className="flex items-center justify-center md:justify-end gap-2 text-neutral-500 hover:text-white transition-colors text-sm"
              >
                <FaPhone className="text-xs shrink-0" />
                +91 7015445629
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-neutral-500 text-xs">
            Copyright &copy; 2020 - {currentDate.getFullYear()}{" "}
            <a
              className="text-neutral-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.NeoCodeHub.in/"
            >
              NeoCodeHub
            </a>
          </p>
          <div className="flex items-center gap-6">
            <p className="text-neutral-500 text-xs">
              Designed & Developed by{" "}
              <a
                className="text-neutral-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://abhishek-sharma-portfolio.netlify.app/"
              >
                Abhishek Sharma
              </a>
            </p>
            {/* Scroll to top with animation */}
            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <FaArrowUp className="text-xs" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

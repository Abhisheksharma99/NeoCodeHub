'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import PageHeader from '../_components/PageHeader';
import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import MagneticButton from '../_components/MagneticButton';
import { Button } from '../_components/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ---- Contact Info ---- */
const contactInfo = [
  {
    icon: <FaEnvelope className="text-lg" />,
    label: 'Email',
    value: 'neocodehub@gmail.com',
    href: 'mailto:neocodehub@gmail.com',
  },
  {
    icon: <FaPhone className="text-lg" />,
    label: 'Phone',
    value: '+91 7015445629',
    href: 'tel:+917015445629',
  },
  {
    icon: <FaMapMarkerAlt className="text-lg" />,
    label: 'Location',
    value: 'Faridabad, Haryana, India',
    href: undefined,
  },
];

/* ---- Social Links ---- */
const socialLinks = [
  { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
  { icon: <FaTwitter />, label: 'Twitter', href: '#' },
  { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  {
    icon: <FaWhatsapp />,
    label: 'WhatsApp',
    href: '//api.whatsapp.com/send?phone=917015445629&text=Hi!, I have a query regarding',
  },
];

/* ---- FAQ Data ---- */
const faqs = [
  {
    question: 'What is the typical timeline for a project?',
    answer:
      'Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 2-6 months. During our initial consultation, we provide a detailed project timeline tailored to your requirements.',
  },
  {
    question: 'How do you handle project communication?',
    answer:
      'We believe in transparent, consistent communication. You will have a dedicated project manager and access to our project management tools. We schedule regular check-ins, provide weekly progress reports, and are always available via email, phone, or messaging platforms.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'We work with a wide range of modern technologies including React, Next.js, Angular, Node.js, Python, Swift, Kotlin, and more. For databases, we use MongoDB, PostgreSQL, and Firebase. Our cloud expertise spans AWS, Azure, and Google Cloud Platform.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Absolutely. We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, performance monitoring, security updates, and feature enhancements. Our 24/7 support ensures your application runs smoothly at all times.',
  },
];

/* ---- Project Types ---- */
const projectTypes = [
  'Web Development',
  'Mobile App Development',
  'AI & Machine Learning',
  'Cloud Solutions',
  'UI/UX Design',
  'E-Commerce',
  'Other',
];

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validateForm = () => {
    const formErrors: FormErrors = {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      formErrors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.message.trim()) {
      formErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if ((errors as unknown as Record<string, string>)[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative">
      <Navbar />
      <PageHeader
        title="Get In Touch"
        subtitle="Have a project in mind? Let us discuss how NeoCodeHub can help transform your ideas into reality."
        badge="Contact Us"
      />

      {/* Contact Section: Two-Column Layout */}
      <section className="relative">
        {/* Background orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 pb-20 md:pb-28 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
            {/* Left: Contact Form */}
            <motion.div
              className="flex-1"
              style={{ perspective: 800 }}
              initial={{ opacity: 0, x: -40, rotateY: 5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: easeOut }}
            >
              <div className="glass-card p-8 md:p-10">
                <h3 className="text-2xl font-heading font-bold tracking-tight text-neutral-900 mb-2">
                  Send Us a Message
                </h3>
                <p className="text-neutral-600 text-sm mb-8 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          className={`form-input-modern ${errors.name ? 'border-b-red-400' : ''}`}
                          required
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address *"
                          className={`form-input-modern ${errors.email ? 'border-b-red-400' : ''}`}
                          required
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <PhoneInput
                          country={'in'}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          inputProps={{
                            name: 'phone',
                            required: true,
                            className: 'form-input-modern !pl-12',
                            placeholder: 'Phone Number *',
                          }}
                          containerClass="w-full"
                          buttonStyle={{
                            width: 42,
                            borderBottom: '1.5px solid #e5e5e5',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: 0,
                          }}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="form-input-modern appearance-none cursor-pointer"
                        >
                          <option value="">Select Project Type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project *"
                          rows={4}
                          className={`form-input-modern resize-none ${errors.message ? 'border-b-red-400' : ''}`}
                          required
                        />
                        {errors.message && (
                          <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
                        )}
                      </div>

                      <MagneticButton strength={0.15}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          text={isSubmitting ? 'Sending...' : 'Send Message'}
                          btnClass="text-sm w-full justify-center"
                        />
                      </MagneticButton>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-neutral-900 font-heading font-bold text-xl mb-2">
                        Thank You!
                      </p>
                      <p className="text-neutral-600 text-sm mb-6">
                        Your message has been sent successfully. We will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Contact Info Sidebar */}
            <motion.div
              className="w-full lg:w-[380px] shrink-0"
              style={{ perspective: 800 }}
              initial={{ opacity: 0, x: 40, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            >
              {/* Contact Details */}
              <div className="glass-card p-8 mb-6">
                <h3 className="text-lg font-heading font-bold tracking-tight text-neutral-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: easeOut }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-neutral-900 font-medium hover:text-neutral-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-neutral-900 font-medium">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-8 mb-6">
                <h3 className="text-lg font-heading font-bold tracking-tight text-neutral-900 mb-5">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                        type: 'spring',
                        stiffness: 260,
                        damping: 15,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="glass-card p-8">
                <h3 className="text-lg font-heading font-bold tracking-tight text-neutral-900 mb-5">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Monday - Friday</span>
                    <span className="text-sm font-medium text-neutral-900">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Saturday</span>
                    <span className="text-sm font-medium text-neutral-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Sunday</span>
                    <span className="text-sm font-medium text-neutral-500">Closed</span>
                  </div>
                  <div className="pt-3 border-t border-neutral-100">
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Emergency support is available 24/7 for existing clients.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Decorative Map Placeholder */}
      <section className="relative">
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            className="text-center mb-12"
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="section-badge">Our Location</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-neutral-900">
              Where to Find Us
            </h2>
          </motion.div>

          <motion.div
            className="glass-card p-1 max-w-4xl mx-auto overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <div className="relative w-full h-64 md:h-80 rounded-[16px] bg-neutral-100 overflow-hidden flex items-center justify-center">
              {/* Decorative grid pattern as map placeholder */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.2) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-200" />
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3">
                  <FaMapMarkerAlt />
                </div>
                <p className="text-neutral-900 font-heading font-bold text-lg">Faridabad, Haryana</p>
                <p className="text-neutral-600 text-sm">India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* FAQ Section */}
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
            <span className="section-badge">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-700 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about working with NeoCodeHub.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="glass-card overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-base font-heading font-bold text-neutral-900 tracking-tight pr-4">
                    {faq.question}
                  </span>
                  <span className="text-neutral-500 shrink-0">
                    {openFaq === index ? (
                      <FaChevronUp className="text-sm" />
                    ) : (
                      <FaChevronDown className="text-sm" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-neutral-700 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

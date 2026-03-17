'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image';
import Discuss from '../assets/Discuss.svg';
import Invoice from "../assets/Invoice-bro.svg"
import PhoneInput from 'react-phone-input-2';

interface ContactFormPopupProps {
  headerText: string,
  showProjectType?: boolean,
  getQuote?: boolean,
  isOpen: boolean,
  onClose: () => void
}

const easeOut = [0.16, 1, 0.3, 1] as const;

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.15 + i * 0.07, ease: easeOut },
  }),
};

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ headerText, getQuote = false, showProjectType = false, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    phone: ''
  })
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'E-commerce',
    'Enterprise Software',
    'AI/Machine Learning',
    'Data Analytics',
    'IoT Solutions',
    'Cybersecurity',
    'Cloud Services',
    'SaaS Application',
    'Other'
  ]

  const formRef = useRef<HTMLDivElement>(null)

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '', projectType: '', phone: '' })
    setSubmitted(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        resetForm()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, phone: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2200)
  }

  const filledCount = [formData.name, formData.email, formData.message].filter(Boolean).length
    + (getQuote && formData.phone ? 1 : 0)
    + (showProjectType && formData.projectType ? 1 : 0)
  const totalFields = 3 + (getQuote ? 1 : 0) + (showProjectType ? 1 : 0)
  const progress = totalFields > 0 ? (filledCount / totalFields) * 100 : 0

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(10, 10, 10, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            ref={formRef}
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            style={{
              position: 'relative',
              width: 'calc(100% - 2rem)',
              maxWidth: '56rem',
              maxHeight: '90vh',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
            }}
          >
            {/* Progress bar at top */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '3px',
                zIndex: 20,
                background: 'linear-gradient(90deg, #171717, #525252, #a3a3a3)',
                borderRadius: '0 2px 2px 0',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: easeOut }}
            />

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-900/5 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </motion.button>

            {/* Image Side */}
            <motion.div
              className="w-full md:w-1/2 relative shrink-0 overflow-hidden"
              style={{
                height: window.innerWidth >= 768 ? 'auto' : '180px',
                background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            >
              {/* Decorative gradient orb */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-30%',
                  right: '-20%',
                  width: '70%',
                  height: '70%',
                  background: 'radial-gradient(circle, rgba(23,23,23,0.06) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
              <Image
                src={getQuote ? Invoice : Discuss}
                alt="Contact Us"
                fill
                style={{ objectFit: 'contain' }}
                className="absolute inset-0 p-6 md:p-8"
              />
              {/* Bottom label on image side */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#525252',
                  border: '1px solid rgba(0,0,0,0.05)',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {getQuote ? 'Get your free quote today' : 'We respond within 24 hours'}
              </motion.div>
            </motion.div>

            {/* Form Side */}
            <div className="w-full md:w-1/2 overflow-y-auto" style={{ padding: window.innerWidth >= 768 ? '2rem' : '1.5rem' }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle size={56} className="text-neutral-900 mb-4" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-heading font-bold text-2xl text-neutral-900 mb-2 tracking-tight"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="text-neutral-500 text-sm max-w-xs"
                    >
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </motion.p>
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 2, delay: 0.2, ease: 'linear' }}
                      style={{
                        height: '2px',
                        background: '#171717',
                        borderRadius: '2px',
                        marginTop: '24px',
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                    >
                      <p className="text-xs font-medium text-neutral-400 uppercase tracking-[0.15em] mb-2">
                        {getQuote ? 'Free Quote' : 'Get in Touch'}
                      </p>
                      <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 text-neutral-900 tracking-tight leading-snug">
                        {headerText}
                      </h2>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                        <label htmlFor="popup-name" className="block text-xs font-medium text-neutral-400 mb-1.5">
                          Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="popup-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="form-input-modern text-sm"
                            placeholder="Your Name"
                          />
                          {focusedField === 'name' && (
                            <motion.div
                              layoutId="field-highlight"
                              className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-neutral-900 rounded-full"
                              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            />
                          )}
                        </div>
                      </motion.div>

                      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                        <label htmlFor="popup-email" className="block text-xs font-medium text-neutral-400 mb-1.5">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="popup-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="form-input-modern text-sm"
                            placeholder="your@email.com"
                          />
                          {focusedField === 'email' && (
                            <motion.div
                              layoutId="field-highlight"
                              className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-neutral-900 rounded-full"
                              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            />
                          )}
                        </div>
                      </motion.div>

                      {getQuote && (
                        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                          <PhoneInput
                            country={'in'}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                              name: 'phone',
                              required: true,
                              className: 'form-input-modern text-sm !pl-12',
                              placeholder: 'Enter Phone No.',
                            }}
                            containerClass="w-full"
                            buttonStyle={{
                              width: 42,
                              background: 'transparent',
                              border: 'none',
                              borderBottom: '1.5px solid #e5e5e5',
                              borderRadius: 0,
                            }}
                          />
                        </motion.div>
                      )}

                      {showProjectType && (
                        <motion.div custom={getQuote ? 3 : 2} variants={fieldVariants} initial="hidden" animate="visible">
                          <label htmlFor="popup-projectType" className="block text-xs font-medium text-neutral-400 mb-1.5">
                            Project Type
                          </label>
                          <div className="relative">
                            <select
                              id="popup-projectType"
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('projectType')}
                              onBlur={() => setFocusedField(null)}
                              className="form-input-modern text-sm bg-transparent cursor-pointer"
                            >
                              <option value="">Select a project type</option>
                              {projectTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            {focusedField === 'projectType' && (
                              <motion.div
                                layoutId="field-highlight"
                                className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-neutral-900 rounded-full"
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                              />
                            )}
                          </div>
                        </motion.div>
                      )}

                      <motion.div custom={getQuote && showProjectType ? 4 : getQuote || showProjectType ? 3 : 2} variants={fieldVariants} initial="hidden" animate="visible">
                        <label htmlFor="popup-message" className="block text-xs font-medium text-neutral-400 mb-1.5">
                          Message
                        </label>
                        <div className="relative">
                          <textarea
                            id="popup-message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            rows={2}
                            className="form-input-modern text-sm resize-none"
                            placeholder="Tell us about your project..."
                          ></textarea>
                          {focusedField === 'message' && (
                            <motion.div
                              layoutId="field-highlight"
                              className="absolute -left-3 top-4 w-1 h-5 bg-neutral-900 rounded-full"
                              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            />
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        custom={5}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02, gap: '12px' }}
                          whileTap={{ scale: 0.98 }}
                          className="shining-button rounded-full w-full py-3.5 px-5 bg-neutral-900 text-white font-heading font-semibold text-sm tracking-tight hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-all inline-flex items-center justify-center gap-2"
                        >
                          <Send size={15} />
                          Send Message
                          <ArrowRight size={15} />
                        </motion.button>
                      </motion.div>

                      <motion.p
                        custom={6}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center text-[0.7rem] text-neutral-400 pt-1"
                      >
                        Your information is secure and will never be shared.
                      </motion.p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ContactFormPopup;

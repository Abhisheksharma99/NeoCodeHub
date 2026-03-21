'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaAngular, FaDatabase, FaNode, FaPython, FaReact } from 'react-icons/fa';
import { Button } from './Button';
import contactUs from '../assets/contactUs.svg'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import MagneticButton from './MagneticButton';

const icons = [
  { name: 'React', src: <FaReact /> },
  { name: 'Node.js', src: <FaNode /> },
  { name: 'Angular', src: <FaAngular /> },
  { name: 'Python', src: <FaPython /> },
  { name: 'Database', src: <FaDatabase /> },
]

interface FormErrors {
  name: string,
  email: string,
  phone: string,
  message: string
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({
    name: '', email: '', phone: '', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeIcon, setActiveIcon] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prevIcon) => (prevIcon + 1) % icons.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const validateForm = () => {
    const formErrors: FormErrors = { name: '', email: '', phone: '', message: '' }
    if (!formData.name.trim()) formErrors.name = "Name is required"
    if (!formData.email.trim()) formErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid"
    if (!formData.phone.trim()) formErrors.phone = "Phone number is required"
    if (!formData.message.trim()) formErrors.message = "Message is required"
    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
    if (errors.name) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
    }
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, phone: value }))
    if (errors.phone) {
      setErrors(prevErrors => ({ ...prevErrors, phone: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          formData,
          'YOUR_USER_ID'
        )
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } catch (error) {
        console.error('Error sending email:', error)
        alert('Failed to send message. Please try again.')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <section id="Contact" className="relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      {/* Subtle parallax background orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neutral-200/[0.06] rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 mb-6 border border-neutral-200/80">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            Contact Us
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row items-start gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Left: Tech Icons */}
          <div className="w-full lg:w-48 shrink-0">
            <div className="flex lg:flex-col items-center justify-center gap-3">
              {icons.map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.4, scale: 0.85 }}
                  animate={activeIcon === index
                    ? { opacity: 1, scale: 1.1 }
                    : { opacity: 0.4, scale: 0.85 }
                  }
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <div className={`w-14 h-14 flex items-center justify-center text-3xl rounded-2xl transition-all duration-300 ${
                    activeIcon === index
                      ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                      : 'bg-white/60 text-neutral-400 border border-neutral-100'
                  }`}>
                    {icon.src}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center + Right: Info & Form */}
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            {/* Info - slide in from left with parallax */}
            <motion.div
              className="w-full md:w-1/2"
              style={{ perspective: 800 }}
              initial={{ opacity: 0, x: -40, rotateY: 5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            >
              <h3 className="text-2xl font-heading font-bold tracking-tight text-neutral-900 mb-3">
                Want to discuss your idea?
              </h3>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                Hi, We are excited to hear about your project.
              </p>
              <Image
                src={contactUs}
                alt="Contact Us"
                width={320}
                height={140}
                className="mb-6 drop-shadow-sm"
              />
              <p className="text-neutral-600 text-sm">
                Drop us a line and we will connect you to our experts.
              </p>
            </motion.div>

            {/* Form - slide in from right */}
            <motion.div
              className="w-full md:w-1/2"
              style={{ perspective: 800 }}
              initial={{ opacity: 0, x: 40, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
            >
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-lg font-heading font-bold tracking-tight text-neutral-900 mb-6">
                  We are here to help you.
                </h3>
                <AnimatePresence>
                  {!isSubmitted ? (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-5"
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
                          placeholder="Your Name*"
                          className={`form-input-modern ${errors.name ? 'border-b-red-400' : ''}`}
                          required
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address*"
                          className={`form-input-modern ${errors.email ? 'border-b-red-400' : ''}`}
                          required
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
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
                            placeholder: 'Enter Phone No.',
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
                      </div>
                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={2}
                          className={`form-input-modern resize-none ${errors.message ? 'border-b-red-400' : ''}`}
                          required
                        ></textarea>
                        {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                      </div>
                      <MagneticButton strength={0.15}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          text={isSubmitting ? 'Sending...' : 'Discuss Project'}
                          btnClass="text-sm"
                        />
                      </MagneticButton>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-neutral-900 font-heading font-bold text-lg mb-1">Thank you!</p>
                      <p className="text-neutral-600 text-sm">We will get back to you soon.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

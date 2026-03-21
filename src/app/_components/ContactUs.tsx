'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { FaAngular, FaDatabase, FaNode, FaPython, FaReact } from 'react-icons/fa';
import { Button } from './Button';
import contactUs from '../assets/contactUs.svg'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const RATE_LIMIT_MS = 60000 // 1 minute between submissions

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
  const [submitError, setSubmitError] = useState('')
  const [activeIcon, setActiveIcon] = useState(0)
  const lastSubmitTime = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prevIcon) => (prevIcon + 1) % icons.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const validateForm = useCallback(() => {
    const formErrors: FormErrors = { name: '', email: '', phone: '', message: '' }
    let hasError = false

    if (!formData.name.trim()) {
      formErrors.name = "Name is required"
      hasError = true
    } else if (formData.name.trim().length > 100) {
      formErrors.name = "Name is too long"
      hasError = true
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required"
      hasError = true
    } else if (!EMAIL_REGEX.test(formData.email)) {
      formErrors.email = "Please enter a valid email address"
      hasError = true
    }

    if (!formData.phone.trim()) {
      formErrors.phone = "Phone number is required"
      hasError = true
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      formErrors.phone = "Please enter a valid phone number"
      hasError = true
    }

    if (!formData.message.trim()) {
      formErrors.message = "Message is required"
      hasError = true
    } else if (formData.message.trim().length > 2000) {
      formErrors.message = "Message is too long (max 2000 characters)"
      hasError = true
    }

    setErrors(formErrors)
    return !hasError
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
    }
    setSubmitError('')
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, phone: value }))
    if (errors.phone) {
      setErrors(prevErrors => ({ ...prevErrors, phone: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    // Rate limiting
    const now = Date.now()
    if (now - lastSubmitTime.current < RATE_LIMIT_MS) {
      setSubmitError('Please wait a moment before submitting again.')
      return
    }

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
          formData,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''
        )
        lastSubmitTime.current = Date.now()
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } catch {
        setSubmitError('Failed to send message. Please try again later.')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <section id="Contact" className="relative" aria-labelledby="contact-heading">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-500 mb-6 border border-neutral-200/80">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-neutral-900">
            Contact Us
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 max-w-5xl mx-auto">
          {/* Left: Tech Icons */}
          <div className="w-full lg:w-48 shrink-0" aria-hidden="true">
            <div className="flex lg:flex-col items-center justify-center gap-3">
              {icons.map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.4, scale: 0.85 }}
                  animate={activeIcon === index
                    ? { opacity: 1, scale: 1.1 }
                    : { opacity: 0.4, scale: 0.85 }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Info */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-heading font-bold tracking-tight text-neutral-900 mb-3">
                Want to discuss your idea?
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Hi, We are excited to hear about your project.
              </p>
              <Image
                src={contactUs}
                alt="Contact Us"
                width={320}
                height={140}
                className="mb-6 drop-shadow-sm"
              />
              <p className="text-neutral-400 text-sm">
                Drop us a line and we will connect you to our experts.
              </p>
            </div>

            {/* Form */}
            <div className="w-full md:w-1/2">
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
                      noValidate
                    >
                      <div>
                        <label htmlFor="contact-name" className="sr-only">Your Name</label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name*"
                          maxLength={100}
                          className={`form-input-modern ${errors.name ? 'border-b-red-400' : ''}`}
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="text-red-400 text-xs mt-1.5" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="sr-only">Email Address</label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address*"
                          className={`form-input-modern ${errors.email ? 'border-b-red-400' : ''}`}
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="text-red-400 text-xs mt-1.5" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                        <PhoneInput
                          country={'in'}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          inputProps={{
                            id: 'contact-phone',
                            name: 'phone',
                            'aria-required': 'true',
                            'aria-label': 'Phone number',
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
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1.5" role="alert">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="sr-only">Message</label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={2}
                          maxLength={2000}
                          className={`form-input-modern resize-none ${errors.message ? 'border-b-red-400' : ''}`}
                          aria-required="true"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        ></textarea>
                        {errors.message && (
                          <p id="contact-message-error" className="text-red-400 text-xs mt-1.5" role="alert">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {submitError && (
                        <p className="text-red-400 text-xs" role="alert">{submitError}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        text={isSubmitting ? 'Sending...' : 'Discuss Project'}
                        btnClass="text-sm"
                        ariaLabel={isSubmitting ? 'Sending your message' : 'Submit contact form'}
                      />
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                      role="status"
                    >
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-neutral-900 font-heading font-bold text-lg mb-1">Thank you!</p>
                      <p className="text-neutral-400 text-sm">We will get back to you soon.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

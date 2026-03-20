'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image';
import Discuss from '../assets/Discuss.svg';
import Invoice from "../assets/Invoice-bro.svg"
import PhoneInput from 'react-phone-input-2';
import emailjs from '@emailjs/browser'

interface ContactFormPopupProps {
  headerText: string,
  showProjectType?: boolean,
  getQuote?: boolean,
  isOpen: boolean,
  onClose: () => void
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ headerText, getQuote = false, showProjectType = false, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    phone: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

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
    setErrors({})
    setSubmitError('')
    setIsSubmitted(false)
  }

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

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    else if (formData.name.trim().length > 100) newErrors.name = 'Name is too long'

    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Please enter a valid email'

    if (getQuote && !formData.phone.trim()) newErrors.phone = 'Phone number is required'

    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length > 2000) newErrors.message = 'Message is too long'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, phone: value }))
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validate()) return

    setIsSubmitting(true)
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''
      )
      setIsSubmitted(true)
    } catch {
      setSubmitError('Failed to send. Please try again later.')
    }
    setIsSubmitting(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-popup-title"
        >
          <motion.div
            ref={formRef}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 transition-all z-10"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-neutral-50">
              <Image
                src={getQuote ? Invoice : Discuss}
                alt={getQuote ? "Get a quote illustration" : "Contact discussion illustration"}
                fill
                style={{ objectFit: 'cover' }}
                className="absolute inset-0 p-4"
              />
            </div>

            {/* Form Side */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h2 id="contact-popup-title" className="text-xl md:text-2xl font-heading font-bold mb-6 text-neutral-900 tracking-tight">
                {headerText}
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="popup-name" className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      id="popup-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      className={`form-input-modern text-sm ${errors.name ? 'border-b-red-400' : ''}`}
                      placeholder="Your Name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'popup-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="popup-name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="popup-email" className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="popup-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input-modern text-sm ${errors.email ? 'border-b-red-400' : ''}`}
                      placeholder="your@email.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'popup-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="popup-email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {getQuote && (
                    <div>
                      <label htmlFor="popup-phone" className="sr-only">Phone Number</label>
                      <PhoneInput
                        country={'in'}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                          id: 'popup-phone',
                          name: 'phone',
                          'aria-required': 'true',
                          'aria-label': 'Phone number',
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
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>
                      )}
                    </div>
                  )}

                  {showProjectType && (
                    <div>
                      <label htmlFor="popup-projectType" className="block text-xs font-medium text-neutral-400 mb-1.5">
                        Project Type
                      </label>
                      <select
                        id="popup-projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="form-input-modern text-sm bg-transparent cursor-pointer"
                      >
                        <option value="">Select a project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="popup-message" className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="popup-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      maxLength={2000}
                      className={`form-input-modern text-sm resize-none ${errors.message ? 'border-b-red-400' : ''}`}
                      placeholder="I want to discuss..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'popup-message-error' : undefined}
                    ></textarea>
                    {errors.message && (
                      <p id="popup-message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-red-400 text-xs" role="alert">{submitError}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className={`shining-button rounded-full w-full py-3 px-4 font-heading font-semibold text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-all ${
                      isSubmitting
                        ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactFormPopup;

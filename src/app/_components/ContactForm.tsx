'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ headerText, getQuote = false, showProjectType = false, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    phone: ''
  })

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
    onClose()
    resetForm()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm"
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
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-neutral-50">
              <Image
                src={getQuote ? Invoice : Discuss}
                alt="Contact Us"
                fill
                style={{ objectFit: 'cover' }}
                className="absolute inset-0 p-4"
              />
            </div>

            {/* Form Side */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 text-neutral-900 tracking-tight">
                {headerText}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input-modern text-sm"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input-modern text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                {getQuote && (
                  <div>
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
                  </div>
                )}

                {showProjectType && (
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="projectType"
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
                  <label htmlFor="message" className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="form-input-modern text-sm resize-none"
                    placeholder="I want to discuss..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="shining-button rounded-full w-full py-3 px-4 bg-neutral-900 text-white font-heading font-semibold text-sm tracking-tight hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactFormPopup;

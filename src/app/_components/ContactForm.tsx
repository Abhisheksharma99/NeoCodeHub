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

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ headerText, getQuote= false, showProjectType = false, isOpen, onClose }) => {
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
                    className={`fixed inset-0 z-50 md:mt-0 ml-0 shadow-2xl flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm ${showProjectType ? 'mt-64 md:mt-0' : ''}`}
                >
                    <motion.div
                        ref={formRef}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="relative w-full max-w-4xl bg-white md:mt-4 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-full md:w-1/2 h-48 md:h-auto relative">
                            <Image
                                src={getQuote ? Invoice : Discuss}
                                alt="Contact Us"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="absolute inset-0"
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black">
                                {headerText}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-b border-black focus:outline-none focus:shadow-lg focus:border-black focus:border-b-2 transition-all text-sm"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-b border-black focus:outline-none focus:shadow-lg focus:border-black focus:border-b-2 transition-all text-sm"
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
                                            className: `outline-none focus:shadow-lg border-black focus:border-b-2 focus:border-black w-full p-2 border-b`,
                                            placeholder: 'Enter Phone No.',
                                        }}
                                        containerClass="w-full"
                                        buttonStyle={{ width: 45, borderBottom: '1px solid black', background: 'white' }}
                                    />
                                </div>
                                )}
                                {showProjectType && (
                                    <div>
                                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Type
                                        </label>
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border-b border-black focus:border-b-2 focus:shadow-lg bg-white transition-all text-sm"
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
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={2}
                                        className="w-full px-3 py-2 border-b border-black focus:outline-none focus:shadow-lg focus:border-black focus:border-b-2 transition-all resize-none text-sm"
                                        placeholder="I want to discuss..."
                                    ></textarea>
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="shining-button rounded-full w-full py-2 px-4 bg-black text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all text-sm"
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

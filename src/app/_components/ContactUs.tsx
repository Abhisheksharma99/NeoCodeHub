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
        <div id='Contact' className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Contact Us</h1>
            <div className="flex flex-col lg:flex-row items-start">
                <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                    <div className="flex lg:flex-col items-center justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4 group relative">
                        {icons.map((icon, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                animate={activeIcon === index ? { opacity: 1, scale: 1.1 } : { opacity: 0.5, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="transition-colors duration-300 ease-in-out h-16">
                                    <div className="w-12 h-12 flex items-center justify-center" style={{ fontSize: '50px' }}>
                                        <div className="group-hover:bg-black group-hover:rounded-md transition duration-300 ease-in-out p-2">
                                            <div className="group-hover:filter group-hover:invert">
                                                {icon.src}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-3/4">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
                            <h2 className="text-3xl font-bold mb-4">Want to discuss your idea?</h2>
                            <p className="mb-4">Hi, We are excited to hear about your project.</p>
                            <Image src={contactUs} alt="Contact Us" width={350} height={150} className="mb-4" />
                            <p>Drop us a line and we will connect you to our experts.</p>
                        </div>
                        <div className="w-full bg-white shadow-2xl p-6 md:w-1/2 md:pl-4">
                            <h3 className="text-xl font-bold mb-4">We are here to help you.</h3>
                            <AnimatePresence>
                                {!isSubmitted ? (
                                    <motion.form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
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
                                                className={`outline-none focus:shadow-lg border-black focus:border-b-2 focus:border-black w-full p-2 border-b ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email Address*"
                                                className={`outline-none focus:shadow-lg focus:border-b-2 focus:border-black w-full p-2 border-b border-black ${errors.email ? 'border-red-500' : 'border-black-300'}`}
                                                required
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
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
                                        <div>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="How we can help you?"
                                                rows={2}
                                                className={`outline-none focus:shadow-lg border-black focus:border-b-2 focus:border-black w-full p-2 border-b ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                                required
                                            ></textarea>
                                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            text={isSubmitting ? 'Sending...' : 'Discuss Project'}
                                            btnClass="mb-4 font-medium text-sm px-4 py-2 rounded-full"
                                        />
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center"
                                    >
                                        <p className="text-green-600 font-bold text-xl mb-4">Thank you for your message!</p>
                                        <p>We will get back to you soon.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
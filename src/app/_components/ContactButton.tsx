'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactFormPopup from './ContactForm';

interface ContactButtonProps {
  btnText: string;
  headerText: string;
  showProjectType?: boolean;
  getQuote?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({ btnText, headerText, showProjectType, getQuote }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenPopup}
        className="shining-button px-6 py-3 bg-black text-white font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-opacity-50 transition-all"
      >
        {btnText}
      </motion.button>
      <ContactFormPopup 
        isOpen={isPopupOpen} 
        headerText={headerText} 
        showProjectType={showProjectType} 
        getQuote={getQuote}
        onClose={handleClosePopup} 
      />
    </>
  );
};

export default ContactButton;

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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleOpenPopup}
        className="shining-button px-6 py-3 bg-neutral-900 text-white font-heading font-semibold text-sm tracking-tight rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-all hover:bg-neutral-800"
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

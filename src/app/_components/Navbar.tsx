'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TsiLogo from '../assets/TSILogo.png';
import dynamic from 'next/dynamic'; // Lazy load ContactButton

// Lazy load ContactButton to improve performance on mobile
const ContactButton = dynamic(() => import('./ContactButton'));

const NavbarAndHero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  // Resize handler for better performance
  const handleResize = useCallback(() => {
    const isMobileView = window.innerWidth < 768;
    setIsMobile(isMobileView);
    if (!isMobileView) setIsOpen(true); // Ensure the menu stays open on desktop
  }, []);

  useEffect(() => {
    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        if (isMobile) setIsOpen(false);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  
  const handleLinkClick = useCallback(
    (item: string) => {
      setActiveLink(item);
      if (isMobile) setIsOpen(false);
    },
    [isMobile]
  );

  const menuItems = useMemo(() => ['Home', 'Services', 'Tech', 'About', 'Contact'], []);

  const menuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20, backgroundColor: 'rgb(229, 231, 235)' },
  };

  return (
    <div>
      <nav
        className="bg-white fixed w-full z-20 top-0 border-b border-gray-200 transition-all duration-300"
        ref={navbarRef}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={TsiLogo}
              alt="NeoCodeHub Logo"
              height={180}
              width={300}
              priority // Ensure it loads first
              quality={75}
            />
          </Link>

          {isMobile && (
            <motion.button
              onClick={toggleMenu}
              className="cursor-pointer p-2 w-10 h-10 flex justify-center items-center rounded-lg hover:bg-gray-100 transition-all duration-300"
              animate={isOpen ? 'open' : 'closed'}
              variants={iconVariants}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                  variants={{
                    closed: { d: 'M4 6h16M4 12h16M4 18h16' },
                    open: { d: 'M6 18L18 6M6 6l12 12' },
                  }}
                />
              </svg>
            </motion.button>
          )}

          <div className="hidden md:flex md:order-2 space-x-3 rtl:space-x-reverse">
            <ContactButton
              showProjectType={true}
              headerText="How can we help you with your project?"
              btnText="Discuss Project"
            />
          </div>

          <AnimatePresence>
            {(isOpen || !isMobile) && (
              <motion.div
                className={`${
                  isMobile ? 'flex flex-col mt-4' : 'flex'
                } space-y-2 md:space-y-0 md:space-x-8 md:flex-row md:items-center md:mt-0 w-full md:w-auto`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={isMobile ? menuVariants : {}}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ul
                  className={`flex ${
                    isMobile ? 'flex-col' : 'flex-row'
                  } items-center text-lg space-y-2 md:space-y-0 text-xl md:space-x-8`}
                >
                  {menuItems.map((item) => (
                    <motion.li
                      key={item}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={`#${item}`}
                        className={`block py-2 px-3 text-gray-900 rounded font-bold hover:bg-gray-100 transition-all ${
                          activeLink === item ? 'bg-gray-200' : ''
                        }`}
                        onClick={() => handleLinkClick(item)}
                        aria-current={activeLink === item ? 'page' : undefined}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {isMobile && (
                  <div className="flex justify-center mt-2">
                    <ContactButton
                      headerText="How can we help you with your project?"
                      showProjectType={true}
                      btnText="Discuss Project"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAndHero;

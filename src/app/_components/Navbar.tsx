'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TsiLogo from '../assets/TSILogo.png';
import dynamic from 'next/dynamic';

const ContactButton = dynamic(() => import('./ContactButton'));

const NavbarAndHero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const handleResize = useCallback(() => {
    const isMobileView = window.innerWidth < 768;
    setIsMobile(isMobileView);
    if (!isMobileView) setIsOpen(true);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const menuItems = useMemo(() => [
    { label: 'Home', href: '#Home' },
    { label: 'Services', href: '#Services' },
    { label: 'Tech', href: '#Tech' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '#About' },
    { label: 'Contact', href: '#Contact' },
  ], []);

  const menuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <div>
      <nav
        className={`glass-nav fixed w-full z-20 top-0 transition-all duration-500 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        ref={navbarRef}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-3">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={TsiLogo}
              alt="NeoCodeHub Logo"
              height={140}
              width={240}
              priority
              quality={75}
            />
          </Link>

          {isMobile && (
            <motion.button
              onClick={toggleMenu}
              className="cursor-pointer p-2 w-10 h-10 flex justify-center items-center rounded-xl hover:bg-neutral-100 transition-all duration-300"
              animate={isOpen ? 'open' : 'closed'}
              variants={iconVariants}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5 text-neutral-700"
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
                  isMobile ? 'flex flex-col mt-4 pb-4' : 'flex'
                } space-y-2 md:space-y-0 md:space-x-2 md:flex-row md:items-center md:mt-0 w-full md:w-auto`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={isMobile ? menuVariants : {}}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ul
                  className={`flex ${
                    isMobile ? 'flex-col' : 'flex-row'
                  } items-center space-y-1 md:space-y-0 md:space-x-1`}
                >
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`block py-2 px-4 text-[0.9rem] font-heading font-medium tracking-tight rounded-lg transition-all duration-200 ${
                          activeLink === item.label
                            ? 'text-neutral-900 bg-neutral-100'
                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                        }`}
                        onClick={() => handleLinkClick(item.label)}
                        aria-current={activeLink === item.label ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {isMobile && (
                  <div className="flex justify-center mt-3 pt-3 border-t border-neutral-100">
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

import dynamic from 'next/dynamic';
import NavbarAndHero from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import ThemeToggle from "./_components/ThemeToggle";

// Lazy load below-fold components
const Service = dynamic(() => import("./_components/Services"));
const TechStack = dynamic(() => import("./_components/TechStack"));
const ProcessSection = dynamic(() => import("./_components/ProcessSection"));
const AboutUs = dynamic(() => import("./_components/AboutUs"));
const TestimonialsSection = dynamic(() => import("./_components/TestimonialsSection"));
const ContactUs = dynamic(() => import("./_components/ContactUs"));
const Footer = dynamic(() => import("./_components/Footer"));

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <NavbarAndHero />
      <HeroSection />
      <StatsSection />
      <Service />
      <div className="section-divider" />
      <TechStack />
      <div className="section-divider" />
      <ProcessSection />
      <div className="section-divider" />
      <AboutUs />
      <div className="section-divider" />
      <TestimonialsSection />
      <div className="section-divider" />
      <ContactUs />
      <Footer />
      <ThemeToggle />
    </main>
  );
}

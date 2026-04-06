import dynamic from 'next/dynamic';
import NavbarAndHero from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import ProcessSection from "./_components/ProcessSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import ScrollProgress from "./_components/ScrollProgress";
import CursorGlow from "./_components/CursorGlow";
import PageIntro from "./_components/PageIntro";
import ParallaxOrbs from "./_components/ParallaxOrbs";
import ScrollDivider from "./_components/ScrollDivider";
import ScrollIndicator from "./_components/ScrollIndicator";
import ThemeToggle from "./_components/ThemeToggle";

// Lazy load below-fold components
const Service = dynamic(() => import("./_components/Services"));
const TechStack = dynamic(() => import("./_components/TechStack"));
const AboutUs = dynamic(() => import("./_components/AboutUs"));
const ContactUs = dynamic(() => import("./_components/ContactUs"));
const Footer = dynamic(() => import("./_components/Footer"));

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <PageIntro />
      <ParallaxOrbs />
      <ScrollProgress />
      <CursorGlow />
      <ScrollIndicator />
      <NavbarAndHero />
      <HeroSection />
      <StatsSection />
      <Service />
      <ScrollDivider direction="left" />
      <TechStack />
      <ScrollDivider direction="right" />
      <ProcessSection />
      <ScrollDivider />
      <AboutUs />
      <ScrollDivider direction="left" />
      <TestimonialsSection />
      <ScrollDivider direction="right" />
      <ContactUs />
      <Footer />
      <ThemeToggle />
    </main>
  );
}

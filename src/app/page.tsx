import NavbarAndHero from "./_components/Navbar";
import AboutUs from "./_components/AboutUs";
import ContactUs from "./_components/ContactUs";
import Footer from "./_components/Footer";
import Service from "./_components/Services";
import TechStack from "./_components/TechStack";
import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import ProcessSection from "./_components/ProcessSection";
import TestimonialsSection from "./_components/TestimonialsSection";

export default function Home() {
  return (
    <main className="relative">
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
    </main>
  );
}

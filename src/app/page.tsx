
import NavbarAndHero from './_components/Navbar'
import AboutUs from './_components/AboutUs';
import ContactUs from './_components/ContactUs';
import Footer from './_components/Footer';
import Service from './_components/Services';
import TechStack from './_components/TechStack';
import HeroSection from './_components/HeroSection';
import "./globals.css";
export default function Home() {
  return (
    <>
   <NavbarAndHero />
   <HeroSection />
   <Service />
   <TechStack />
   <AboutUs />
   <ContactUs />
   <Footer />
   </>
  );
}

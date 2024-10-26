import { Button } from "./Button";
import Image from "next/image";
import HeroImage from "../assets/HeroImage.svg";
import { memo } from "react";

const HeroSection = () => {
  return (
    // Hero Section
    <main className="md:pt-8 pt-16">
      <div
        id="Home"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center"
      >
        {/* Sliding Text */}
        <div className="md:w-1/2 mb-8 md:mb-0 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transforming Ideas into Digital Reality
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your Trusted Partner in Digital Development<br />
            Elevating Businesses with Cutting-Edge Solutions
          </p>
          <Button
            text="See Our Work ➔"
            btnClass="px-6 py-3 text-lg font-semibold"
          />
        </div>

        {/* Sliding Image */}
        <div className="w-full md:w-1/2 animate-fadeInUp">
          <Image
            src={HeroImage}
            alt="Digital Development Illustration"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            quality={75}
            loading="lazy"  // Lazy load the image
          />
        </div>
      </div>
    </main>
  );
};

// Wrap the HeroSection component with memo for optimization
const MemoizedHeroSection = memo(HeroSection);
MemoizedHeroSection.displayName = "HeroSection";

export default MemoizedHeroSection;

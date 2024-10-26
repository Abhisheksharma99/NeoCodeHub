import MobileImage from "../assets/Mobile App.png";
import AiImage from "../assets/AI.png";
import WebImage from "../assets/Web Design.png";
import Expertise from "../assets/Expertise.svg";
import Innovation from "../assets/Innovation.svg";
import Customer from "../assets/Customer relationship management-bro.svg";
import { Card, ServiceData } from './Card';



const services: ServiceData[] = [
  {
    title: "Web Development",
    imageUrl: WebImage,
    description:
      "Building modern and responsive websites with cutting-edge technology to enhance your online presence.",
  },
  {
    title: "AI & Machine Learning",
    imageUrl: AiImage,
    description:
      "Leveraging artificial intelligence and machine learning to create innovative solutions that transform data into actionable insights.",
  },
  {
    title: "Mobile App Development",
    imageUrl: MobileImage,
    description:
      "Designing user-friendly mobile applications that provide seamless experiences on iOS and Android platforms.",
  },
];

const chooseUs: ServiceData[] = [
  {
    title: "Expertise",
    imageUrl: Expertise,
    description:
      "Our team is composed of highly skilled professionals with extensive industry experience, bringing together a wealth of knowledge accumulated over the years.",
  },
  {
    title: "Innovation",
    imageUrl: Innovation,
    description:
      "We are committed to staying at the forefront of technology, constantly exploring new trends, tools, and methodologies to deliver innovative, future-ready solutions.",
  },
  {
    title: "Customer-Centric",
    imageUrl: Customer,
    description:
      "Your success is at the heart of everything we do. We believe that every client is unique, and we are dedicated to providing personalized solutions tailored to meet your specific needs and goals.",
  },
];

export default function Services() {
  return (
    <div id="Services" className="text-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Our Services</h1>
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-center mb-4">
            At TechStackInfo, we offer a wide range of cutting-edge services to meet your digital needs. Our expert team is dedicated to delivering high-quality solutions tailored to your business.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          {services.map((service, index) => (
            <Card key={index} {...service} />
          ))}
        </div>  
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="flex flex-wrap -mx-4">
            {chooseUs.map((service, index) => (
              <Card key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import TSILogo from "../assets/TSILogo.png";
import ContactButton from "./ContactButton";
import Image from "next/image";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaAddressCard,
  FaAddressBook,
  FaQuestionCircle,
} from "react-icons/fa";

const Footer = () => {
  const currentDate = new Date();

  return (
    <div className="">
      <footer className="text-dark">
        <hr />
        <section className="bg-dark ms-16 me-12 p-4 mb-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-dark mb-4 md:mb-0">
              <span className="font-bold text-xl">
                Get connected with us on social networks:
              </span>
            </div>
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl text-dark" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-2xl text-dark" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl text-dark" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-2xl text-dark" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-2xl text-dark" />
              </a>
              <a
                href="//api.whatsapp.com/send?phone=917015445629&text=Hi!, I have a query regarding"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-2xl text-dark" />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-3">
            <div className="text-dark font-bold text-xl">
              Planning your next project?
            </div>
            <div className="mt-4">
            <ContactButton getQuote={true} headerText="Get a free quote for your project today!!" btnText={'Get a Free Quote'} />
            </div>
          </div>
        </section>

        <section className="flex container">
          <div className="flex flex-col md:flex-row justify-center text-left">
            <div className="w-full md:w-1/3 lg:w-1/4 mx-auto md:mt-4">
              <a href="/">
                <Image
                  src={TSILogo}
                  width={300}
                  height={120}
                  alt="logo"
                  className="mx-auto"
                />
              </a>

              <hr className="my-4 border-gray-300" />
              <p className="text-center">
                NeoCodeHub is a leading software and website development
                company dedicated to transforming ideas into innovative digital
                solutions. With a commitment to excellence and a passion for
                technology, we specialize in crafting tailored software
                applications and websites that empower businesses to thrive in
                the digital age.
              </p>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/4 mx-auto mt-4">
              <h6 className="text-uppercase font-bold text-xl mb-4 ms-36 md:ms-32 text-center corner-brackets">Useful Links</h6>
              <hr className="mb-4 border-gray-300" />
              <div className="text-center">
                <p className="flex items-center justify-center mb-2">
                  <FaAddressCard className="mr-2" />
                  <a href="/aboutus" className="text-dark font-bold">
                    About Us
                  </a>
                </p>
                <p className="flex items-center justify-center mb-2">
                  <FaAddressBook className="mr-2" />
                  <a href="/contactus" className="text-dark font-bold">
                    Contact Us
                  </a>
                </p>
                <p className="flex items-center justify-center mb-2">
                  <FaQuestionCircle className="mr-2" />
                  <a href="tel:+917019797893" className="text-dark font-bold">
                    Query?
                  </a>
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/4 mx-auto mt-4">
              <h6 className="text-uppercase font-bold text-xl mb-4 ms-32 md:ms-20 text-center corner-brackets">Contact & Address</h6>
              <hr className="mb-4 border-gray-300" />
              <p className="flex items-center justify-center mb-2">
                <FaHome className="mr-2" />
                <span className="font-bold">Faridabad, Haryana, India</span>
              </p>
              <p className="flex items-center justify-center mb-2">
                <FaEnvelope className="mr-2" />
                <a
                  className="text-decoration-none font-bold text-dark"
                  href="mailto:sales@NeoCodeHub.com"
                >
                  sales@NeoCodeHub.com
                </a>
              </p>
              <p className="flex items-center justify-center mb-2">
                <FaEnvelope className="mr-2" />
                <a
                  className="text-decoration-none font-bold text-dark"
                  href="mailto:info@NeoCodeHub.com"
                >
                  info@NeoCodeHub.com
                </a>
              </p>
              <p className="flex items-center justify-center mb-2">
                <FaPhone className="mr-2" />
                <a
                  className="text-decoration-none font-bold text-dark"
                  href="tel:+917015445629"
                >
                  +91 7015445629
                </a>
              </p>
            </div>
          </div>
        </section>
        <div className="text-center text-dark py-2 font-bold">
          Copyright © 2020 - {currentDate.getFullYear()}{" "}
          <a
            className="text-dark font-bold"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.NeoCodeHub.in/"
          >
            NeoCodeHub
          </a>
        </div>
        <div className="text-center pb-3 font-bold">
          Designed & Developed by{" "}
          <a
            className="text-dark font-bold"
            target="_blank"
            rel="noopener noreferrer"
            href="https://abhishek-sharma-portfolio.netlify.app/"
          >
            Abhishek Sharma
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

'use client'
import React, { useState } from "react";
import {
    FaReact, FaNodeJs, FaAngular, FaPython, FaPhp, FaSwift, 
    FaLaravel, FaMagento, FaShopify, FaJava
} from "react-icons/fa";
import { TbBrandKotlin } from "react-icons/tb";
import { 
    SiNextdotjs, SiDocker, SiFirebase, SiMongodb, SiTypescript, 
    SiGraphql, SiRedux, SiTailwindcss, SiPostgresql, SiAmazon, 
    SiJenkins, SiElasticsearch, SiSass 
} from 'react-icons/si';
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import tooltip CSS

const techs = [
    { icon: <FaReact />, name: "React", description: "A JavaScript library for building UIs." },
    { icon: <FaNodeJs />, name: "Node JS", description: "JavaScript runtime for server-side development." },
    { icon: <FaAngular />, name: "Angular", description: "A TypeScript-based front-end framework." },
    { icon: <FaPython />, name: "Python", description: "A versatile language for web and AI development." },
    { icon: <FaPhp />, name: "PHP", description: "A popular backend language for web development." },
    { icon: <FaSwift />, name: "Swift", description: "Apple's language for iOS app development." },
    { icon: <FaLaravel />, name: "Laravel", description: "A PHP framework for web applications." },
    { icon: <FaMagento />, name: "Magento", description: "E-commerce platform for online stores." },
    { icon: <FaShopify />, name: "Shopify", description: "Platform for building online stores." },
    { icon: <TbBrandKotlin />, name: "Kotlin", description: "A modern language for Android development." },
    { icon: <FaJava />, name: "Java", description: "A general-purpose programming language." },
    { icon: <SiNextdotjs />, name: "Next JS", description: "React framework for server-side rendering." },
    { icon: <SiDocker />, name: "Docker", description: "Containerization platform." },
    { icon: <SiMongodb />, name: "MongoDB", description: "NoSQL database for modern applications." },
    { icon: <SiTypescript />, name: "TypeScript", description: "A typed superset of JavaScript." },
    { icon: <SiGraphql />, name: "GraphQL", description: "A query language for APIs." },
    { icon: <SiRedux />, name: "Redux", description: "State management library for JavaScript apps." },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", description: "Utility-first CSS framework." },
    { icon: <SiPostgresql />, name: "PostgreSQL", description: "Relational database system." },
    { icon: <SiFirebase />, name: "Firebase", description: "Backend-as-a-Service platform by Google." },
    { icon: <SiAmazon />, name: "AWS", description: "Amazon Web Services cloud platform." },
    { icon: <SiJenkins />, name: "Jenkins", description: "Automation server for CI/CD pipelines." },
    { icon: <SiElasticsearch />, name: "Elasticsearch", description: "Search engine for large datasets." },
    { icon: <SiSass />, name: "SASS", description: "CSS preprocessor for easier styling." }
];

const TechStack = () => {
    const [search, setSearch] = useState("");

    const filteredTechs = techs.filter(tech =>
        tech.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div id="Tech" className="container mx-auto my-5 text-black">
            <div className="text-center mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                    Our Technology Stack
                </h1>
                <div className="max-w-3xl mx-auto mb-8">
                    <p className="text-lg text-center mb-4">
                        We are adept at all possible tech stacks for both web and mobile,
                        as well as a wide range of platforms, languages, and database systems.
                    </p>
                    <input 
                        type="text" 
                        placeholder="Search technology..." 
                        className="border-b bg-transparent mx-auto text-center focus:border-black focus:border-b-2 focus:shadow-xl p-2 focus:outline-none w-full md:w-1/2 mx-auto" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {filteredTechs.map((tech, index) => (
                    <motion.div 
                        key={index} 
                        className="text-center mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="mb-2 text-5xl" data-tooltip-id={`tooltip-${index}`}>
                            {tech.icon}
                        </div>
                        <p>{tech.name}</p>
                        <ReactTooltip 
                            id={`tooltip-${index}`} 
                            place="top" 
                        >
                            {tech.description}
                        </ReactTooltip>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TechStack;

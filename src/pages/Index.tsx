import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import SpaceInvaders from "../components/SpaceInvaders";
import Contact from "../components/Contact";
import { useEffect, useState } from "react";
import TechStack from "@/components/TechStack";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Pranav VK | Senior Software Engineer";
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  
  const [showSpaceInvaders, setShowSpaceInvaders] = useState(false);
  
  const handleToggleComponent = () => {
    setShowSpaceInvaders(!showSpaceInvaders);
  };
  
  return (
    <Layout>
      <Hero />
      <div id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-gradient">Me</span></h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/80 text-lg leading-relaxed mb-6 animate-fade-in">
              I'm a Senior Software Engineer with over 5 years of experience specializing in modern web technologies. My expertise lies in creating responsive, interactive, and visually captivating applications using React, JavaScript, and 3D technologies like Three.js.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-8 animate-[fade-in_0.8s_ease-out_0.2s_backwards]">
              I'm passionate about pushing the boundaries of what's possible on the web, creating seamless user experiences, and solving complex technical challenges. When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and mentoring aspiring developers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 animate-[fade-in_0.8s_ease-out_0.4s_backwards]">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl font-bold text-futuristic-accent mb-2">5+</div>
                <div className="text-white text-sm">Years of Experience</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl font-bold text-futuristic-accent mb-2">20+</div>
                <div className="text-white text-sm">Projects Completed</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl font-bold text-futuristic-accent mb-2">15+</div>
                <div className="text-white text-sm">Technologies Mastered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Skills />
      <Experience />
      
      {/* Toggle Switch */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="text-gradient">Explore</span> More
          </h2>
          
          <div className="flex items-center gap-4 mb-8">
            <span className={`text-lg font-medium ${!showSpaceInvaders ? 'text-futuristic-accent' : 'text-white/70'}`}>
              Tech Stack
            </span>
            
            {/* Custom Toggle Switch */}
            <div 
              className="w-16 h-8 flex items-center bg-white/10 rounded-full p-1 cursor-pointer border border-white/20"
              onClick={handleToggleComponent}
            >
              <div 
                className={`bg-gradient-to-r from-purple-500 to-pink-500 w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                  showSpaceInvaders ? 'translate-x-8' : 'translate-x-0'
                }`}
              ></div>
            </div>
            
            <span className={`text-lg font-medium ${showSpaceInvaders ? 'text-futuristic-accent' : 'text-white/70'}`}>
              Space Invaders
            </span>
          </div>
          
          <div className="w-full">
            <AnimatePresence mode="wait">
              {showSpaceInvaders ? (
                <motion.div
                  key="spaceInvaders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <SpaceInvaders />
                </motion.div>
              ) : (
                <motion.div
                  key="techStack"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <TechStack />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <Projects />
      <Contact />
    </Layout>
  );
};

export default Index;
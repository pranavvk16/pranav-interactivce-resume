import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, PhoneCall, Terminal, Code, Layers, Zap, BrainCircuit, MessageSquareCode, Network } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden" >
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-futuristic-accent/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-futuristic-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 animate-[fade-in-right_0.8s_ease-out]">
            <div className="mb-4 flex items-center">
              <div className="mr-4 relative">
                <Avatar className="h-16 w-16 border-2 border-futuristic-accent">
                  <AvatarImage src="https://github.com/pranavvk16.png" alt="Pranav VK" />
                  <AvatarFallback className="bg-futuristic-dark">
                    <div className="flex items-center justify-center h-full">
                      <Terminal size={24} className="text-futuristic-accent" />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-futuristic-dark flex items-center justify-center">
                  <span className="text-xs text-white font-bold">5+</span>
                </div>
              </div>
              <div>
                <div className="inline-block px-3 py-1 text-xs rounded-full bg-futuristic-accent/20 text-futuristic-accent mb-2">
                  AI & Software Engineer
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Pranav <span className="text-gradient">VK</span>
                </h1>
              </div>
            </div>
            <p className="text-lg text-white/80 mb-6 max-w-lg">
              5+ years of experience building intelligent applications with Large Language Models, Transformer Networks, and cutting-edge AI/ML technologies.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#contact" className="futuristic-button group">
                Contact Me
                <span className="absolute inset-0 w-full h-full overflow-hidden rounded-md">
                  <span className="absolute inset-0 w-1/4 h-full bg-white/10 transform -skew-x-20 translate-x-[-150%] group-hover:animate-[shine_1.5s_ease-in-out]"></span>
                </span>
              </a>
              <a href="#projects" className="border border-futuristic-accent/30 bg-transparent hover:bg-futuristic-accent/10 text-white font-medium py-2 px-6 rounded-md transition-all duration-300">
                View Projects
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/in/pranav-vk-6b6033165" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/pranavvk16" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="mailto:pranavvk16@gmail.com" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all">
                <Mail size={20} />
              </a>
              <a href="tel:+917907210906" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all">
                <PhoneCall size={20} />
              </a>
            </div>
          </div>

          {/* Right column - Interactive AI Visualizations */}
          <div className="w-full md:w-1/2 animate-[fade-in-left_0.8s_ease-out]">
            <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center mb-8 perspective">

              {/* AI Network Visualization (Replaces Cube) */}
              <div
                className="ai-network"
                style={{
                  transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
                }}
              >
                <div className="network-layer" style={{ transform: 'translateY(-130px)' }}>
                  <BrainCircuit size={48} className="text-futuristic-accent" />
                  <span className="text-white text-sm mt-2">LLMs</span>
                </div>
                <div className="network-layer" style={{ transform: 'translateY(90px)' }}>
                  <MessageSquareCode size={48} className="text-futuristic-blue" />
                  <span className="text-white text-sm mt-2">Transformers</span>
                </div>
                <div className="network-layer" style={{ transform: 'translateX(110px)' }}>
                  <Network size={48} className="text-purple-500" />
                  <span className="text-white text-sm mt-2">AI Pipelines</span>
                </div>
              </div>


              {/* Circular skill rings - repurposed for AI concepts */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                <div className="skill-ring-container">
                  <div className="skill-ring ring-1" style={{ animationDuration: '70s' }}></div>
                  <div className="skill-ring ring-2" style={{ animationDuration: '50s' }}></div>
                  <div className="skill-ring ring-3" style={{ animationDuration: '290s' }}></div>
                </div>
              </div>

              {/* Floating tech bubbles - repurposed for specific AI tools or concepts */}
              <div
                className="absolute p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-slow"
                style={{
                  top: '15%',
                  right: '30%',
                  transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y}px)`
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="currentColor" />
                </svg>
              </div>

              <div
                className="absolute p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-medium"
                style={{
                  bottom: '20%',
                  left: '27%',
                  transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y}px)`
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-purple-400">
                  <path fill="currentColor" d="M16.633 16.504c.869-.075 1.543-.84 1.499-1.754-.046-.914-.795-1.648-1.708-1.648h-.061c-.943.031-1.678.824-1.648 1.769.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.004 4.795-1.603.838-3.296 1.154-4.944.929-1.378-.194-2.456-.81-3.116-1.798-.988-1.499-1.078-3.116-.255-4.734.601-1.169 1.499-2.023 2.099-2.443-.15-.389-.33-1.048-.42-1.542-4.436 3.177-3.985 7.521-2.637 9.574 1.004 1.498 3.057 2.456 5.304 2.456.599 0 1.229-.044 1.843-.194 3.896-.749 6.847-3.086 8.54-6.532l.014-.031zM21.981 12.758c-2.321-2.727-5.738-4.225-9.634-4.225h-.51c-.253-.554-.837-.899-1.497-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074c.675-.03 1.259-.45 1.498-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.004 2.622 2.322 3.236 3.896.538 1.288.509 2.547-.045 3.597-.854 1.647-2.293 2.517-4.195 2.517-1.199 0-2.367-.375-2.967-.644-.359.298-.959.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.093-1.647 5.918-3.236.898-1.798.824-4.824-1.469-7.416l-.014.03zM6.49 17.042c.029.899.793 1.648 1.708 1.648h.06c.959-.03 1.693-.823 1.648-1.768 0-.899-.779-1.647-1.693-1.647h-.061c-.06 0-.149 0-.225.029-1.243-2.098-1.768-4.346-1.572-6.771.119-1.828.719-3.417 1.797-4.735.899-1.124 2.592-1.679 3.746-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.449c-.345-4.914-3.4-7.492-6.322-7.492-2.742 0-5.273 1.993-6.293 4.915-1.393 3.896-.479 7.641 1.229 10.638-.149.195-.239.539-.209.868z" />
                </svg>
              </div>

              <div
                className="absolute p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-fast"
                style={{
                  top: '35%',
                  left: '30%',
                  transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
                }}
              >
                <Zap size={24} className="text-yellow-400" />
              </div>
            </div>

            {/* Experience highlights with animated border - Updated for AI Skills */}
            <div className="grid grid-cols-2 gap-4">
              <div className="skill-card group">
                <div className="skill-card-gradient"></div>
                <div className="relative z-10 p-4">
                  <h3 className="text-white font-bold mb-1">LLM Applications</h3>
                  <p className="text-white/70 text-sm">Building with Large Language Models</p>
                </div>
              </div>
              <div className="skill-card group">
                <div className="skill-card-gradient"></div>
                <div className="relative z-10 p-4">
                  <h3 className="text-white font-bold mb-1">AI Pipelines</h3>
                  <p className="text-white/70 text-sm">End-to-end Al workflows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all">
          <ArrowDown size={24} />
        </a>
      </div>

      <style jsx>{`
        /* Animation keyframes */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulsate {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }

        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotateRingReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* Animation classes */
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        /* AI Network styling */
        .perspective {
          perspective: 1000px;
        }

        .ai-network {
          position: relative;
          width: 200px; /* Adjusted width */
          height: 200px; /* Adjusted height */
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
          animation: float-medium 8s ease-in-out infinite;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .network-layer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: absolute; /* Position layers */
        }


        .ai-network:hover {
          animation-play-state: paused;
        }

        /* Skill rings */
        .skill-ring-container {
          position: absolute;
          width: 300px;
          height: 300px;
          pointer-events: none;
        }

        .skill-ring {
          position: absolute;
          border-radius: 50%;
          border-style: solid;
          border-width: 1px;
          opacity: 0.3;
        }

        .ring-1 {
          top: 25%;
          left: 25%;
          width: 50%;
          height: 50%;
          border-color: var(--futuristic-accent);
          animation: rotateRing 60s linear infinite;
        }

        .ring-2 {
          top: 12.5%;
          left: 12.5%;
          width: 75%;
          height: 75%;
          border-color: var(--futuristic-blue);
          animation: rotateRingReverse 40s linear infinite;
        }

        .ring-3 {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-color: #9333ea;
          animation: rotateRing 80s linear infinite;
        }

        /* Skill card styling */
        .skill-card {
          position: relative;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .skill-card-gradient {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, var(--futuristic-accent), var(--futuristic-blue), #9333ea);
          background-size: 400% 400%;
          z-index: 0;
          border-radius: 0.6rem;
          animation: gradient-rotate 6s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover .skill-card-gradient {
          opacity: 1;
        }

        /* Futuristic Button Styling (retained) */
        .futuristic-button {
          position: relative;
          padding: 10px 25px;
          border: 1px solid var(--futuristic-accent);
          background: transparent;
          color: white;
          font-weight: medium;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .futuristic-button:hover {
          background-color: var(--futuristic-accent)/10;
        }

        .futuristic-button span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: transform 0.5s ease-in-out;
        }

        .futuristic-button:hover span {
          transform: translateX(100%);
        }

        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }


        /* Text Gradient (retained) */
        .text-gradient {
          background: linear-gradient(90deg, var(--futuristic-accent), var(--futuristic-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }


        /* Make sure you have these CSS variables defined in your global stylesheet or component scope */
        :root {
          --futuristic-accent: #00ffe7;
          --futuristic-blue: #0070f3;
        }

      `}</style>
    </section>
  );
};

export default Hero;
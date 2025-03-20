
import { useEffect, useRef } from 'react';

const ThreeDNameplate = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
      
      if (container) {
        container.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
      }
    };

    const handleResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative transition-transform duration-300 ease-out-expo transform perspective-800 select-none"
    >
      <div className="relative backdrop-blur-lg bg-white/5 border border-white/20 p-6 rounded-xl overflow-hidden shadow-xl transform-style-3d">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-futuristic-blue/20 to-transparent opacity-50"></div>
        <div className="glow-text text-4xl font-bold mb-2 tracking-tight transform-style-3d translate-z-10">Pranav VK</div>
        <div className="text-white/80 text-xl mb-4 transform-style-3d translate-z-5">Senior Software Engineer</div>
        <div className="flex flex-wrap gap-2 transform-style-3d translate-z-5">
          <span className="px-3 py-1 bg-futuristic-accent/20 rounded-full text-xs text-white/90">React</span>
          <span className="px-3 py-1 bg-futuristic-accent/20 rounded-full text-xs text-white/90">JavaScript</span>
          <span className="px-3 py-1 bg-futuristic-accent/20 rounded-full text-xs text-white/90">Three.js</span>
          <span className="px-3 py-1 bg-futuristic-accent/20 rounded-full text-xs text-white/90">React Native</span>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-2 right-2 w-16 h-16 border-r-2 border-b-2 border-futuristic-accent/30 rounded-br-lg"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-l-2 border-t-2 border-futuristic-accent/30 rounded-tl-lg"></div>
      </div>
    </div>
  );
};

export default ThreeDNameplate;

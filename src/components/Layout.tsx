
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import ParticleBackground from "./ParticleBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for initial animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-futuristic-dark z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-futuristic-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <div className="relative overflow-hidden">
            <p className="text-futuristic-accent font-mono animate-typewriter whitespace-nowrap overflow-hidden">
              Initializing Interface...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
      <div className="noise-bg"></div>
      <ParticleBackground />
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-16 z-10 relative">
        {children}
      </main>
      <footer className="py-6 border-t border-white/10 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Pranav VK • Senior Software Engineer</p>
          <p className="mt-1 text-xs">Built with React & Three.js • Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

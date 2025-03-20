
import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Code, CodepenIcon, Database, FileCode, 
  Github, Globe, Layout, Layers, 
  Server, Share2, Terminal, Zap 
} from "lucide-react";

interface TechItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: "frontend" | "backend" | "tools" | "language";
  color: string;
}

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const techStack: TechItem[] = [
    // Frontend
    { 
      id: 1, 
      name: "React", 
      icon: <Layout size={24} />, 
      description: "Building interactive UIs with React and its ecosystem", 
      category: "frontend", 
      color: "#61dafb" 
    },
    { 
      id: 2, 
      name: "JavaScript", 
      icon: <Code size={24} />, 
      description: "Core language for web development", 
      category: "language", 
      color: "#f7df1e" 
    },
    { 
      id: 3, 
      name: "TypeScript", 
      icon: <FileCode size={24} />, 
      description: "Strongly typed JavaScript for larger applications", 
      category: "language", 
      color: "#3178c6" 
    },
    { 
      id: 4, 
      name: "React Native", 
      icon: <Layers size={24} />, 
      description: "Cross-platform mobile app development", 
      category: "frontend", 
      color: "#61dafb" 
    },
    { 
      id: 5, 
      name: "Three.js", 
      icon: <CodepenIcon size={24} />, 
      description: "3D graphics in the browser", 
      category: "frontend", 
      color: "#049EF4" 
    },
    
    // Backend
    { 
      id: 6, 
      name: "Node.js", 
      icon: <Server size={24} />, 
      description: "JavaScript runtime for backend development", 
      category: "backend", 
      color: "#339933" 
    },
    { 
      id: 7, 
      name: "GraphQL", 
      icon: <Share2 size={24} />, 
      description: "API query language for flexible data fetching", 
      category: "backend", 
      color: "#E10098" 
    },
    { 
      id: 8, 
      name: "MongoDB", 
      icon: <Database size={24} />, 
      description: "NoSQL database for modern applications", 
      category: "backend", 
      color: "#47A248" 
    },
    
    // Tools
    { 
      id: 9, 
      name: "Git", 
      icon: <Github size={24} />, 
      description: "Version control system", 
      category: "tools", 
      color: "#F05032" 
    },
    { 
      id: 10, 
      name: "Docker", 
      icon: <Zap size={24} />, 
      description: "Containerization platform", 
      category: "tools", 
      color: "#2496ED" 
    },
    { 
      id: 11, 
      name: "REST APIs", 
      icon: <Globe size={24} />, 
      description: "Building and consuming RESTful web services", 
      category: "backend", 
      color: "#FF6C37" 
    },
    { 
      id: 12, 
      name: "Terminal", 
      icon: <Terminal size={24} />, 
      description: "Command-line proficiency", 
      category: "tools", 
      color: "#4D4D4D" 
    },
  ];

  const filteredTech = activeCategory === "all" 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "language", label: "Languages" },
    { id: "tools", label: "Tools" }
  ];

  return (
    <section id="tech-stack" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech <span className="text-gradient">Stack</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The technologies, frameworks, and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 md:space-x-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap
                  ${activeCategory === category.id 
                    ? "bg-futuristic-accent text-white shadow-lg shadow-futuristic-accent/20" 
                    : "bg-white/5 text-white/70 hover:bg-white/10"}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {filteredTech.map((tech, index) => (
            <TooltipProvider key={tech.id}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div 
                    className={`relative flex flex-col items-center justify-center p-6 rounded-lg border border-white/10 backdrop-blur-md transition-all duration-500 hover:scale-105 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ 
                      backgroundColor: `${tech.color}15`,
                      borderColor: `${tech.color}40`,
                      transitionDelay: `${index * 0.1}s`,
                      boxShadow: `0 4px 20px ${tech.color}20`
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${tech.color}30`, color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                    <h3 className="font-medium text-white mb-1">{tech.name}</h3>
                    <span className="text-xs text-white/60 uppercase tracking-wider">{tech.category}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs" side="top">
                  <p>{tech.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

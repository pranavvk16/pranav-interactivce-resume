
import { useState } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Modal from "./Modal";
import { applyFadeInAnimation } from "../utils/animations";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  detailedDescription?: string;
  challenges?: string[];
  solutions?: string[];
  github?: string;
  liveDemo?: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "3D Product Configurator",
      description: "Interactive 3D product visualization and customization tool built with React and Three.js.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Three.js", "WebGL", "Framer Motion"],
      detailedDescription: "This project is a highly interactive 3D product configurator that allows users to customize products in real-time with different colors, materials, and features. The application uses Three.js for 3D rendering and React for the UI components.",
      challenges: [
        "Optimizing 3D model loading and rendering for performance",
        "Implementing realistic materials and lighting",
        "Creating smooth animations between configuration changes",
        "Ensuring cross-browser compatibility for WebGL content"
      ],
      solutions: [
        "Implemented progressive loading and LOD (Level of Detail) techniques",
        "Created custom PBR materials with environment mapping",
        "Used GSAP for smooth transition animations",
        "Added fallbacks for browsers with limited WebGL support"
      ],
      github: "https://github.com/pranavvk16/3d-product-configurator",
      liveDemo: "https://3d-product-configurator.demo"
    },
    {
      id: 2,
      title: "AI-Powered Content Generator",
      description: "A tool that leverages AI to generate marketing content based on user prompts and preferences.",
      image: "https://images.unsplash.com/photo-1677442135136-760c813add19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
      detailedDescription: "This application allows marketers to generate high-quality content using AI. Users can input parameters such as tone, length, and target audience to customize the output. The system uses OpenAI's API to generate content and stores user preferences and history in MongoDB.",
      challenges: [
        "Managing API rate limits and costs",
        "Implementing effective prompt engineering for consistent results",
        "Creating a user-friendly interface for complex parameter inputs",
        "Handling long-running API requests gracefully"
      ],
      solutions: [
        "Built a queuing system with rate limiting controls",
        "Developed a template-based prompt system with variables",
        "Created an intuitive multi-step wizard interface",
        "Implemented real-time progress updates and background processing"
      ],
      github: "https://github.com/pranavvk16/ai-content-generator",
      liveDemo: "https://ai-content-generator.demo"
    },
    {
      id: 3,
      title: "Cross-Platform Workout Tracker",
      description: "A React Native app for tracking workouts with real-time progress visualization and social features.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Firebase", "Redux", "D3.js"],
      detailedDescription: "A comprehensive workout tracking application that works on both iOS and Android. Users can create custom workout routines, track their progress over time with interactive charts, and share their achievements with friends. The app also includes features like workout reminders, achievement badges, and integration with health platforms.",
      challenges: [
        "Ensuring consistent UI/UX across both iOS and Android platforms",
        "Implementing complex data visualizations in React Native",
        "Creating an efficient offline-first architecture",
        "Managing real-time synchronization between devices"
      ],
      solutions: [
        "Built a platform-specific component system with shared core functionality",
        "Used D3.js with React Native SVG for performant visualizations",
        "Implemented Redux-Persist with custom migration strategies",
        "Created a robust sync system with conflict resolution using Firebase"
      ],
      github: "https://github.com/pranavvk16/fitness-tracker-app",
      liveDemo: "https://fitness-tracker-app.demo"
    },
    {
      id: 4,
      title: "Realtime Collaborative Whiteboard",
      description: "A collaborative drawing and brainstorming tool with realtime synchronization between users.",
      image: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Canvas API", "Socket.io", "Express"],
      detailedDescription: "This project enables multiple users to collaborate on a shared digital whiteboard in real-time. Users can draw, add shapes, sticky notes, and images, and see others' changes instantly. The application includes features like user presence indicators, chat functionality, and the ability to export the whiteboard as an image or PDF.",
      challenges: [
        "Managing concurrent drawing operations from multiple users",
        "Optimizing WebSocket communication for smooth real-time updates",
        "Implementing undo/redo functionality in a multi-user environment",
        "Scaling to handle many simultaneous connections"
      ],
      solutions: [
        "Implemented operational transformation algorithms for conflict resolution",
        "Created a binary diff protocol to minimize data transfer",
        "Designed a command pattern system for action history management",
        "Built a Redis-backed Socket.io adapter for horizontal scaling"
      ],
      github: "https://github.com/pranavvk16/collaborative-whiteboard",
      liveDemo: "https://collaborative-whiteboard.demo"
    }
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating technical expertise and problem-solving skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group cursor-pointer ${applyFadeInAnimation(index)}`}
              onClick={() => openProjectModal(project)}
            >
              <div className="relative overflow-hidden rounded-xl h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-futuristic-accent text-sm font-medium">
                    <span>View details</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={closeProjectModal}
          title={selectedProject.title}
        >
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-2 py-1 rounded-full bg-futuristic-blue/20 text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Description</h4>
              <p className="text-white/80 text-sm">{selectedProject.detailedDescription}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Challenges</h4>
                <ul className="space-y-2">
                  {selectedProject.challenges?.map((challenge, idx) => (
                    <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="min-w-[6px] h-[6px] mt-1.5 bg-futuristic-accent rounded-full"></span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Solutions</h4>
                <ul className="space-y-2">
                  {selectedProject.solutions?.map((solution, idx) => (
                    <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="min-w-[6px] h-[6px] mt-1.5 bg-futuristic-accent rounded-full"></span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              {selectedProject.github && (
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm"
                >
                  <Github size={16} />
                  <span>View Code</span>
                </a>
              )}
              
              {selectedProject.liveDemo && (
                <a 
                  href={selectedProject.liveDemo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-futuristic-blue hover:bg-futuristic-accent rounded-md transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Projects;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard from "./AnimatedCard";
import { ChevronDown, ChevronUp } from "lucide-react";

// Define Skill interface
interface Skill {
  id: number;
  name: string;
  icon: string;
  level: number;
  description: string;
  details: string[];
  gradient: string;
}

// Framer Motion animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 80,
    },
  }),
  hover: {
    scale: 1.02,
    rotateX: 5,
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.4)",
    transition: { duration: 0.3 },
  },
};

const Skills = () => {
  const [expandedSkills, setExpandedSkills] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleSkill = (id: number) => {
    setExpandedSkills((prev) =>
      prev.includes(id) ? prev.filter((skillId) => skillId !== id) : [...prev, id]
    );
  };

  const skills: Skill[] = [
    {
      id: 1,
      name: "React",
      icon: "⚛️",
      level: 90,
      description: "Expert in React.js with deep knowledge of hooks, context, and advanced patterns.",
      details: [
        "Component architecture and optimization",
        "State management with Redux, Context API",
        "Performance optimization techniques",
        "Custom hooks development",
        "Integration with REST/GraphQL APIs",
      ],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "JavaScript",
      icon: "📜",
      level: 95,
      description: "Master of JavaScript, ES6+, and modern patterns.",
      details: [
        "Functional programming principles",
        "Asynchronous patterns (Promises, async/await)",
        "Prototypal inheritance and OOP",
        "Event loop and execution context",
        "Performance optimization",
      ],
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: 3,
      name: "React Native",
      icon: "📱",
      level: 85,
      description: "Experienced in cross-platform mobile apps with React Native.",
      details: [
        "Native module integration",
        "Performance optimization for mobile",
        "Gesture handling and animations",
        "Navigation and state management",
        "Cross-platform compatibility",
      ],
      gradient: "from-green-400 to-teal-500",
    },
    {
      id: 4,
      name: "3D Development",
      icon: "🔮",
      level: 80,
      description: "Proficient with Three.js and WebGL for immersive 3D experiences.",
      details: [
        "Three.js scene setup and management",
        "3D model loading and optimization",
        "Custom shaders and materials",
        "Physics simulations",
        "Performance optimization",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      name: "AI Integration",
      icon: "🤖",
      level: 75,
      description: "Experience integrating AI services into web applications.",
      details: [
        "OpenAI API integration",
        "Natural language processing",
        "Chatbot development",
        "Machine learning model integration",
        "Voice and speech recognition",
      ],
      gradient: "from-red-400 to-pink-600",
    },
    {
      id: 6,
      name: "Backend Development",
      icon: "🖥️",
      level: 85,
      description: "Proficient in Node.js and database integration for full-stack development.",
      details: [
        "RESTful and GraphQL API design",
        "Authentication and authorization",
        "Database modeling and optimization",
        "Serverless architecture",
        "Microservices development",
      ],
      gradient: "from-indigo-500 to-blue-600",
    },
  ];

  return (
    <section
      id="skills"
      // style={{
      //   background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)", // Subtle gradient for app-wide sync
      // }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Technical{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Skills
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Crafting high-performance, interactive web experiences with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const isExpanded = expandedSkills.includes(skill.id);
            return (
              <motion.div
                key={skill.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="relative"
              >
                <AnimatedCard
                  className={`relative backdrop-blur-md border border-gray-700/30 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300`} // Enhanced glassmorphism
                  glowEffect={true}
                >
                  {/* Particle Effect Inside Card */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-full w-full opacity-10 animate-pulse bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:15px_15px]"></div>
                  </div>

                  <div className="relative py-6 px-6 z-10"> {/* Added z-10 to ensure content is above particles */}
                    {/* Skill Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <motion.span
                          className="text-4xl"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          {skill.icon}
                        </motion.span>
                        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                      </div>
                      <motion.button
                        whileHover={{ rotate: 180 }}
                        onClick={() => toggleSkill(skill.id)}
                        className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                        aria-label={isExpanded ? "Collapse details" : "Expand details"}
                      >
                        {isExpanded ? (
                          <ChevronUp size={24} className="text-gray-300" />
                        ) : (
                          <ChevronDown size={24} className="text-gray-300" />
                        )}
                      </motion.button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-900/50 rounded-full h-3 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`bg-gradient-to-r ${skill.gradient} h-3 rounded-full relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shine"></div>
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 font-medium">
                        <span>Proficiency</span>
                        <span>{skill.level}%</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{skill.description}</p>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-gray-700/50"
                        >
                          <ul className="space-y-3">
                            {skill.details.map((detail, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-sm text-gray-300 flex items-center gap-2"
                              >
                                <span
                                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient}`}
                                ></span>
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
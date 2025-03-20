
import { 
  Code, CodepenIcon, Database, FileCode, 
  Github, Globe, Layout, Layers, 
  Server, Share2, Terminal, Zap 
} from "lucide-react";
import { TechData } from "./types";

export const techStack: TechData[] = [
  { 
    id: 1, 
    name: "React", 
    icon: <Layout size={24} />, 
    category: "frontend", 
    color: "#61dafb",
    points: 30
  },
  { 
    id: 2, 
    name: "JavaScript", 
    icon: <Code size={24} />, 
    category: "language", 
    color: "#f7df1e",
    points: 10
  },
  { 
    id: 3, 
    name: "TypeScript", 
    icon: <FileCode size={24} />, 
    category: "language", 
    color: "#3178c6",
    points: 20
  },
  { 
    id: 4, 
    name: "React Native", 
    icon: <Layers size={24} />, 
    category: "frontend", 
    color: "#61dafb",
    points: 25
  },
  { 
    id: 5, 
    name: "Three.js", 
    icon: <CodepenIcon size={24} />, 
    category: "frontend", 
    color: "#049EF4",
    points: 40
  },
  { 
    id: 6, 
    name: "Node.js", 
    icon: <Server size={24} />, 
    category: "backend", 
    color: "#339933",
    points: 20
  },
  { 
    id: 7, 
    name: "GraphQL", 
    icon: <Share2 size={24} />, 
    category: "backend", 
    color: "#E10098",
    points: 35
  },
  { 
    id: 8, 
    name: "MongoDB", 
    icon: <Database size={24} />, 
    category: "backend", 
    color: "#47A248",
    points: 25
  },
  { 
    id: 9, 
    name: "Git", 
    icon: <Github size={24} />, 
    category: "tools", 
    color: "#F05032",
    points: 15
  },
  { 
    id: 10, 
    name: "Docker", 
    icon: <Zap size={24} />, 
    category: "tools", 
    color: "#2496ED",
    points: 30
  },
  { 
    id: 11, 
    name: "REST APIs", 
    icon: <Globe size={24} />, 
    category: "backend", 
    color: "#FF6C37",
    points: 20
  },
  { 
    id: 12, 
    name: "Terminal", 
    icon: <Terminal size={24} />, 
    category: "tools", 
    color: "#4D4D4D",
    points: 10
  },
];

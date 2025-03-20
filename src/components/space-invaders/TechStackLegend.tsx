
import React from "react";
import { TechData } from "./types";

interface TechStackLegendProps {
  techStack: TechData[];
}

const TechStackLegend: React.FC<TechStackLegendProps> = ({ techStack }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      {techStack.map(tech => (
        <div 
          key={tech.id}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
          style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
        >
          {tech.icon}
          <span>{tech.name}</span>
          <span className="ml-1 opacity-70">{tech.points}pts</span>
        </div>
      ))}
    </div>
  );
};

export default TechStackLegend;


import { useState, ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  delayClass?: string;
}

const AnimatedCard = ({
  children,
  className = "",
  hoverEffect = true,
  glowEffect = false,
  delayClass = "",
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`futuristic-card ${delayClass} ${
        hoverEffect
          ? "hover:translate-y-[-5px] hover:shadow-lg hover:shadow-futuristic-accent/10"
          : ""
      } ${glowEffect && isHovered ? "glow-border" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;

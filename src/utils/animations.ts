
export function applyFadeInAnimation(index: number): string {
  const delays = [
    'animate-[fade-in_0.5s_ease-out_0.1s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.2s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.3s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.4s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.5s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.6s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.7s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.8s_backwards]',
    'animate-[fade-in_0.5s_ease-out_0.9s_backwards]',
    'animate-[fade-in_0.5s_ease-out_1.0s_backwards]',
  ];
  
  return delays[index % delays.length] || delays[0];
}

export function applyAlternatingAnimation(index: number): string {
  const animations = [
    'animate-[fade-in-right_0.5s_ease-out_backwards]',
    'animate-[fade-in-left_0.5s_ease-out_backwards]',
  ];
  
  return animations[index % 2];
}

export function getOrbitPosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2;
  const delay = index * 0.5;
  
  return {
    style: {
      animationDelay: `${delay}s`,
      transform: `rotate(${angle}rad) translateX(120px) rotate(-${angle}rad)`,
    },
    className: 'animate-rotate-orbit',
    angle: angle // Adding the angle to the return object
  };
}

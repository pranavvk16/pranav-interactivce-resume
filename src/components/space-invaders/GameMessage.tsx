
import React from 'react';

interface GameMessageProps {
  message: string;
  isVisible: boolean;
}

const GameMessage: React.FC<GameMessageProps> = ({ message, isVisible }) => {
  if (!isVisible || !message) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-black/70 text-white px-8 py-4 rounded-lg text-xl font-bold">
        {message}
      </div>
    </div>
  );
};

export default GameMessage;

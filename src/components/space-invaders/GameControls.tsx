
import React from 'react';
import { Play, Shield } from 'lucide-react';

interface GameControlsProps {
  lives: number;
  score: number;
  level: number;
  onStartGame: () => void;
  gameStarted: boolean;
  gameOver: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  lives,
  score,
  level,
  onStartGame,
  gameStarted,
  gameOver
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center mb-4 text-sm text-white/70">
        <span className="bg-white/10 px-3 py-1 rounded-full mr-2">Click to shoot</span>
        <span className="bg-white/10 px-3 py-1 rounded-full">Move mouse to control</span>
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-md">
        <div className="flex items-center gap-2">
          <div className="text-white">Score: {score}</div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-white">Level: {level}</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-blue-400" />
          <div className="text-white">Lives: {lives}</div>
        </div>
        
        {(!gameStarted || gameOver) && (
          <button 
            onClick={onStartGame}
            className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-full transition-colors"
          >
            <Play size={16} />
            <span>{gameOver ? 'Play Again' : 'Start Game'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls;

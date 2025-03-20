
import React, { useRef, useEffect } from "react";
import { GameState } from "./types";
import { drawGame, updateBullets } from "./game-utils";

interface GameCanvasProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  handleCanvasClick: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  setGameState,
  handleCanvasClick,
  handleMouseMove,
  handleTouchMove
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    if (gameState.gameStarted && !gameState.gameOver) {
      // Update bullet positions
      const { bullets, enemyBullets } = updateBullets(
        gameState.bullets, 
        gameState.enemyBullets,
        gameState.level
      );
      
      setGameState(prev => ({
        ...prev,
        bullets,
        enemyBullets
      }));
      
      // Draw game
      drawGame(ctx, gameState, canvas.width, canvas.height);
      
      // Continue game loop
      gameLoopRef.current = requestAnimationFrame(() => {});
    } else {
      // Just draw the current state without updates
      drawGame(ctx, gameState, canvas.width, canvas.height);
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, setGameState]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-[500px] bg-futuristic-dark/90 rounded-lg cursor-crosshair"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      width={800}  // Default width, will be resized based on container
      height={500} // Default height, will be resized based on container
    />
  );
};

export default GameCanvas;

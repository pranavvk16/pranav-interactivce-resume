
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { techStack } from "./tech-data";
import TechStackLegend from "./TechStackLegend";
import GameCanvas from "./GameCanvas";
import GameControls from "./GameControls";
import GameMessage from "./GameMessage";
import { 
  initializeInvaders, 
  createBullet, 
  createEnemyBullet, 
  updateInvaders, 
  checkCollisions 
} from "./game-utils";
import { GameState } from "./types";

const SpaceInvaders: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  // Initialize game state
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    gameOver: false,
    score: 0,
    level: 1,
    lives: 3,
    message: "Click to start!",
    playerPosition: { x: 0, y: 0 },
    invaders: [],
    bullets: [],
    enemyBullets: [],
    invaderDirection: 1,
    lastShotTime: 0
  });

  // Initialize game on visibility
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

  // Initialize canvas size based on container
  useEffect(() => {
    if (!isVisible) return;

    const resizeCanvas = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = Math.min(600, window.innerHeight * 0.7);
        
        // Reset player position
        setGameState(prev => ({
          ...prev,
          playerPosition: {
            x: width / 2 - 25,
            y: height - 40
          }
        }));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isVisible]);

  // Game loop
  useEffect(() => {
    if (!isVisible || !gameState.gameStarted || gameState.gameOver) return;
    
    const runGameLoop = () => {
      // Update invader positions
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      
      const { invaders, invaderDirection, shouldEndGame } = updateInvaders(
        gameState,
        canvas.width
      );
      
      if (shouldEndGame) {
        handleGameOver();
        return;
      }
      
      // Check for collisions
      const {
        invaders: updatedInvaders,
        bullets: updatedBullets,
        enemyBullets: updatedEnemyBullets,
        score: newScore,
        lives: newLives,
        allInvadersDefeated
      } = checkCollisions(
        {
          ...gameState,
          invaders,
          invaderDirection
        }
      );
      
      // Update game state
      setGameState(prev => ({
        ...prev,
        invaders: updatedInvaders,
        bullets: updatedBullets,
        enemyBullets: updatedEnemyBullets,
        invaderDirection,
        score: newScore,
        lives: newLives
      }));
      
      // Check if player lost
      if (newLives <= 0) {
        handleGameOver();
        return;
      }
      
      // Check if all invaders are defeated
      if (allInvadersDefeated) {
        if (gameState.level >= 3) {
          handleGameOver(true);
        } else {
          nextLevel();
        }
        return;
      }
      
      // Random enemy shooting
      if (Math.random() < 0.02 * gameState.level) {
        enemyShoot();
      }
      
      gameLoopRef.current = requestAnimationFrame(runGameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(runGameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isVisible, gameState]);

  // Start game
  const startGame = () => {
    if (gameState.gameStarted) return;
    
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    setGameState({
      gameStarted: true,
      gameOver: false,
      score: 0,
      level: 1,
      lives: 3,
      message: "",
      playerPosition: gameState.playerPosition,
      invaders: initializeInvaders(canvas, techStack),
      bullets: [],
      enemyBullets: [],
      invaderDirection: 1,
      lastShotTime: 0
    });
    
    toast({
      title: "Game Started!",
      description: "Destroy the tech stack invaders!",
    });
  };

  // Game over handler
  const handleGameOver = (win = false) => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameOver: true,
      message: win 
        ? "You mastered the tech stack! Click to play again." 
        : "Game Over! Click to try again."
    }));
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    
    if (win) {
      toast({
        title: "You Won!",
        description: `You mastered all techs with a score of ${gameState.score}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Game Over",
        description: `Your final score: ${gameState.score}`,
      });
    }
  };

  // Next level handler
  const nextLevel = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1,
      bullets: [],
      enemyBullets: [],
      invaders: initializeInvaders(canvas, techStack)
    }));
    
    toast({
      title: `Level ${gameState.level + 1}`,
      description: "More techs to master!",
    });
  };

  // Shoot bullet
  const shootBullet = () => {
    const now = Date.now();
    if (now - gameState.lastShotTime < 500) return; // Cooldown of 500ms between shots
    
    setGameState(prev => ({
      ...prev,
      bullets: [...prev.bullets, createBullet(prev.playerPosition)],
      lastShotTime: now
    }));
  };

  // Enemy shoot
  const enemyShoot = () => {
    const aliveInvaders = gameState.invaders.filter(inv => inv.alive);
    if (aliveInvaders.length === 0) return;
    
    // Randomly select an invader to shoot
    const randomIdx = Math.floor(Math.random() * aliveInvaders.length);
    const shooter = aliveInvaders[randomIdx];
    
    setGameState(prev => ({
      ...prev,
      enemyBullets: [...prev.enemyBullets, createEnemyBullet(shooter)]
    }));
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameState.gameStarted || gameState.gameOver) return;
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Constrain player within canvas
    const newX = Math.max(0, Math.min(canvas.width - 50, x - 25));
    
    setGameState(prev => ({
      ...prev,
      playerPosition: {
        ...prev.playerPosition,
        x: newX
      }
    }));
  };

  // Handle touch movement
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!gameState.gameStarted || gameState.gameOver) return;
    e.preventDefault();
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    
    // Constrain player within canvas
    const newX = Math.max(0, Math.min(canvas.width - 50, x - 25));
    
    setGameState(prev => ({
      ...prev,
      playerPosition: {
        ...prev.playerPosition,
        x: newX
      }
    }));
  };

  // Handle canvas click (start game or shoot)
  const handleCanvasClick = () => {
    if (!gameState.gameStarted || gameState.gameOver) {
      startGame();
    } else {
      shootBullet();
    }
  };

  return (
    <section id="tech-stack" className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech <span className="text-gradient">Stack</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Destroy the invaders to showcase your mastery of these technologies!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 p-4 relative">
            <GameControls 
              lives={gameState.lives}
              score={gameState.score}
              level={gameState.level}
              onStartGame={startGame}
              gameStarted={gameState.gameStarted}
              gameOver={gameState.gameOver}
            />
            
            <div className="relative">
              <GameCanvas 
                gameState={gameState}
                setGameState={setGameState}
                handleCanvasClick={handleCanvasClick}
                handleMouseMove={handleMouseMove}
                handleTouchMove={handleTouchMove}
              />
              
              <GameMessage 
                message={gameState.message} 
                isVisible={!gameState.gameStarted || gameState.gameOver} 
              />
            </div>
            
            <TechStackLegend techStack={techStack} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceInvaders;

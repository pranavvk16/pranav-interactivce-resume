
import { Bullet, GameState, Invader, PlayerPosition } from "./types";

// Initialize invaders
export const initializeInvaders = (
  canvas: HTMLCanvasElement,
  techStack: any[]
): Invader[] => {
  const numRows = 3;
  const numCols = 4;
  const invaderSize = 50;
  const padding = 20;
  const startX = (canvas.width - (numCols * (invaderSize + padding) - padding)) / 2;
  const startY = 50;
  
  const newInvaders: Invader[] = [];
  let techIdx = 0;
  
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (techIdx < techStack.length) {
        const tech = techStack[techIdx];
        newInvaders.push({
          id: tech.id, // Use the tech id as the invader id
          x: startX + col * (invaderSize + padding),
          y: startY + row * (invaderSize + padding),
          width: invaderSize,
          height: invaderSize,
          tech,
          alive: true
        });
        techIdx++;
      }
    }
  }
  
  return newInvaders;
};

// Create a new bullet
export const createBullet = (playerPosition: PlayerPosition): Bullet => {
  return {
    x: playerPosition.x + 25 - 2, // Center of player
    y: playerPosition.y,
    width: 4,
    height: 15
  };
};

// Create enemy bullet
export const createEnemyBullet = (invader: Invader): Bullet => {
  return {
    x: invader.x + invader.width / 2 - 2,
    y: invader.y + invader.height,
    width: 4,
    height: 15,
    color: invader.tech.color
  };
};

// Update invader positions
export const updateInvaders = (
  gameState: GameState,
  canvasWidth: number
): { 
  invaders: Invader[],
  invaderDirection: number,
  shouldEndGame: boolean
} => {
  const { invaders, invaderDirection, playerPosition } = gameState;
  
  let needsDirectionChange = false;
  let lowestInvader = 0;
  
  // Check if any invader hits the edge
  invaders.forEach(invader => {
    if (!invader.alive) return;
    
    if (
      (invaderDirection > 0 && invader.x + invader.width + 10 > canvasWidth) ||
      (invaderDirection < 0 && invader.x - 10 < 0)
    ) {
      needsDirectionChange = true;
    }
    
    // Keep track of lowest invader
    if (invader.y + invader.height > lowestInvader) {
      lowestInvader = invader.y + invader.height;
    }
  });
  
  // If lowest invader reaches player, game over
  if (lowestInvader >= playerPosition.y) {
    return {
      invaders,
      invaderDirection,
      shouldEndGame: true
    };
  }
  
  // Update invader positions
  const updatedInvaders = invaders.map(invader => {
    return {
      ...invader,
      x: invader.x + (needsDirectionChange ? 0 : invaderDirection * (1 + gameState.level * 0.5)),
      y: invader.y + (needsDirectionChange ? 10 : 0)
    };
  });
  
  return {
    invaders: updatedInvaders,
    invaderDirection: needsDirectionChange ? -invaderDirection : invaderDirection,
    shouldEndGame: false
  };
};

// Check for collisions between bullets and invaders/player
export const checkCollisions = (
  gameState: GameState
): {
  invaders: Invader[],
  bullets: Bullet[],
  enemyBullets: Bullet[],
  score: number,
  lives: number,
  allInvadersDefeated: boolean
} => {
  const { invaders, bullets, enemyBullets, playerPosition, score, lives } = gameState;
  
  // Player bullets hitting invaders
  const updatedInvaders = [...invaders];
  const updatedBullets = bullets.filter(bullet => {
    let bulletHit = false;
    
    updatedInvaders.forEach(invader => {
      if (
        invader.alive &&
        bullet.x < invader.x + invader.width &&
        bullet.x + bullet.width > invader.x &&
        bullet.y < invader.y + invader.height &&
        bullet.y + bullet.height > invader.y
      ) {
        invader.alive = false;
        bulletHit = true;
      }
    });
    
    return !bulletHit && bullet.y > 0;
  });
  
  // Calculate new score by checking which invaders were just defeated
  const newScore = score + updatedInvaders
    .filter(updInv => !updInv.alive)
    .filter(deadInv => invaders.find(origInv => origInv.id === deadInv.id && origInv.alive))
    .reduce((total, inv) => total + inv.tech.points, 0);
  
  // Enemy bullets hitting player
  const updatedEnemyBullets = enemyBullets.filter(bullet => {
    const hitPlayer = (
      bullet.x < playerPosition.x + 50 &&
      bullet.x + bullet.width > playerPosition.x &&
      bullet.y < playerPosition.y + 30 &&
      bullet.y + bullet.height > playerPosition.y
    );
    
    return !hitPlayer && bullet.y < 2000; // Keep bullets that haven't hit player and are still on screen
  });
  
  // Check if player was hit
  const playerWasHit = enemyBullets.length > updatedEnemyBullets.length;
  const newLives = playerWasHit ? lives - 1 : lives;
  
  // Check if all invaders are defeated
  const allInvadersDefeated = updatedInvaders.every(inv => !inv.alive);
  
  return {
    invaders: updatedInvaders,
    bullets: updatedBullets,
    enemyBullets: updatedEnemyBullets,
    score: newScore,
    lives: newLives,
    allInvadersDefeated
  };
};

// Draw the game elements on canvas
export const drawGame = (
  ctx: CanvasRenderingContext2D,
  gameState: GameState,
  canvasWidth: number,
  canvasHeight: number
) => {
  const { 
    playerPosition, bullets, enemyBullets,
    invaders, score, level, lives, message
  } = gameState;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw player
  ctx.fillStyle = '#61dafb';
  ctx.beginPath();
  // Draw player spaceship
  ctx.moveTo(playerPosition.x + 25, playerPosition.y);
  ctx.lineTo(playerPosition.x + 50, playerPosition.y + 30);
  ctx.lineTo(playerPosition.x, playerPosition.y + 30);
  ctx.closePath();
  ctx.fill();
  
  // Draw bullets
  ctx.fillStyle = '#ffffff';
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
  
  // Draw enemy bullets
  enemyBullets.forEach(bullet => {
    ctx.fillStyle = bullet.color || '#ff0000';
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
  
  // Draw invaders
  invaders.forEach(invader => {
    if (!invader.alive) return;
    
    // Draw tech card background
    ctx.fillStyle = `${invader.tech.color}20`;
    ctx.strokeStyle = invader.tech.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(invader.x, invader.y, invader.width, invader.height, 5);
    ctx.fill();
    ctx.stroke();
    
    // Draw tech name
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(invader.tech.name, invader.x + invader.width / 2, invader.y + invader.height - 5);
    
    // Draw icon placeholder (simplified)
    ctx.fillStyle = invader.tech.color;
    ctx.beginPath();
    ctx.arc(invader.x + invader.width / 2, invader.y + invader.height / 2 - 5, 10, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw UI
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Level: ${level}`, 10, 40);
  
  // Draw lives
  ctx.fillText('Lives:', canvasWidth - 140, 26);
  for (let i = 0; i < lives; i++) {
    ctx.fillStyle = '#61dafb';
    ctx.beginPath();
    ctx.moveTo(canvasWidth - 80 + i * 20, 16);
    ctx.lineTo(canvasWidth - 70 + i * 20, 26);
    ctx.lineTo(canvasWidth - 90 + i * 20, 26);
    ctx.closePath();
    ctx.fill();
  }
  
  // Draw message if any
  if (message) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvasHeight / 2 - 30, canvasWidth, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvasWidth / 2, canvasHeight / 2 + 10);
  }
};

// Update bullet positions
export const updateBullets = (bullets: Bullet[], enemyBullets: Bullet[], level: number): { bullets: Bullet[], enemyBullets: Bullet[] } => {
  // Move player bullets up
  const updatedBullets = bullets.map(bullet => ({
    ...bullet,
    y: bullet.y - 10
  })).filter(bullet => bullet.y > 0);
  
  // Move enemy bullets down, faster with higher levels
  const updatedEnemyBullets = enemyBullets.map(bullet => ({
    ...bullet,
    y: bullet.y + (7 + level)
  })).filter(bullet => bullet.y < 2000); // Arbitrary large number to ensure offscreen bullets are removed
  
  return {
    bullets: updatedBullets,
    enemyBullets: updatedEnemyBullets
  };
};

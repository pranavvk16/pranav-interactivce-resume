
import { ReactNode } from "react";

export interface TechData {
  id: number;
  name: string;
  icon: ReactNode;
  category: string;
  color: string;
  points: number;
}

export interface Invader {
  id: number; // Add the id property
  x: number;
  y: number;
  width: number;
  height: number;
  tech: TechData;
  alive: boolean;
}

export interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface PlayerPosition {
  x: number;
  y: number;
}

export interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  score: number;
  level: number;
  lives: number;
  message: string;
  playerPosition: PlayerPosition;
  invaders: Invader[];
  bullets: Bullet[];
  enemyBullets: Bullet[];
  invaderDirection: number;
  lastShotTime: number;
}

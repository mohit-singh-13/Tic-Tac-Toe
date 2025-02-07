/// <reference types="vite/client" />

interface GridProps {
  grid: string[];
  setGrid: React.Dispatch<React.SetStateAction<string[]>>;
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
  winner: string;
  count: React.RefObject<number>;
  ws?: WebSocket;
  mySign?: string;
}

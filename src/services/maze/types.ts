export type MazeNode = {
  id: string;
  x: number;
  y: number;
  connections: string[];
  isActive: boolean;
  isStart: boolean;
  isEnd: boolean;
};

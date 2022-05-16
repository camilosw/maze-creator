import { atomFamily } from 'recoil';

import { MazeNode } from './types';

export const nodeAtom = atomFamily<MazeNode, string>({
  key: 'node',
  default: {
    id: '',
    x: 0,
    y: 0,
    connections: [],
    isActive: false,
    isStart: false,
  },
});

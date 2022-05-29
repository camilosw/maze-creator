import { atom, DefaultValue, selector } from 'recoil';

import { activeNodeIdAtom } from './activeNodeAtom';
import { nodeAtom } from './nodeAtom';
import { MazeNode } from './types';

export const startNodeIdAtom = atom<string | null>({
  key: 'startNodeId',
  default: null,
});

export const startNodeAtom = selector<MazeNode | null>({
  key: 'startNode',
  get: ({ get }) => {
    const startNodeId = get(activeNodeIdAtom);
    if (startNodeId) {
      return get(nodeAtom(startNodeId));
    }
    return null;
  },
  set: ({ set, get }, newNode) => {
    const startNodeId = get(startNodeIdAtom);
    if (startNodeId) {
      set(nodeAtom(startNodeId), (node) => ({ ...node, isStart: false }));
    }
    if (!(newNode instanceof DefaultValue) && newNode) {
      set(nodeAtom(newNode.id), (node) => ({ ...node, isStart: true }));
      set(startNodeIdAtom, newNode.id);
    }
  },
});

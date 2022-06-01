import { atom, DefaultValue, selector } from 'recoil';

import { nodeAtom } from './nodeAtom';
import { MazeNode } from './types';

export const endNodeIdAtom = atom<string | null>({
  key: 'endNodeId',
  default: null,
});

export const endNodeAtom = selector<MazeNode | null>({
  key: 'endNode',
  get: ({ get }) => {
    const endNodeId = get(endNodeIdAtom);
    if (endNodeId) {
      return get(nodeAtom(endNodeId));
    }
    return null;
  },
  set: ({ set, get }, newNode) => {
    const endNodeId = get(endNodeIdAtom);
    if (endNodeId) {
      set(nodeAtom(endNodeId), (node) => ({ ...node, isEnd: false }));
    }
    if (!(newNode instanceof DefaultValue) && newNode) {
      set(nodeAtom(newNode.id), (node) => ({ ...node, isEnd: true }));
      set(endNodeIdAtom, newNode.id);
    }
  },
});

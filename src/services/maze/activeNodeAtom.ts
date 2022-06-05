import { atom, DefaultValue, selector } from 'recoil';

import { nodeAtom } from './nodeAtom';
import { MazeNode } from './types';

export const activeNodeIdAtom = atom<string | null>({
  key: 'activeNodeId',
  default: null,
});

export const activeNodeAtom = selector<MazeNode | null>({
  key: 'activeNode',
  get: ({ get }) => {
    const activeNodeId = get(activeNodeIdAtom);
    if (activeNodeId) {
      return get(nodeAtom(activeNodeId));
    }
    return null;
  },
  set: ({ set, get }, newNode) => {
    const activeNodeId = get(activeNodeIdAtom);

    if (activeNodeId) {
      set(nodeAtom(activeNodeId), (node) => ({ ...node, isActive: false }));
    }
    if (!(newNode instanceof DefaultValue) && newNode) {
      set(nodeAtom(newNode.id), (node) => ({ ...node, isActive: true }));
      set(activeNodeIdAtom, newNode.id);
    } else {
      set(activeNodeIdAtom, null);
    }
  },
});

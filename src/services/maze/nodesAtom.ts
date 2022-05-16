import { atom } from 'recoil';

export const nodesAtom = atom<string[]>({
  key: 'nodes',
  default: [],
});

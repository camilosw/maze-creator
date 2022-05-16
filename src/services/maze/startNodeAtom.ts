import { atom } from 'recoil';

export const startNodeAtom = atom<string | null>({
  key: 'startNode',
  default: null,
});

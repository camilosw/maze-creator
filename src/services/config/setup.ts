import { atom } from 'recoil';

export const setupAtom = atom<boolean>({
  key: 'setup',
  default: true,
});

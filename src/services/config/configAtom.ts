import { atom } from 'recoil';

type Config = {
  width: number;
  height: number;
  gridSpacing: number;
};

export const configAtom = atom<Config>({
  key: 'config',
  default: {
    width: 1000,
    height: 500,
    gridSpacing: 25,
  },
});

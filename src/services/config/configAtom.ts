import { atom } from 'recoil';

type Config = {
  width: number;
  height: number;
  gridSpacing: number;
};

export const configAtom = atom<Config>({
  key: 'config',
  default: {
    width: 10,
    height: 10,
    gridSpacing: 20,
  },
});

import { atom } from 'recoil';

type Layers = {
  walls: boolean;
  dots: boolean;
  paths: boolean;
};

export const layersAtom = atom<Layers>({
  key: 'layers',
  default: {
    walls: true,
    dots: true,
    paths: true,
  },
});

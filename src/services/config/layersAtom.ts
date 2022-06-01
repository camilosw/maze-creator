import { atom } from 'recoil';

type Layers = {
  grid: boolean;
  walls: boolean;
  nodePoints: boolean;
  paths: boolean;
};

export const layersAtom = atom<Layers>({
  key: 'layers',
  default: {
    grid: true,
    walls: true,
    nodePoints: true,
    paths: true,
  },
});

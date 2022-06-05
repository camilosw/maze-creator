import { atom } from 'recoil';

type Layers = {
  grid: boolean;
  walls: boolean;
  nodePoints: boolean;
  paths: boolean;
  depth: boolean;
};

export const layersAtom = atom<Layers>({
  key: 'layers',
  default: {
    grid: true,
    walls: true,
    nodePoints: true,
    paths: true,
    depth: false,
  },
});

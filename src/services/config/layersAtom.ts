import { atom } from 'recoil';

type Layers = {
  grid: boolean;
  walls: boolean;
  nodePoints: boolean;
  paths: boolean;
  pathsColor: 'bw' | 'color';
  depth: boolean;
  pathLength: boolean;
  deadEndLength: boolean;
};

export const layersAtom = atom<Layers>({
  key: 'layers',
  default: {
    grid: true,
    walls: true,
    nodePoints: true,
    paths: true,
    pathsColor: 'color',
    depth: false,
    pathLength: false,
    deadEndLength: false,
  },
});

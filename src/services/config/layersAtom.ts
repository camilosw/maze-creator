import { atom } from 'recoil';

import { HighlightOption } from './types';

type Layers = {
  grid: boolean;
  walls: boolean;
  nodePoints: boolean;
  paths: boolean;
  pathsColor: 'bw' | 'color';
  highlight: null | HighlightOption;
};

export const layersAtom = atom<Layers>({
  key: 'layers',
  default: {
    grid: true,
    walls: true,
    nodePoints: true,
    paths: true,
    pathsColor: 'color',
    highlight: null,
  },
});

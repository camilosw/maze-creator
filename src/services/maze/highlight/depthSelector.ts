import chroma from 'chroma-js';
import { selector } from 'recoil';

import { nodesSelector } from '../nodesSelector';

export const depthColorScaleSelector = selector({
  key: 'depthColorScaleSelector',
  get: ({ get }) => {
    const biggestDepth = get(nodesSelector)?.reduce(
      (acc, node) => Math.max(node.depth, acc),
      0,
    );

    const domain: [number, number] = [1, biggestDepth];

    const colorScale = chroma.scale(['#0277BD', '#F44336']).domain(domain);

    return { colorScale, domain };
  },
});

import { selector } from 'recoil';

import { nodesSelector } from './nodesSelector';

export const statsSelector = selector({
  key: 'stats',
  get: ({ get }) => {
    const nodes = get(nodesSelector);

    const branches = nodes.reduce(
      (acc, node) =>
        acc +
        Math.max(
          0,
          node.connections.length -
            (node.isStart && node.connections.length > 1 ? 0 : 2),
        ),
      0,
    );

    return {
      branches,
    };
  },
});

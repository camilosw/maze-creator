import { selector } from 'recoil';

import { nodesSelector } from './nodesSelector';

export const statsSelector = selector({
  key: 'stats',
  get: ({ get }) => {
    const nodes = get(nodesSelector);

    const branches = nodes.reduce((acc, node) => {
      const connections = node.connections.length;
      if (node.isStart) {
        return acc + (connections > 1 ? connections : 0);
      }
      return acc + (connections > 2 ? connections - 1 : 0);
    }, 0);

    return {
      branches,
      nodes: nodes.length,
    };
  },
});

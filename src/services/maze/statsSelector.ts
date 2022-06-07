import { selector } from 'recoil';

import { nodesSelector } from './nodesSelector';

export const statsSelector = selector({
  key: 'statsSelector',
  get: ({ get }) => {
    const nodes = get(nodesSelector);

    const branches = nodes.reduce((acc, node) => {
      const connections = node.connections.length;
      if (node.isStart) {
        return acc + (connections > 1 ? connections : 0);
      }
      return acc + (connections > 2 ? connections - 1 : 0);
    }, 0);

    const junctions = nodes.reduce(
      (acc, node) =>
        acc + Number(node.connections.length > (node.isStart ? 1 : 2)),
      0,
    );

    return {
      branches,
      nodes: nodes.length,
      junctions,
    };
  },
});

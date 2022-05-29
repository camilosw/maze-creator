import { selector } from 'recoil';

import { configAtom } from 'services/config';
import { nodeAtom } from './nodeAtom';
import { nodesSelector } from './nodesSelector';

const sides = [
  // [x1, y1, x2, y2]
  [-1, -1, 1, -1], // top
  [1, -1, 1, 1], // right
  [-1, 1, 1, 1], // bottom
  [-1, -1, -1, 1], // left
];

export const wallsSelector = selector({
  key: 'wallsSelector',
  get: ({ get }) => {
    const config = get(configAtom);
    const nodes = get(nodesSelector);
    return nodes.reduce<Record<string, number[]>>((acc, node) => {
      const connectedNodes = node.connections.map((nodeId) =>
        get(nodeAtom(nodeId)),
      );
      const sideConnections = sides
        .filter((side) => {
          const x = (side[0] + side[2]) / 2;
          const y = (side[1] + side[3]) / 2;
          const isConnected = !connectedNodes.find((connectedNode) => {
            return (
              x === (connectedNode.x - node.x) / config.gridSpacing &&
              y === (connectedNode.y - node.y) / config.gridSpacing
            );
          });
          return isConnected;
        })
        .map((side) => [
          node.x + (side[0] * config.gridSpacing) / 2,
          node.y + (side[1] * config.gridSpacing) / 2,
          node.x + (side[2] * config.gridSpacing) / 2,
          node.y + (side[3] * config.gridSpacing) / 2,
        ])
        .reduce((acc2, side) => ({ ...acc2, [side.toString()]: side }), {});
      return { ...acc, ...sideConnections };
    }, {});
  },
});

import chroma from 'chroma-js';
import { GetRecoilValue, selector } from 'recoil';

import { configAtom } from 'services/config';
import { nodeAtom } from './nodeAtom';
import { nodesAtom } from './nodesAtom';
import { startNodeAtom } from './startNodeAtom';
import { MazeNode } from './types';

type DepthNode = {
  x: number;
  y: number;
  color: string;
};

const makeDepth = (
  currentNode: MazeNode,
  get: GetRecoilValue,
  gridSpacing: number,
  colorScale: chroma.Scale<chroma.Color>,
): DepthNode[] => {
  const depthNodes = currentNode.connections
    .filter((connection) => {
      const connectionNode = get(nodeAtom(connection));
      return connectionNode.depth > currentNode.depth;
    })
    .map((connection) => {
      const nextNode = get(nodeAtom(connection));
      const nextDepthNodes = makeDepth(nextNode, get, gridSpacing, colorScale);
      const depthNode = {
        x: nextNode.x - gridSpacing / 2,
        y: nextNode.y - gridSpacing / 2,
        color: colorScale(nextNode.depth).hex(),
      };
      return [...nextDepthNodes, depthNode];
    })
    .flat();

  return depthNodes;
};

export const depthSelector = selector({
  key: 'depthSelector',
  get: ({ get }) => {
    get(nodesAtom);
    const { gridSpacing } = get(configAtom);
    const startNode = get(startNodeAtom);
    if (startNode) {
      const biggestDepth = get(nodesAtom).reduce(
        (acc, nodeId) => Math.max(get(nodeAtom(nodeId)).depth, acc),
        0,
      );
      const colorScale = chroma
        .scale(['#0277BD', '#F44336'])
        .domain([1, biggestDepth]);
      const currentDepth = {
        x: startNode.x - gridSpacing / 2,
        y: startNode.y - gridSpacing / 2,
        color: colorScale(startNode.depth).hex(),
      };
      return [
        currentDepth,
        ...makeDepth(startNode, get, gridSpacing, colorScale),
      ];
    }
  },
});

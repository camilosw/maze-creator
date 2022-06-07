import { GetRecoilValue, selector } from 'recoil';

import { configAtom } from 'services/config';
import { nodeAtom } from './nodeAtom';
import { nodesAtom } from './nodesAtom';
import { startNodeAtom } from './startNodeAtom';
import { MazeNode } from './types';

type LengthNode = {
  x: number;
  y: number;
  length: number;
};

const visitNodes = (
  currentNode: MazeNode,
  get: GetRecoilValue,
  gridSpacing: number,
  lastBranchDepth: number,
): LengthNode[] => {
  const nextNodes = currentNode.connections
    .filter((connection) => {
      const connectionNode = get(nodeAtom(connection));
      return connectionNode.depth > currentNode.depth;
    })
    .map((connection) => {
      const nextNode = get(nodeAtom(connection));
      const isBranch =
        nextNode.connections.length >= (nextNode.isStart ? 2 : 3);
      const nextBranchDepth = isBranch ? nextNode.depth : lastBranchDepth;
      return visitNodes(nextNode, get, gridSpacing, nextBranchDepth);
    })
    .flat();

  const isBranch =
    currentNode.connections.length >= (currentNode.isStart ? 2 : 3);

  return [
    {
      x: currentNode.x - gridSpacing / 2,
      y: currentNode.y - gridSpacing / 2,
      length: isBranch
        ? currentNode.depth - lastBranchDepth
        : Math.max(
            nextNodes[0]?.length || 0,
            currentNode.depth - lastBranchDepth,
          ),
    },
    ...nextNodes,
  ];
};

export const pathLengthSelector = selector({
  key: 'pathLengthSelector',
  get: ({ get }) => {
    get(nodesAtom);
    const { gridSpacing } = get(configAtom);
    const startNode = get(startNodeAtom);
    if (startNode) {
      return visitNodes(startNode, get, gridSpacing, 0);
    }
  },
});

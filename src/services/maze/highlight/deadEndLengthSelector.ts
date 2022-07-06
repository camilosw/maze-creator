import chroma from 'chroma-js';
import { GetRecoilValue, selector } from 'recoil';

import { configAtom } from 'services/config';
import { nodeAtom } from '../nodeAtom';
import { nodesAtom } from '../nodesAtom';
import { startNodeAtom } from '../startNodeAtom';
import { MazeNode } from '../types';

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
      length:
        isBranch || currentNode.isEnd || nextNodes[0]?.length === 0
          ? 0
          : Math.max(
              nextNodes[0]?.length || 0,
              currentNode.depth - lastBranchDepth,
            ),
    },
    ...nextNodes,
  ];
};

export const deadEndLengthSelector = selector({
  key: 'deadEndLengthSelector',
  get: ({ get }) => {
    get(nodesAtom);
    const { gridSpacing } = get(configAtom);
    const startNode = get(startNodeAtom);
    if (startNode) {
      return visitNodes(startNode, get, gridSpacing, 0);
    }
  },
});

export const deadEndLenghtColorScaleSelector = selector({
  key: 'deadEndLenghtColorScaleSelector',
  get: ({ get }) => {
    const maxLength =
      get(deadEndLengthSelector)?.reduce(
        (acc, node) => Math.max(acc, node.length),
        0,
      ) || 0;

    const domain: [number, number] = [1, Math.max(10, maxLength)];

    const colorScale = chroma
      .scale(['#dc3545', '#adb5bd', '#3d8bfd'])
      .mode('lab')
      .domain(domain);

    return { colorScale, domain };
  },
});

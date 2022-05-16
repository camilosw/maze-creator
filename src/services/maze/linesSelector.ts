import { GetRecoilValue, selector } from 'recoil';

import { MazeNode, nodeAtom } from 'services/maze';
import { nodesAtom } from './nodesAtom';
import { startNodeAtom } from './startNodeAtom';

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const makeLine = (
  currentNode: MazeNode,
  get: GetRecoilValue,
  previousNodeId?: string,
): Line[] => {
  const lines = currentNode.connections
    .filter((connection) => connection !== previousNodeId)
    .map((connection) => {
      const nextNode = get(nodeAtom(connection));
      const nextLines = makeLine(nextNode, get, currentNode.id);
      const line = {
        x1: currentNode.x,
        y1: currentNode.y,
        x2: nextNode.x,
        y2: nextNode.y,
      };
      return [...nextLines, line];
    })
    .flat();

  return lines;
};

export const linesSelector = selector({
  key: 'lines',
  get: ({ get }) => {
    get(nodesAtom);
    const currentNodeId = get(startNodeAtom);
    if (currentNodeId) {
      const currentNode = get(nodeAtom(currentNodeId));
      return makeLine(currentNode, get);
    }
  },
});

import { GetRecoilValue, selector } from 'recoil';

import { getColorId } from 'services/color';
import { MazeNode, nodeAtom } from 'services/maze';
import { nodesAtom } from './nodesAtom';
import { startNodeAtom } from './startNodeAtom';

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const makeLine = (
  currentNode: MazeNode,
  get: GetRecoilValue,
  colorId: number = 0,
  previousNodeId?: string,
): Line[] => {
  const hasBranch =
    currentNode.connections.length >= 3 ||
    (currentNode.isStart && currentNode.connections.length >= 2);
  let nextColorId = colorId;
  const lines = currentNode.connections
    .filter((connection) => connection !== previousNodeId)
    .map((connection) => {
      const nextNode = get(nodeAtom(connection));
      nextColorId = hasBranch ? nextColorId + 1 : nextColorId;
      const nextLines = makeLine(nextNode, get, nextColorId, currentNode.id);
      const line = {
        x1: currentNode.x,
        y1: currentNode.y,
        x2: nextNode.x,
        y2: nextNode.y,
        color: getColorId(nextColorId),
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

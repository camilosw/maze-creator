import { RecoilState, Snapshot, useRecoilCallback } from 'recoil';

import { nodeAtom } from './nodeAtom';
import { startNodeAtom } from './startNodeAtom';
import { MazeNode } from './types';

const visitNext = (
  currentNode: MazeNode,
  depth: number,
  snapshot: Snapshot,
  set: <T>(
    recoilVal: RecoilState<T>,
    valOrUpdater: T | ((currVal: T) => T),
  ) => void,
  previousNode?: MazeNode,
) => {
  set(nodeAtom(currentNode.id), (prevNode) => ({ ...prevNode, depth }));
  currentNode.connections
    .filter((nodeId) => !previousNode || nodeId !== previousNode.id)
    .forEach((nodeId) =>
      visitNext(
        snapshot.getLoadable(nodeAtom(nodeId)).getValue(),
        depth + 1,
        snapshot,
        set,
        currentNode,
      ),
    );
};

export const useCalculateDepth = () => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const startNode = snapshot.getLoadable(startNodeAtom).getValue();
    if (startNode) {
      visitNext(startNode, 1, snapshot, set);
    }
  });
};

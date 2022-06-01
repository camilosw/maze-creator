import { RecoilState, Snapshot, useRecoilCallback } from 'recoil';

import { MazeNode, nodeAtom, startNodeAtom } from 'services/maze';
import { endNodeAtom } from './endNodeAtom';

const visitNext = (
  currentNode: MazeNode,
  endNode: MazeNode,
  snapshot: Snapshot,
  set: <T>(
    recoilVal: RecoilState<T>,
    valOrUpdater: T | ((currVal: T) => T),
  ) => void,
  previousNode?: MazeNode,
): boolean => {
  if (currentNode.id === endNode.id) {
    set(nodeAtom(currentNode.id), (prevNode) => ({
      ...prevNode,
      isExitPath: true,
    }));
    return true;
  }

  return !!currentNode.connections
    .filter((nodeId) => !previousNode || nodeId !== previousNode.id)
    .find((nodeId) => {
      const isExitPath = visitNext(
        snapshot.getLoadable(nodeAtom(nodeId)).getValue(),
        endNode,
        snapshot,
        set,
        currentNode,
      );
      if (isExitPath) {
        set(nodeAtom(nodeId), (prevNode) => ({
          ...prevNode,
          isExitPath: true,
        }));
      }
      return isExitPath;
    });
};

export const useCalculateExitPath = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const startNode = snapshot.getLoadable(startNodeAtom).getValue();
        const endNode = snapshot.getLoadable(endNodeAtom).getValue();
        if (startNode && endNode) {
          visitNext(startNode, endNode, snapshot, set);
        }
      },
    [],
  );
};

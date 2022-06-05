import { RecoilState, Snapshot, useRecoilCallback } from 'recoil';

import { activeNodeAtom } from './activeNodeAtom';
import { nodeAtom } from './nodeAtom';
import { nodesAtom } from './nodesAtom';
import { MazeNode } from './types';
import { useClearPath } from './useClearPath';

const visitNext = (
  currentNode: MazeNode,
  snapshot: Snapshot,
  set: <T>(
    recoilVal: RecoilState<T>,
    valOrUpdater: T | ((currVal: T) => T),
  ) => void,
  reset: (recoilVal: RecoilState<any>) => void,
  clearPath: () => void,
) => {
  currentNode.connections
    .filter((nodeId) => {
      const connectedNode = snapshot.getLoadable(nodeAtom(nodeId)).getValue();
      return connectedNode.depth > currentNode.depth;
    })
    .forEach((nodeId) =>
      visitNext(
        snapshot.getLoadable(nodeAtom(nodeId)).getValue(),
        snapshot,
        set,
        reset,
        clearPath,
      ),
    );
  reset(nodeAtom(currentNode.id));
  set(nodesAtom, (nodes) => nodes.filter((id) => id !== currentNode.id));
  if (currentNode.isEnd) {
    clearPath();
  }
};

export const useDeleteNode = () => {
  const clearPath = useClearPath();
  return useRecoilCallback(
    ({ set, reset, snapshot }) =>
      (deleteNode: MazeNode) => {
        visitNext(deleteNode, snapshot, set, reset, clearPath);
        deleteNode.connections.forEach((id) => {
          const connectedNode = snapshot.getLoadable(nodeAtom(id)).getValue();
          set(nodeAtom(connectedNode.id), (prevNode) => ({
            ...prevNode,
            connections: prevNode.connections.filter(
              (id) => id !== deleteNode.id,
            ),
          }));
        });
        set(activeNodeAtom, null);
      },
  );
};

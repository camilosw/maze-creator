import { useRecoilCallback } from 'recoil';

import {
  activeNodeAtom,
  activeNodeIdAtom,
  nodeAtom,
  nodesAtom,
} from 'services/maze';
import { startNodeAtom } from './startNodeAtom';
import { MazeNode } from './types';

export const useCreateNode = () => {
  const createNode = useRecoilCallback(
    ({ set, snapshot }) =>
      (x: number, y: number) => {
        const id = `${x}-${y}`;
        const activeNodeId = snapshot.getLoadable(activeNodeIdAtom).getValue();

        const connections = activeNodeId ? [activeNodeId] : [];
        const isStart = !snapshot.getLoadable(nodesAtom).getValue().length;
        const newNode: MazeNode = {
          id,
          x,
          y,
          connections,
          isActive: true,
          isStart: isStart,
        };

        set(nodesAtom, (nodes) => [...nodes, id]);
        set(nodeAtom(id), newNode);
        if (activeNodeId) {
          set(nodeAtom(activeNodeId), (node) => ({
            ...node,
            connections: [...node.connections, id],
          }));
        }

        set(activeNodeAtom, newNode);
        if (isStart) {
          set(startNodeAtom, id);
        }
      },
    [],
  );

  return createNode;
};

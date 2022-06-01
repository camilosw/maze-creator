import { useRecoilCallback } from 'recoil';

import { configAtom } from 'services/config';
import { activeNodeAtom, nodeAtom, nodesAtom } from 'services/maze';
import { startNodeIdAtom } from './startNodeAtom';
import { MazeNode } from './types';

export const useCreateNode = () => {
  const createNode = useRecoilCallback(
    ({ set, snapshot }) =>
      (x: number, y: number) => {
        const id = `${x}-${y}`;
        const activeNode = snapshot.getLoadable(activeNodeAtom).getValue();
        const config = snapshot.getLoadable(configAtom).getValue();

        if (
          activeNode &&
          Math.hypot(Math.abs(x - activeNode.x), Math.abs(y - activeNode.y)) >
            config.gridSpacing
        ) {
          return;
        }

        const connections = activeNode ? [activeNode.id] : [];
        const isStart = !snapshot.getLoadable(nodesAtom).getValue().length;
        const newNode: MazeNode = {
          id,
          x,
          y,
          connections,
          isActive: true,
          isStart: isStart,
          isEnd: false,
          isExitPath: false,
        };

        set(nodesAtom, (nodes) => [...nodes, id]);
        set(nodeAtom(id), newNode);
        if (activeNode) {
          set(nodeAtom(activeNode.id), (node) => ({
            ...node,
            connections: [...node.connections, id],
          }));
        }

        set(activeNodeAtom, newNode);
        if (isStart) {
          set(startNodeIdAtom, id);
        }
      },
    [],
  );

  return createNode;
};

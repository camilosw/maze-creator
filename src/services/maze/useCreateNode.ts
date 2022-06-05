import { useRecoilCallback } from 'recoil';

import { configAtom } from 'services/config';
import { activeNodeAtom, nodeAtom, nodesAtom } from 'services/maze';
import { startNodeIdAtom } from './startNodeAtom';
import { MazeNode } from './types';

export const useCreateNode = () => {
  const createNode = useRecoilCallback(
    ({ set, snapshot }) =>
      (x: number, y: number) => {
        const activeNode = snapshot.getLoadable(activeNodeAtom).getValue();
        const nodesCount = snapshot.getLoadable(nodesAtom).getValue().length;
        if (!activeNode && nodesCount) return;

        let nodeCoordinates: [number, number][] = [];

        if (activeNode) {
          const xDistance = x - activeNode.x;
          const yDistance = y - activeNode.y;
          if (xDistance !== 0 && yDistance !== 0) {
            return;
          }

          const config = snapshot.getLoadable(configAtom).getValue();
          const nodesCount =
            Math.abs(xDistance + yDistance) / config.gridSpacing;
          const isHorizontal = !!xDistance;

          nodeCoordinates = Array.from({ length: nodesCount }).map((_, i) => {
            const nextX = isHorizontal
              ? x -
                config.gridSpacing *
                  (nodesCount - 1 - i) *
                  (xDistance / Math.abs(xDistance))
              : x;
            const nextY = isHorizontal
              ? y
              : y -
                config.gridSpacing *
                  (nodesCount - 1 - i) *
                  (yDistance / Math.abs(yDistance));
            return [nextX, nextY];
          });
        } else {
          nodeCoordinates = [[x, y]];
        }

        const intersectPath = nodeCoordinates.find(([nextX, nextY]) => {
          const node = snapshot
            .getLoadable(nodeAtom(`${nextX}-${nextY}`))
            .getValue();
          if (node.x === nextX && node.y === nextY) return true;
          return false;
        });

        if (intersectPath) return;

        const isStart = !nodesCount;

        const nodes = nodeCoordinates.map(([nextX, nextY], index) => {
          const id = `${nextX}-${nextY}`;
          const node: MazeNode = {
            id,
            x: nextX,
            y: nextY,
            connections: [],
            isActive: index === nodeCoordinates.length - 1,
            isStart: isStart && !index,
            isEnd: false,
            isExitPath: false,
            depth: index + 1 + (activeNode?.depth ?? 0),
          };

          return node;
        });

        nodes.forEach((node, i) => {
          const prevNode = i === 0 ? activeNode : nodes[i - 1];
          const nextNode = i === nodes.length - 1 ? null : nodes[i + 1];
          if (prevNode) node.connections.push(prevNode.id);
          if (nextNode) node.connections.push(nextNode.id);

          set(nodesAtom, (nodes) => [...nodes, node.id]);
          set(nodeAtom(node.id), node);

          if (i === nodes.length - 1) {
            set(activeNodeAtom, node);
            if (node.isStart) {
              set(startNodeIdAtom, node.id);
            }
          }
        });

        if (activeNode) {
          set(nodeAtom(activeNode.id), (node) => ({
            ...node,
            connections: [...node.connections, nodes[0].id],
          }));
        }
      },
    [],
  );

  return createNode;
};

import { useRecoilCallback } from 'recoil';

import { nodeAtom, nodesAtom } from 'services/maze';

export const useClearPath = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const nodes = snapshot.getLoadable(nodesAtom).getValue();
        nodes.map((nodeId) =>
          set(nodeAtom(nodeId), (currentNode) => ({
            ...currentNode,
            isExitPath: false,
          })),
        );
      },
    [],
  );
};

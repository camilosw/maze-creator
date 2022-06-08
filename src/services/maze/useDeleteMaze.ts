import { useRecoilCallback } from 'recoil';

import { activeNodeAtom } from './activeNodeAtom';
import { nodeAtom } from './nodeAtom';
import { nodesAtom } from './nodesAtom';

export const useDeleteMaze = () => {
  return useRecoilCallback(({ snapshot, reset }) => () => {
    snapshot
      .getLoadable(nodesAtom)
      .getValue()
      .map((nodeId) => reset(nodeAtom(nodeId)));
    reset(activeNodeAtom);
    reset(nodesAtom);
  });
};

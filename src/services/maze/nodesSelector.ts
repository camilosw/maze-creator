import { selector } from 'recoil';

import { nodeAtom } from './nodeAtom';
import { nodesAtom } from './nodesAtom';

export const nodesSelector = selector({
  key: 'nodesSelector',
  get: ({ get }) => {
    return get(nodesAtom).map((id) => get(nodeAtom(id)));
  },
});

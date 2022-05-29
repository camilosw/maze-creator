import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { activeNodeAtom, endNodeAtom, startNodeAtom } from 'services/maze';

const Toolbar = () => {
  const setStartNode = useSetRecoilState(startNodeAtom);
  const setEndNode = useSetRecoilState(endNodeAtom);
  const activeNode = useRecoilValue(activeNodeAtom);

  return (
    <div>
      <button onClick={() => activeNode && setStartNode(activeNode)}>
        Set start
      </button>
      <button onClick={() => activeNode && setEndNode(activeNode)}>
        Set end
      </button>
    </div>
  );
};

export default Toolbar;

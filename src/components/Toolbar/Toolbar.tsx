import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  activeNodeAtom,
  endNodeAtom,
  startNodeAtom,
  useCalculateDepth,
  useCalculateExitPath,
  useClearPath,
} from 'services/maze';

const Toolbar = () => {
  const setStartNode = useSetRecoilState(startNodeAtom);
  const setEndNode = useSetRecoilState(endNodeAtom);
  const activeNode = useRecoilValue(activeNodeAtom);
  const clearPath = useClearPath();
  const calculateExitPath = useCalculateExitPath();
  const calculateDepth = useCalculateDepth();

  const setStart = () => {
    if (!activeNode) return;
    setStartNode(activeNode);
    calculateDepth();
    clearPath();
    calculateExitPath();
  };

  const setEnd = () => {
    if (!activeNode) return;
    setEndNode(activeNode);
    clearPath();
    calculateExitPath();
  };

  return (
    <div>
      <button onClick={setStart}>Set start</button>
      <button onClick={setEnd}>Set end</button>
    </div>
  );
};

export default Toolbar;

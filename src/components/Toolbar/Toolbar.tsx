import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  activeNodeAtom,
  endNodeAtom,
  startNodeAtom,
  useCalculateDepth,
  useCalculateExitPath,
  useClearPath,
  useDeleteNode,
} from 'services/maze';

const Toolbar = () => {
  const setStartNode = useSetRecoilState(startNodeAtom);
  const setEndNode = useSetRecoilState(endNodeAtom);
  const activeNode = useRecoilValue(activeNodeAtom);
  const clearPath = useClearPath();
  const calculateExitPath = useCalculateExitPath();
  const calculateDepth = useCalculateDepth();
  const deleteNode = useDeleteNode();

  const handleSetStart = () => {
    if (!activeNode) return;
    setStartNode(activeNode);
    calculateDepth();
    clearPath();
    calculateExitPath();
  };

  const handleSetEnd = () => {
    if (!activeNode) return;
    setEndNode(activeNode);
    clearPath();
    calculateExitPath();
  };

  const handleDeleteNode = () => {
    if (!activeNode) return;
    deleteNode(activeNode);
  };

  return (
    <div>
      <button onClick={handleSetStart}>Set start</button>
      <button onClick={handleSetEnd}>Set end</button>
      <button onClick={handleDeleteNode}>Delete node</button>
    </div>
  );
};

export default Toolbar;

import { Button } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ReactComponent as BoxArrowInRight } from 'assets/boxArrowInRight.svg';
import { ReactComponent as BoxArrowRight } from 'assets/boxArrowRight.svg';
import { ReactComponent as FileEarmark } from 'assets/fileEarmark.svg';
import { ReactComponent as XSquare } from 'assets/xSquare.svg';
import SaveImage from 'components/SaveImage';
import {
  activeNodeAtom,
  endNodeAtom,
  startNodeAtom,
  useCalculateDepth,
  useCalculateExitPath,
  useClearPath,
  useDeleteMaze,
  useDeleteNode,
} from 'services/maze';
import cn from './Toolbar.module.scss';

type Props = {
  onNew(): void;
};

const Toolbar = ({ onNew }: Props) => {
  const setStartNode = useSetRecoilState(startNodeAtom);
  const setEndNode = useSetRecoilState(endNodeAtom);
  const activeNode = useRecoilValue(activeNodeAtom);
  const clearPath = useClearPath();
  const calculateExitPath = useCalculateExitPath();
  const calculateDepth = useCalculateDepth();
  const deleteMaze = useDeleteMaze();
  const deleteNode = useDeleteNode();

  const handleNew = () => {
    deleteMaze();
    onNew();
  };

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
    <div className={cn.toolbar}>
      <div className={cn.group}>
        <Button variant="light" onClick={handleNew} title="Create new maze">
          <FileEarmark />
        </Button>
        <SaveImage />
      </div>

      <div className={cn.group}>
        <Button variant="light" onClick={handleSetStart} title="Set start">
          <BoxArrowInRight />
        </Button>
        <Button variant="light" onClick={handleSetEnd} title="Set end">
          <BoxArrowRight />
        </Button>
        <Button variant="light" onClick={handleDeleteNode} title="Delete node">
          <XSquare />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;

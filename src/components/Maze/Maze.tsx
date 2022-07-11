import { useRecoilValue } from 'recoil';

import DeadEndLength from 'components/DeadEndLength';
import Depth from 'components/Depth';
import Grid from 'components/Grid';
import Lines from 'components/Lines';
import Nodes from 'components/Nodes';
import PathLength from 'components/PathLength';
import Walls from 'components/Walls';
import { configAtom } from 'services/config';
import cn from './Maze.module.scss';

const Maze = () => {
  const config = useRecoilValue(configAtom);
  const width = config.width * config.gridSpacing + 4;
  const height = config.height * config.gridSpacing + 4;

  return (
    <div className={cn.maze}>
      <svg width={width} height={height}>
        <g transform="translate(2,2)">
          <Grid />
          <Depth />
          <PathLength />
          <DeadEndLength />
          <Lines />
          <Nodes />
          <Walls />
        </g>
      </svg>
    </div>
  );
};

export default Maze;

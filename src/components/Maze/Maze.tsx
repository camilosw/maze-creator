import { useRecoilValue } from 'recoil';

import DeadEndLength from 'components/DeadEndLength';
import Depth from 'components/Depth';
import Grid from 'components/Grid';
import Lines from 'components/Lines';
import Nodes from 'components/Nodes';
import PathLength from 'components/PathLength';
import Walls from 'components/Walls';
import { configAtom } from 'services/config';

const Maze = () => {
  const config = useRecoilValue(configAtom);

  return (
    <svg
      width={config.width * config.gridSpacing}
      height={config.height * config.gridSpacing}
    >
      <Grid />
      <Depth />
      <PathLength />
      <DeadEndLength />
      <Lines />
      <Nodes />
      <Walls />
    </svg>
  );
};

export default Maze;

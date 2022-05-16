import { useRecoilValue } from 'recoil';

import Grid from 'components/Grid';
import Lines from 'components/Lines';
import Nodes from 'components/Nodes';
import { configAtom } from 'services/config';

const Maze = () => {
  const config = useRecoilValue(configAtom);

  return (
    <svg width={config.width} height={config.height}>
      <Grid />
      <Lines />
      <Nodes />
    </svg>
  );
};

export default Maze;

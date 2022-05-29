import React from 'react';
import { useRecoilValue } from 'recoil';

import { statsSelector } from 'services/maze/statsSelector';

const Stats = () => {
  const stats = useRecoilValue(statsSelector);

  return (
    <div>
      Stats
      <div>Nodes: {stats.nodes}</div>
      <div>Branches: {stats.branches}</div>
    </div>
  );
};

export default Stats;

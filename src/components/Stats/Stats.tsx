import React from 'react';
import { useRecoilValue } from 'recoil';

import { statsSelector } from 'services/maze/statsSelector';

const Stats = () => {
  const stats = useRecoilValue(statsSelector);

  return (
    <div>
      Stats
      <div>Junctions: {stats.junctions}</div>
      <div>Branches: {stats.branches}</div>
      <div>Dead ends: {stats.deadEnds}</div>
      <div>Nodes: {stats.nodes}</div>
    </div>
  );
};

export default Stats;

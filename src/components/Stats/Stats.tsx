import React from 'react';
import { useRecoilValue } from 'recoil';

import { statsSelector } from 'services/maze/statsSelector';
import cn from './Stats.module.scss';

const Stats = () => {
  const stats = useRecoilValue(statsSelector);

  return (
    <div>
      <div className={cn.data}>
        <div className={cn.value}>{stats.junctions}</div>{' '}
        <div className={cn.label}>junctions</div>
      </div>
      <div className={cn.data}>
        <div className={cn.value}>{stats.branches}</div>{' '}
        <div className={cn.label}>branches</div>
      </div>
      <div className={cn.data}>
        <div className={cn.value}>{stats.deadEnds}</div>{' '}
        <div className={cn.label}>dead ends</div>
      </div>
      <div className={cn.data}>
        <div className={cn.value}>{stats.nodes}</div>{' '}
        <div className={cn.label}>nodes</div>
      </div>
    </div>
  );
};

export default Stats;

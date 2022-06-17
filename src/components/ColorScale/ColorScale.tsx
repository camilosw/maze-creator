import React from 'react';
import { Color, Scale } from 'chroma-js';

import cn from './ColorScale.module.scss';

type Props = {
  colorScale: Scale<Color>;
  domain: [number, number];
};

const ColorScale = ({ colorScale, domain }: Props) => {
  const gradient = Array.from({ length: 20 })
    .map(
      (_, index, arr) =>
        domain[0] + ((domain[1] - domain[0]) / arr.length) * index,
    )
    .map((value) => colorScale(value).hex())
    .reduce((acc, value) => `${acc},${value}`, 'to right');

  return (
    <div>
      <div
        className={cn.gradient}
        style={{
          background: `linear-gradient(${gradient})`,
        }}
      />
      <div className={cn.domain}>
        <div>{domain[0]}</div>
        <div>{(domain[1] - domain[0]) / 2}</div>
        <div>{domain[1]}</div>
      </div>
    </div>
  );
};

export default ColorScale;

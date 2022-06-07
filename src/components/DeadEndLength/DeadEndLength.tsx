import React from 'react';
import chroma from 'chroma-js';
import { useRecoilValue } from 'recoil';

import { configAtom, layersAtom } from 'services/config';
import { deadEndLengthSelector } from 'services/maze/deadEndLengthSelector';

const DeadEndLengthDraw = () => {
  const deadEndLength = useRecoilValue(deadEndLengthSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

  const maxLength =
    deadEndLength?.reduce((acc, node) => Math.max(acc, node.length), 0) || 0;

  const colorScale = chroma
    .scale(['red', 'grey', 'blue'])
    .mode('lab')
    .domain([1, Math.max(10, maxLength)]);

  return (
    <>
      {deadEndLength
        ?.filter((node) => node.length)
        .map((node) => (
          <rect
            key={`${node.x}-${node.y}`}
            x={node.x}
            y={node.y}
            width={gridSpacing}
            height={gridSpacing}
            fill={colorScale(node.length).hex()}
            shapeRendering="crispEdges"
          />
        ))}
    </>
  );
};

const DeadEndLength = () => {
  const { deadEndLength } = useRecoilValue(layersAtom);

  if (!deadEndLength) return null;

  return <DeadEndLengthDraw />;
};

export default DeadEndLength;

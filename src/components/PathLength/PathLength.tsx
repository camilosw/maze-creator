import React from 'react';
import chroma from 'chroma-js';
import { useRecoilValue } from 'recoil';

import { configAtom, HighlightOption, layersAtom } from 'services/config';
import { pathLengthSelector } from 'services/maze/pathLegthSelector';

const PathLengthDraw = () => {
  const pathLength = useRecoilValue(pathLengthSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

  const maxLength =
    pathLength?.reduce((acc, node) => Math.max(acc, node.length), 0) || 0;

  const colorScale = chroma
    .scale(['red', 'grey', 'blue'])
    .mode('lab')
    .domain([1, maxLength]);

  return (
    <>
      {pathLength
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

const PathLength = () => {
  const { highlight } = useRecoilValue(layersAtom);

  if (highlight !== HighlightOption.PathLength) return null;

  return <PathLengthDraw />;
};

export default PathLength;

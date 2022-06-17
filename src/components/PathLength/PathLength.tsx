import React from 'react';
import { useRecoilValue } from 'recoil';

import { configAtom, HighlightOption, layersAtom } from 'services/config';
import {
  pathLengthColorScaleSelector,
  pathLengthSelector,
} from 'services/maze';

const PathLengthDraw = () => {
  const pathLength = useRecoilValue(pathLengthSelector);
  const { colorScale } = useRecoilValue(pathLengthColorScaleSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

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

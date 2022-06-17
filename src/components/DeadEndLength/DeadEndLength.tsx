import React from 'react';
import { useRecoilValue } from 'recoil';

import { configAtom, HighlightOption, layersAtom } from 'services/config';
import {
  deadEndLenghtColorScaleSelector,
  deadEndLengthSelector,
} from 'services/maze';

const DeadEndLengthDraw = () => {
  const deadEndLength = useRecoilValue(deadEndLengthSelector);
  const { colorScale } = useRecoilValue(deadEndLenghtColorScaleSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

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
  const { highlight } = useRecoilValue(layersAtom);

  if (highlight !== HighlightOption.DeadEndLength) return null;

  return <DeadEndLengthDraw />;
};

export default DeadEndLength;

import React from 'react';
import { useRecoilValue } from 'recoil';

import { configAtom, HighlightOption, layersAtom } from 'services/config';
import { depthColorScaleSelector, nodesSelector } from 'services/maze';

const DepthDraw = () => {
  const nodes = useRecoilValue(nodesSelector);
  const { colorScale } = useRecoilValue(depthColorScaleSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

  return (
    <>
      {nodes?.map((node) => (
        <rect
          key={`${node.x}${node.y}`}
          x={node.x - gridSpacing / 2}
          y={node.y - gridSpacing / 2}
          width={gridSpacing}
          height={gridSpacing}
          fill={colorScale(node.depth).hex()}
          shapeRendering="crispEdges"
        />
      ))}
    </>
  );
};

const Depth = () => {
  const { highlight } = useRecoilValue(layersAtom);

  if (highlight !== HighlightOption.Depth) return null;

  return <DepthDraw />;
};

export default Depth;

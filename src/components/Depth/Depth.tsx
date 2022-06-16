import React from 'react';
import chroma from 'chroma-js';
import { useRecoilValue } from 'recoil';

import { configAtom, HighlightOption, layersAtom } from 'services/config';
import { nodesSelector } from 'services/maze';

const DepthDraw = () => {
  const nodes = useRecoilValue(nodesSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

  const biggestDepth = nodes.reduce(
    (acc, node) => Math.max(node.depth, acc),
    0,
  );
  const colorScale = chroma
    .scale(['#0277BD', '#F44336'])
    .domain([1, biggestDepth]);

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

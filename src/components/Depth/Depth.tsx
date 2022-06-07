import React from 'react';
import { useRecoilValue } from 'recoil';

import { configAtom, layersAtom } from 'services/config';
import { depthSelector } from 'services/maze';

const DepthDraw = () => {
  const depthNodes = useRecoilValue(depthSelector);
  const { gridSpacing } = useRecoilValue(configAtom);

  return (
    <>
      {depthNodes?.map((node) => (
        <rect
          key={`${node.x}${node.y}`}
          x={node.x}
          y={node.y}
          width={gridSpacing}
          height={gridSpacing}
          fill={node.color}
          shapeRendering="crispEdges"
        />
      ))}
    </>
  );
};

const Depth = () => {
  const { depth } = useRecoilValue(layersAtom);

  if (!depth) return null;

  return <DepthDraw />;
};

export default Depth;

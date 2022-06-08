import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

import { configAtom, layersAtom } from 'services/config';
import { useCreateNode } from 'services/maze';
import cn from './Grid.module.css';

const Grid = () => {
  const { grid } = useRecoilValue(layersAtom);
  const { width, height, gridSpacing } = useRecoilValue(configAtom);
  const createNode = useCreateNode();

  const points = Array.from({ length: Math.floor(height) }, (_, i) =>
    Array.from({ length: Math.floor(width) }, (_, j) => ({
      x: j * gridSpacing + gridSpacing / 2,
      y: i * gridSpacing + gridSpacing / 2,
    })),
  );

  return (
    <>
      {points.flat().map((point, index) => (
        <Fragment key={index}>
          {grid && <circle cx={point.x} cy={point.y} r="1" fill="#78909C" />}
          <circle
            cx={point.x}
            cy={point.y}
            r="6"
            className={cn.dot}
            onClick={() => createNode(point.x, point.y)}
          />
        </Fragment>
      ))}
    </>
  );
};

export default Grid;

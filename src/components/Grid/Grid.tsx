import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

import { configAtom } from 'services/config';
import { useCreateNode } from 'services/maze';
import cn from './Grid.module.css';

const Grid = () => {
  const { width, height, gridSpacing } = useRecoilValue(configAtom);
  const createNode = useCreateNode();

  const points = Array.from(
    { length: Math.floor(height / gridSpacing) },
    (_, i) =>
      Array.from({ length: Math.floor(width / gridSpacing) }, (_, j) => ({
        x: j * gridSpacing + gridSpacing / 2,
        y: i * gridSpacing + gridSpacing / 2,
      })),
  );

  return (
    <>
      {points.flat().map((point, index) => (
        <Fragment key={index}>
          <circle cx={point.x} cy={point.y} r="1" />
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

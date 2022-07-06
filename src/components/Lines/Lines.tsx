import React from 'react';
import { useRecoilValue } from 'recoil';

import { layersAtom } from 'services/config';
import { linesSelector } from 'services/maze';

const DrawLines = () => {
  const lines = useRecoilValue(linesSelector);
  const { pathsColor } = useRecoilValue(layersAtom);

  return (
    <>
      {lines?.map((line) => (
        <line
          key={`${line.x1}${line.y1}${line.x2}${line.y2}`}
          {...line}
          stroke="#ffffff"
          strokeWidth={line.width + 2}
          strokeLinecap="round"
        />
      ))}
      {lines?.map((line) => (
        <line
          key={`${line.x1}${line.y1}${line.x2}${line.y2}`}
          {...line}
          stroke={pathsColor === 'color' ? line.color : '#212529'}
          strokeWidth={line.width}
          strokeLinecap="round"
        />
      ))}
    </>
  );
};

const Lines = () => {
  const { paths } = useRecoilValue(layersAtom);

  if (!paths) return null;

  return <DrawLines />;
};

export default Lines;

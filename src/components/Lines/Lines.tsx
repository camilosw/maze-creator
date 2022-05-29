import { useRecoilValue } from 'recoil';

import { layersAtom } from 'services/config';
import { linesSelector } from 'services/maze';

const Lines = () => {
  const { paths } = useRecoilValue(layersAtom);
  const lines = useRecoilValue(linesSelector);

  if (!paths) return null;

  return (
    <>
      {lines?.map((line) => (
        <line
          key={`${line.x1}${line.y1}${line.x2}${line.y2}`}
          {...line}
          stroke={line.color}
          strokeWidth="2"
        />
      ))}
    </>
  );
};

export default Lines;

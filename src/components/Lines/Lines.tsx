import { useRecoilValue } from 'recoil';

import { linesSelector } from 'services/maze';

const Lines = () => {
  const lines = useRecoilValue(linesSelector);

  return (
    <>
      {lines?.map((line) => (
        <line
          key={`${line.x1}${line.y1}${line.x2}${line.y2}`}
          {...line}
          stroke="black"
          strokeWidth="2"
        />
      ))}
    </>
  );
};

export default Lines;

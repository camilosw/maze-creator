import React from 'react';
import { useRecoilValue } from 'recoil';

import Node from 'components/Node';
import { nodesAtom } from 'services/maze';

const Nodes = () => {
  const nodes = useRecoilValue(nodesAtom);

  return (
    <>
      {nodes.map((id) => (
        <Node key={id} id={id} />
      ))}
    </>
  );
};

export default Nodes;

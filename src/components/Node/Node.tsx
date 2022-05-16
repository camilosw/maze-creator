import cns from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { activeNodeAtom, nodeAtom, startNodeAtom } from 'services/maze';
import cn from './Node.module.css';

type Props = {
  id: string;
};

const Node = ({ id }: Props) => {
  const node = useRecoilValue(nodeAtom(id));
  const setActiveNode = useSetRecoilState(activeNodeAtom);
  const startNode = useRecoilValue(startNodeAtom);

  return (
    <circle
      cx={node.x}
      cy={node.y}
      r={id === startNode ? 8 : 6}
      fill="green"
      className={cns(cn.node, {
        [cn.active]: node.isActive,
      })}
      onClick={() => setActiveNode(node)}
    />
  );
};

export default Node;

import cns from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { layersAtom } from 'services/config';
import { activeNodeAtom, nodeAtom, startNodeAtom } from 'services/maze';
import cn from './Node.module.css';

type Props = {
  id: string;
};

const Node = ({ id }: Props) => {
  const { paths } = useRecoilValue(layersAtom);
  const node = useRecoilValue(nodeAtom(id));
  const setActiveNode = useSetRecoilState(activeNodeAtom);
  const startNode = useRecoilValue(startNodeAtom);

  return (
    <>
      <circle
        cx={node.x}
        cy={node.y}
        r={id === startNode ? 6 : 3}
        className={cns(cn.node, {
          [cn.active]: node.isActive,
          [cn.hide]: !paths,
        })}
      />

      <circle
        cx={node.x}
        cy={node.y}
        r="8"
        className={cn.transparent}
        onClick={() => setActiveNode(node)}
      />
    </>
  );
};

export default Node;

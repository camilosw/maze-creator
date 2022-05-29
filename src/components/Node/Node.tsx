import cns from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { layersAtom } from 'services/config';
import { activeNodeAtom, nodeAtom } from 'services/maze';
import cn from './Node.module.css';

type Props = {
  id: string;
};

const Node = ({ id }: Props) => {
  const { paths } = useRecoilValue(layersAtom);
  const node = useRecoilValue(nodeAtom(id));
  const setActiveNode = useSetRecoilState(activeNodeAtom);

  return (
    <>
      <circle
        cx={node.x}
        cy={node.y}
        r={node.isStart || node.isEnd ? 6 : 3}
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

import cns from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { configAtom, layersAtom } from 'services/config';
import { activeNodeAtom, nodeAtom } from 'services/maze';
import cn from './Node.module.scss';

type Props = {
  id: string;
};

const Node = ({ id }: Props) => {
  const { nodePoints } = useRecoilValue(layersAtom);
  const node = useRecoilValue(nodeAtom(id));
  const { gridSpacing } = useRecoilValue(configAtom);
  const setActiveNode = useSetRecoilState(activeNodeAtom);

  return (
    <>
      <circle
        cx={node.x}
        cy={node.y}
        r={node.isStart || node.isEnd ? 6 : 3}
        className={cns(cn.node, {
          [cn.active]: node.isActive,
          [cn.hide]: !nodePoints,
        })}
      />

      <rect
        x={node.x - gridSpacing / 2}
        y={node.y - gridSpacing / 2}
        width={gridSpacing}
        height={gridSpacing}
        className={cn.transparent}
        onClick={() => setActiveNode(node)}
      />
    </>
  );
};

export default Node;

import React from 'react';
import { useRecoilState } from 'recoil';

import Checkbox from 'components/Checkbox/Checkbox';
import Radio from 'components/Radio';
import { layersAtom } from 'services/config';
import cn from './Layers.module.scss';

const Layers = () => {
  const [layers, setLayers] = useRecoilState(layersAtom);

  const handleOnChange = (name: keyof typeof layers) => {
    setLayers({ ...layers, [name]: !layers[name] });
  };

  const handleOnValueChange = (name: keyof typeof layers, value: string) => {
    setLayers({ ...layers, [name]: value });
  };

  return (
    <div>
      <div className="title">Layers</div>
      <Checkbox
        label="Grid"
        name="grid"
        checked={layers.grid}
        onChange={() => handleOnChange('grid')}
      />
      <Checkbox
        label="Nodes"
        name="nodePoints"
        checked={layers.nodePoints}
        onChange={() => handleOnChange('nodePoints')}
      />
      <Checkbox
        label="Walls"
        name="walls"
        checked={layers.walls}
        onChange={() => handleOnChange('walls')}
      />
      <Checkbox
        label="Paths"
        name="paths"
        checked={layers.paths}
        onChange={() => handleOnChange('paths')}
      />
      {layers.paths && (
        <div className={cn.radio}>
          <Radio
            label="Color"
            name="pathsColor"
            checked={layers.pathsColor === 'color'}
            onChange={() => handleOnValueChange('pathsColor', 'color')}
          />
          <Radio
            label="BW"
            name="pathsColor"
            checked={layers.pathsColor === 'bw'}
            onChange={() => handleOnValueChange('pathsColor', 'bw')}
          />
        </div>
      )}

      <div className="title">Highlight</div>
      <Checkbox
        label="Depth"
        name="depth"
        checked={layers.depth}
        onChange={() => handleOnChange('depth')}
      />
      <Checkbox
        label="Paths length"
        name="pathLength"
        checked={layers.pathLength}
        onChange={() => handleOnChange('pathLength')}
      />
      <Checkbox
        label="Dead ends length"
        name="deadEndLength"
        checked={layers.deadEndLength}
        onChange={() => handleOnChange('deadEndLength')}
      />
    </div>
  );
};

export default Layers;

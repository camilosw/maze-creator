import React from 'react';
import { useRecoilState } from 'recoil';

import Checkbox from 'components/Checkbox/Checkbox';
import Radio from 'components/Radio';
import { ColorOption, layersAtom } from 'services/config';
import cn from './Layers.module.scss';

const Layers = () => {
  const [layers, setLayers] = useRecoilState(layersAtom);

  const handleOnChange = (name: keyof typeof layers) => {
    setLayers({ ...layers, [name]: !layers[name] });
  };

  const handleOnColorChange = (value: ColorOption) => {
    setLayers({ ...layers, pathsColor: value });
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
            checked={layers.pathsColor === ColorOption.Color}
            onChange={() => handleOnColorChange(ColorOption.Color)}
          />
          <Radio
            label="BW"
            name="pathsColor"
            checked={layers.pathsColor === ColorOption.BW}
            onChange={() => handleOnColorChange(ColorOption.BW)}
          />
        </div>
      )}
    </div>
  );
};

export default Layers;

import React from 'react';
import { useRecoilState } from 'recoil';

import Checkbox from 'components/Checkbox/Checkbox';
import Radio from 'components/Radio';
import { ColorOption, HighlightOption, layersAtom } from 'services/config';
import cn from './Layers.module.scss';

const Layers = () => {
  const [layers, setLayers] = useRecoilState(layersAtom);

  const handleOnChange = (name: keyof typeof layers) => {
    setLayers({ ...layers, [name]: !layers[name] });
  };

  const handleOnColorChange = (value: ColorOption) => {
    setLayers({ ...layers, pathsColor: value });
  };

  const handleOnHighlightChange = (value: HighlightOption) => {
    const newValue = value === layers.highlight ? null : value;
    setLayers({ ...layers, highlight: newValue });
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

      <div className="title">Highlight</div>
      <Checkbox
        label="Depth"
        name="depth"
        checked={layers.highlight === HighlightOption.Depth}
        onChange={() => handleOnHighlightChange(HighlightOption.Depth)}
      />
      <Checkbox
        label="Paths length"
        name="pathLength"
        checked={layers.highlight === HighlightOption.PathLength}
        onChange={() => handleOnHighlightChange(HighlightOption.PathLength)}
      />
      <Checkbox
        label="Dead ends length"
        name="deadEndLength"
        checked={layers.highlight === HighlightOption.DeadEndLength}
        onChange={() => handleOnHighlightChange(HighlightOption.DeadEndLength)}
      />
    </div>
  );
};

export default Layers;

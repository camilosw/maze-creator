import React from 'react';
import { useRecoilState } from 'recoil';

import Checkbox from 'components/Checkbox/Checkbox';
import { layersAtom } from 'services/config';

const Layers = () => {
  const [layers, setLayers] = useRecoilState(layersAtom);

  const handleOnChange = (name: keyof typeof layers) => {
    setLayers({ ...layers, [name]: !layers[name] });
  };

  return (
    <div>
      <Checkbox
        label="grid"
        name="grid"
        checked={layers.grid}
        onChange={() => handleOnChange('grid')}
      />
      <Checkbox
        label="walls"
        name="walls"
        checked={layers.walls}
        onChange={() => handleOnChange('walls')}
      />
      <Checkbox
        label="paths"
        name="paths"
        checked={layers.paths}
        onChange={() => handleOnChange('paths')}
      />
      <Checkbox
        label="nodes"
        name="nodePoints"
        checked={layers.nodePoints}
        onChange={() => handleOnChange('nodePoints')}
      />
      <h2>Descriptors</h2>
      <Checkbox
        label="Depth"
        name="depth"
        checked={layers.depth}
        onChange={() => handleOnChange('depth')}
      />
    </div>
  );
};

export default Layers;

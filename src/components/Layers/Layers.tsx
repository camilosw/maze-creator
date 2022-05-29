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
        label="dots"
        name="dots"
        checked={layers.dots}
        onChange={() => handleOnChange('dots')}
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
    </div>
  );
};

export default Layers;

import React from 'react';
import { useRecoilState } from 'recoil';

import Checkbox from 'components/Checkbox/Checkbox';
import { layersAtom } from 'services/config';

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
      {layers.paths && (
        <>
          <label htmlFor="pathsColor">
            <input
              type="radio"
              name="pathsColor"
              checked={layers.pathsColor === 'bw'}
              onChange={() => handleOnValueChange('pathsColor', 'bw')}
            />
            <span>BW</span>
          </label>
          <label htmlFor="pathsColor">
            <input
              type="radio"
              name="pathsColor"
              checked={layers.pathsColor === 'color'}
              onChange={() => handleOnValueChange('pathsColor', 'color')}
            />
            <span>Color</span>
          </label>
        </>
      )}
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

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Checkbox from 'components/Checkbox';
import ColorScale from 'components/ColorScale';
import { HighlightOption, layersAtom } from 'services/config';
import {
  deadEndLenghtColorScaleSelector,
  depthColorScaleSelector,
  pathLengthColorScaleSelector,
} from 'services/maze';

const DepthColorScale = () => {
  const { colorScale, domain } = useRecoilValue(depthColorScaleSelector);

  return <ColorScale colorScale={colorScale} domain={domain} />;
};

const PathLengthColorScale = () => {
  const { colorScale, domain } = useRecoilValue(pathLengthColorScaleSelector);

  return <ColorScale colorScale={colorScale} domain={domain} />;
};

const DeadEndLengthColorScale = () => {
  const { colorScale, domain } = useRecoilValue(
    deadEndLenghtColorScaleSelector,
  );

  return <ColorScale colorScale={colorScale} domain={domain} />;
};

const Hightlight = () => {
  const [layers, setLayers] = useRecoilState(layersAtom);

  const handleOnHighlightChange = (value: HighlightOption) => {
    const newValue = value === layers.highlight ? null : value;
    setLayers({ ...layers, highlight: newValue });
  };

  return (
    <div>
      <div className="title">Highlight</div>

      <Checkbox
        label="Depth"
        name="depth"
        checked={layers.highlight === HighlightOption.Depth}
        onChange={() => handleOnHighlightChange(HighlightOption.Depth)}
      />
      {layers.highlight === HighlightOption.Depth && <DepthColorScale />}

      <Checkbox
        label="Paths length"
        name="pathLength"
        checked={layers.highlight === HighlightOption.PathLength}
        onChange={() => handleOnHighlightChange(HighlightOption.PathLength)}
      />
      {layers.highlight === HighlightOption.PathLength && (
        <PathLengthColorScale />
      )}

      <Checkbox
        label="Dead ends length"
        name="deadEndLength"
        checked={layers.highlight === HighlightOption.DeadEndLength}
        onChange={() => handleOnHighlightChange(HighlightOption.DeadEndLength)}
      />
      {layers.highlight === HighlightOption.DeadEndLength && (
        <DeadEndLengthColorScale />
      )}
    </div>
  );
};

export default Hightlight;

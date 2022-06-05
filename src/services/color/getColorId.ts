import chroma from 'chroma-js';

const GOLDEN_RATIO = 1.61803398875;

export const getColorId = (id: number) => {
  const h = (id * (1 / GOLDEN_RATIO) * 360) % 360;

  return chroma.hsl(h, 0.8, 0.7).hex();
};

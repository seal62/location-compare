import { useMemo } from 'react';
import { Type } from 'ol/geom/Geometry';

import { styles as featureStyles } from "./styles";
import { vector } from '../source';
import { VectorLayer } from '../layers/vector-layer';
import { DrawInteraction } from '../interactions/draw-interaction';

type FeaturesProps = {
  disabled: boolean;
  drawTool: Type;
}

export const Features = ({ disabled, drawTool }: FeaturesProps) => {
  const source = useMemo(() => vector({}), []);

  if (disabled) {
    return null;
  }

  return (
    <>
      <DrawInteraction source={source} drawTool={drawTool} />
      <VectorLayer
        source={source}
        style={featureStyles.MultiPolygon}
        zIndex={1}
      />
    </>
  )
}

import { useEffect, useMemo, useState } from "react";
import { Type } from "ol/geom/Geometry";
import { GeoJSON } from "ol/format";

import { styles as featureStyles } from "./styles";
import { vector } from "../source";
import { VectorLayer } from "../layers/vector-layer";
import { DrawInteraction } from "../interactions/draw-interaction";
import { useMapContext } from "../map/map-context";
import { SelectInteraction } from "../interactions/select-interaction";

type FeaturesProps = {
  disabled: boolean;
  drawTool: Type | undefined;
  features: any[];
  onDrawEnd(feature: any): void;
};

export const Features = ({
  disabled,
  drawTool,
  features,
  onDrawEnd,
}: FeaturesProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { map } = useMapContext();
  const source = useMemo(() => vector({ map }), [map]);

  useEffect(() => {
    if (source) {
      features.forEach((feature) => {
        const olFeatures = new GeoJSON().readFeatures(feature);
        source.addFeatures(olFeatures);
      });
    }

    return () => {
      // TODO - probably not very efficient
      source?.clear();
      // features.forEach((feature) => {
      //   source?.removeFeature(feature);
      // });
    };
  }, [source, features]);

  if (disabled || !source) {
    return null;
  }

  return (
    <>
      <DrawInteraction
        source={source}
        drawTool={drawTool}
        onDrawEnd={onDrawEnd}
      />
      <SelectInteraction
        drawTool={drawTool}
        selectedFeatures={selectedFeatures}
      />
      <VectorLayer
        source={source}
        style={featureStyles.MultiPolygon}
        zIndex={1}
      />
    </>
  );
};

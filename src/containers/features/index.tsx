import { useCallback, useMemo, useState } from "react";
import { Type } from "ol/geom/Geometry";

import { styles as featureStyles } from "./styles";
import { vector } from "../source";
import { VectorLayer } from "../layers/vector-layer";
import { DrawInteraction } from "../interactions/draw-interaction";
import { useMapContext } from "../map/map-context";
import { SelectInteraction } from "../interactions/select-interaction";
import { Feature } from "ol";
import { KeyboardInteraction } from "../interactions/keyboard-interaction";

type FeaturesProps = {
  disabled: boolean;
  drawTool: Type | undefined;
  onDrawEnd(feature: Feature): void;
};

export const Features = ({ disabled, drawTool, onDrawEnd }: FeaturesProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const { map } = useMapContext();
  const source = useMemo(() => vector({ map }), [map]);

  const handleSelection = useCallback(
    (selected: Feature[], deselected: Feature[]) => {
      setSelectedFeatures((state: Feature[]) =>
        [...state, ...selected].filter(
          (feat) =>
            !deselected.some(
              (des) => des.getProperties().id === feat.getProperties().id
            )
        )
      );
    },
    []
  );

  const handleDelete = useCallback(() => {
    if (!map) return;

    selectedFeatures.forEach((feature) => source?.removeFeature(feature));
  }, [selectedFeatures, map, source]);

  // useEffect(() => {
  //   if (source) {
  //     features.forEach((feature) => {
  //       const olFeatures = new GeoJSON().readFeatures(feature);
  //       source.addFeatures(olFeatures);
  //     });
  //   }

  //   return () => {
  //     // TODO - probably not very efficient
  //     source?.clear();
  //     // features.forEach((feature) => {
  //     //   source?.removeFeature(feature);
  //     // });
  //   };
  // }, [source, features]);

  // console.log(selectedFeatures);

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
        // selectedFeatures={selectedFeatures}
        onSelection={handleSelection}
      />
      <KeyboardInteraction handleDelete={handleDelete} />
      <VectorLayer
        source={source}
        style={featureStyles.MultiPolygon}
        zIndex={1}
      />
    </>
  );
};

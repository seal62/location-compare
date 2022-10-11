import { useContext, useEffect } from "react";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";

import { MapContext } from "../map/map-context";

type VectorLayerProps = {
  source: VectorSource;
  style?: Style;
  zIndex?: number;
};

export const VectorLayer = ({
  source,
  style,
  zIndex = 0,
}: VectorLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
};

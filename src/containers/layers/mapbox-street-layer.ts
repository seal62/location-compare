import { useContext, useEffect } from "react";
import MapboxVectorLayer from "ol/layer/MapboxVector";

import { MapContext } from "../map/map-context";

type MapboxStreetLayerProps = {
  zIndex?: number;
};

export const MapboxStreetLayer = ({ zIndex = 0 }: MapboxStreetLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const key =
      "sk.eyJ1IjoibGRlbm5pczE5ODciLCJhIjoiY2xlODJjdXhtMDF5NTNvcWd1ZmZobjVnMCJ9.xz_kG1ohZlxi-T5U0a3Ivg";
    const tileLayer = new MapboxVectorLayer({
      accessToken: key,
      styleUrl: "mapbox://styles/mapbox/streets-v11",
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, zIndex]);

  return null;
};

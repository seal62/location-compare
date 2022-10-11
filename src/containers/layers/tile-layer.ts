import { useContext, useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";

import { MapContext } from "../map/map-context";

type TileLayerProps = {
  source: TileSource;
  zIndex?: number;
};

export const TileLayer = ({ source, zIndex = 0 }: TileLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};

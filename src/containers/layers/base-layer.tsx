import { useMemo } from "react";

import { TileLayer } from "./tile-layer";
import { mapboxSatellite } from "../source";
import { MapboxStreetLayer } from "./mapbox-street-layer";

type BaseLayerProps = {
  type: string;
};

export const BaseLayer = ({ type }: BaseLayerProps) => {
  const layer = useMemo(() => {
    switch (type) {
      case "street":
        return <MapboxStreetLayer zIndex={0} />;
      default:
        return <TileLayer source={mapboxSatellite()} zIndex={0} />;
    }
  }, [type]);

  return layer;
};

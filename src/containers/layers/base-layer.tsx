import { useMemo } from "react";

import { TileLayer } from "./tile-layer";
import { mapboxSatellite } from "../source";
import { MapboxStreetLayer } from "./mapbox-street-layer";

type BaseLayerProps = {
  type: BaseLayers;
};

export enum BaseLayers {
  Street = "street",
  Satellite = "satellite",
}

export const BaseLayer = ({ type }: BaseLayerProps) => {
  const layer = useMemo(() => {
    switch (type) {
      case BaseLayers.Street:
        return <MapboxStreetLayer zIndex={0} />;
      default:
        return <TileLayer source={mapboxSatellite()} zIndex={0} />;
    }
  }, [type]);

  return layer;
};

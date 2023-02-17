import { useMemo } from "react";
import { Map } from "ol";
import { apply } from "ol-mapbox-style";

import { TileLayer } from "./tile-layer";
import { mapTilerSatellite, mapTilerOpenMapTiles } from "../source";
import { getMapTilerKey } from "../../utils";

type BaseLayerProps = {
  type: BaseLayers;
  map: Map | null;
};

export enum BaseLayers {
  Street = "street",
  Satellite = "satellite",
}

export const BaseLayer = ({ type, map }: BaseLayerProps) => {
  const layer = useMemo(() => {
    switch (type) {
      case BaseLayers.Street: {
        if (map) {
          apply(
            map,
            `https://api.maptiler.com/maps/basic-v2/style.json?key=${getMapTilerKey()}`
          );
        }
        return <TileLayer source={mapTilerOpenMapTiles()} zIndex={0} />;
      }
      // return <MapboxStreetLayer zIndex={0} />;
      default:
        return <TileLayer source={mapTilerSatellite()} zIndex={0} />;
    }
  }, [type, map]);

  return layer;
};

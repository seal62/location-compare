import { createContext, useContext, useState } from "react";
import { fromLonLat } from "ol/proj";

import mapConfig from "../../config.json";

const INITIAL_ZOOM = 11;
const INITIAL_CENTER = fromLonLat(mapConfig.center);

const initialMapState = {
  position: INITIAL_CENTER,
  zoom: INITIAL_ZOOM,
  features: [],
};

export const IndependentMapContext = createContext<{
  position: any;
  zoom: number;
  features: any[];
}>(initialMapState);

export const useIndependentMapContext = () => useContext(IndependentMapContext);

type IndependentMapContextProviderProps = {
  children?: JSX.Element | JSX.Element[];
};

export const IndependentMapContextProvider = ({
  children,
}: IndependentMapContextProviderProps) => {
  const [mapState, useMapState] = useState(initialMapState);

  return (
    <IndependentMapContext.Provider value={mapState}>
      {children}
    </IndependentMapContext.Provider>
  );
};

import { createContext, useContext } from "react";
import { Map } from "ol";

export const MapContext = createContext<{ map: Map | null }>({ map: null });

export const useMapContext = () => useContext(MapContext);

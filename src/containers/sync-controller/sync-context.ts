import { createContext, useContext } from "react";
import { Coordinate } from "ol/coordinate";

import config from "../../config.json";
import { fromLonLat } from "ol/proj";

type SyncCenter = (center: Coordinate) => void;
type SyncZoom = (zoom: number, mapId: string) => void;

type SyncContextType = {
  syncCenter: SyncCenter;
  syncedCenter: Coordinate;
  syncZoom: SyncZoom;
  syncedZoom: { zoom: number; fromMapId: string };
  syncLocked: boolean;
  handleSyncLocked(locked: boolean): void;
};

const syncContextInitialState = {
  syncCenter: (center: Coordinate) => null,
  syncedCenter: fromLonLat(config.center),
  syncZoom: (zoom: number, mapId: string) => null,
  syncedZoom: { zoom: 12, fromMapId: "" },
  syncLocked: false,
  handleSyncLocked: (locked: boolean) => null,
};
export const SyncContext = createContext<SyncContextType>(
  syncContextInitialState
);

export const useSyncContext = () => useContext(SyncContext);

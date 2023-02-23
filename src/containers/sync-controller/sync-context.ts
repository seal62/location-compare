import { createContext, useContext } from "react";

type SyncZoom = (zoom: number, mapId: string) => void;

type SyncContextType = {
  syncZoom: SyncZoom;
  syncedZoom: { zoom: number; fromMapId: string };
};

const syncContextInitialState = {
  syncZoom: (zoom: number, mapId: string) => null,
  syncedZoom: { zoom: 12, fromMapId: "" },
};
export const SyncContext = createContext<SyncContextType>(
  syncContextInitialState
);

export const useSyncContext = () => useContext(SyncContext);

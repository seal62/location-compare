import { Coordinate } from "ol/coordinate"
import { useCallback, useState } from "react"

import { SyncContext } from "./sync-context";
import config from '../../config.json';
import { fromLonLat } from "ol/proj";

type SyncProviderProps = {
  children: JSX.Element | JSX.Element[];
}

export const SyncProvider = ({ children }: SyncProviderProps) => {
  const [syncedCenter, setSyncedCenter] = useState(fromLonLat(config.center));
  const [syncedZoom, setSyncedZoom] = useState({ zoom: 11, fromMapId: '' });
  const [syncLocked, setSyncLocked] = useState(false);

  const syncCenter = useCallback((center: Coordinate) => {
    setSyncedCenter(center)
  }, []);

  const syncZoom = useCallback((zoom: number, mapId: string) => {
    setSyncedZoom({ zoom, fromMapId: mapId });
  }, []);

  const handleSyncLocked = useCallback((locked: boolean) => setSyncLocked(locked), []);

  return (
    <SyncContext.Provider value={{ syncCenter, syncedCenter, syncZoom, syncedZoom, syncLocked, handleSyncLocked }}>
      {children}
    </SyncContext.Provider>
  )
}

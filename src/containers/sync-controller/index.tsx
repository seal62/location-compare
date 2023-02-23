import { useCallback, useState } from "react";

import { SyncContext } from "./sync-context";

type SyncProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const SyncProvider = ({ children }: SyncProviderProps) => {
  const [syncedZoom, setSyncedZoom] = useState({ zoom: 11, fromMapId: "" });

  const syncZoom = useCallback((zoom: number, mapId: string) => {
    setSyncedZoom({ zoom, fromMapId: mapId });
  }, []);

  return (
    <SyncContext.Provider
      value={{
        syncZoom,
        syncedZoom,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

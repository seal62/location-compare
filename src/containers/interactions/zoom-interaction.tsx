import { getUid, MapBrowserEvent } from "ol";
import { useCallback, useEffect } from "react";
import Interaction from "ol/interaction/Interaction";

import { useMapContext } from "../map/map-context";
import { useSyncContext } from "../sync-controller/sync-context";
import { addInteraction } from "./utils";

type ZoomInteractionProps = {
  // handleMapZooming(dragging: boolean): void;
  active: boolean;
};

export const ZoomInteraction = ({ active }: ZoomInteractionProps) => {
  const { map } = useMapContext();
  const { syncZoom } = useSyncContext();

  const handleZoomEvent = useCallback(
    (evt: MapBrowserEvent<any>) => {
      if (["wheel"].includes(evt.type)) {
        // console.log("zoom", evt);
        const zoom = evt.map.getView().getZoom();
        const mapId = getUid(evt.map);
        // console.log('zoom', zoom);
        if (zoom) {
          syncZoom(zoom, mapId);
        }
      }

      return true;
    },
    [syncZoom]
  );

  useEffect(() => {
    if (!map || !active) return;

    const interaction = new Interaction({
      handleEvent: (evt) => handleZoomEvent(evt),
    });

    interaction.set("name", "Zoom");
    addInteraction(interaction, map);
  }, [map, handleZoomEvent, active]);

  return null;
};

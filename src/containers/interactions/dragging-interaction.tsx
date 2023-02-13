import { useCallback, useEffect, useRef } from "react";
import { MapBrowserEvent } from "ol";
import Interaction from "ol/interaction/Interaction";

import { useMapContext } from "../map/map-context";
import { useSyncContext } from "../sync-controller/sync-context";
import { addInteraction } from "./utils";

type DraggingInteractionProps = {};

export const DraggingInteraction = ({}: DraggingInteractionProps) => {
  const isDraggingRef = useRef(false);
  const { map } = useMapContext();
  const { syncCenter } = useSyncContext();

  const handleDragEvent = useCallback(
    (evt: MapBrowserEvent<any>) => {
      if (["pointerdrag", "pointermove"].includes(evt.type)) {
        // start dragging
        if (!isDraggingRef.current && evt.dragging) {
          isDraggingRef.current = true;
          // handleMapDragging(true);
          // console.log('start dragging', evt.coordinate)
        }

        // stop dragging
        if (isDraggingRef.current && !evt.dragging) {
          isDraggingRef.current = false;
          // handleMapDragging(false);
          // console.log('stop dragging')
        }

        // dragging
        if (evt.dragging) {
          const mapCenter = evt.map.getView().getCenter();
          // console.log('dragging', mapCenter);
          if (mapCenter) {
            syncCenter(mapCenter);
          }
        }
      }

      return true;
    },
    [syncCenter]
  );

  useEffect(() => {
    if (!map) return;

    const interaction = new Interaction({
      handleEvent: (evt) => handleDragEvent(evt),
    });

    interaction.set("name", "Dragging");
    addInteraction(interaction, map);
  }, [map, handleDragEvent]);

  return null;
};

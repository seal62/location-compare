import { MapBrowserEvent } from "ol";
import { Interaction } from "ol/interaction";
import { EventTypes } from "ol/Observable";
import { useCallback, useEffect } from "react";
import { useMapContext } from "../map/map-context";
import { addInteraction } from "./utils";

class KeyboardEventInteraction extends Interaction {
  handleEvent(mapBrowserEvent: MapBrowserEvent<any>): boolean {
    let stopEvent = false;
    if (mapBrowserEvent.type === "keydown") {
      const keyEvent = mapBrowserEvent.originalEvent;

      if (keyEvent.code === "Backspace") {
        console.log(keyEvent);
        stopEvent = true;
        this.dispatchEvent("delete");
      }

      if (stopEvent) {
        keyEvent.preventDefault();
      }
    }

    return !stopEvent;
  }
}

type KeyboardInteractionProps = {
  handleDelete(): void;
};

export const KeyboardInteraction = ({
  handleDelete,
}: KeyboardInteractionProps) => {
  const { map } = useMapContext();

  const onDelete = useCallback(() => handleDelete(), [handleDelete]);

  useEffect(() => {
    if (!map) return;

    const keyboard = new KeyboardEventInteraction();
    addInteraction(keyboard, map);

    const deleteType = "delete" as EventTypes;
    keyboard.on([deleteType], onDelete);

    return () => {
      map.removeInteraction(keyboard);
    };
  }, [map, onDelete]);

  return null;
};

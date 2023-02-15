import { useCallback, useEffect } from "react";
import { Type } from "ol/geom/Geometry";
import Select, { SelectEvent } from "ol/interaction/Select";
import { addInteraction } from "./utils";
import { useMapContext } from "../map/map-context";
import { Feature } from "ol";

type SelectInteractionProps = {
  drawTool: Type | undefined;
  // selectedFeatures: Feature[];
  onSelection(selected: Feature[], deselected: Feature[]): void;
};

export const SelectInteraction = ({
  drawTool,
  // selectedFeatures,
  onSelection,
}: SelectInteractionProps) => {
  const { map } = useMapContext();

  const handleOnSelect = useCallback(
    (selection: any) => {
      const { selected, deselected } = selection as SelectEvent;
      onSelection(selected, deselected);
    },
    [onSelection]
  );

  useEffect(() => {
    if (!map) return;
    if (drawTool) return;

    const select = new Select();

    select.on(["select"], handleOnSelect);

    addInteraction(select, map);

    return () => {
      map.removeInteraction(select);
    };
  }, [map, drawTool, handleOnSelect]);

  return null;
};

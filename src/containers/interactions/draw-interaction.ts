import { useCallback, useEffect } from "react";
import { GeoJSON } from "ol/format";
import { Draw, Modify, Snap } from "ol/interaction";
import { Type } from "ol/geom/Geometry";
import VectorSource from "ol/source/Vector";

import { useMapContext } from "../map/map-context";
import { addInteraction } from "./utils";
import { DrawEvent } from "ol/interaction/Draw";
import { GeoJSONFeature } from "ol/format/GeoJSON";

type DrawInteractionProps = {
  source: VectorSource;
  drawTool: Type | undefined;
  onDrawEnd(feature: any): void;
};

export const DrawInteraction = ({
  source,
  drawTool,
  onDrawEnd,
}: DrawInteractionProps) => {
  const { map } = useMapContext();

  const handleDrawEnd = useCallback(
    (evt: DrawEvent) => {
      console.log(evt);
      const writer = new GeoJSON();
      // write feature to geojson
      const feature: GeoJSONFeature = writer.writeFeatureObject(evt.feature);

      onDrawEnd(feature);
    },
    [onDrawEnd]
  );

  useEffect(() => {
    if (!map) return;
    if (!drawTool) return;

    const draw = new Draw({
      source,
      type: drawTool,
    });

    draw.on("drawend", handleDrawEnd);

    draw.set("name", "Drawing");
    addInteraction(draw, map);

    const snap = new Snap({ source });
    addInteraction(snap, map);

    const modify = new Modify({ source });
    addInteraction(modify, map);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      map.removeInteraction(modify);
      draw.un("drawend", handleDrawEnd);
    };
  }, [map, source, drawTool, handleDrawEnd]);

  return null;
};

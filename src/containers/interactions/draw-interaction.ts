import { useEffect } from "react";
import { Draw, Modify, Snap } from 'ol/interaction';
import { Type } from "ol/geom/Geometry";
import VectorSource from "ol/source/Vector";

import { useMapContext } from "../map/map-context";
import { addInteraction } from "./utils";

type DrawInteractionProps = {
  source: VectorSource;
  drawTool: Type;
}

export const DrawInteraction = ({ source, drawTool }: DrawInteractionProps) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return;

    const draw = new Draw({
      source,
      type: drawTool,
    });

    draw.set('name', 'Drawing');
    addInteraction(draw, map);

    const snap = new Snap({ source });
    addInteraction(snap, map);

    const modify = new Modify({ source });
    addInteraction(modify, map);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      map.removeInteraction(modify);
    }
  }, [map, source, drawTool]);

  return null;
}

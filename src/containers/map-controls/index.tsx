import { IconButton } from "@mui/material";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Type } from "ol/geom/Geometry";
import "./index.css";

type MapContextProps = {
  handleSelectDrawTool(tool: Type): void;
  handleSelectBaseLayer(layer: string): void;
};

export const MapControls = ({
  handleSelectDrawTool,
  handleSelectBaseLayer,
}: MapContextProps) => (
  <div className="map_controls">
    <div className="map_controls-drawing">
      <IconButton onClick={() => handleSelectDrawTool("Polygon")}>
        <PolylineIcon />
      </IconButton>
    </div>
    <div className="map_controls-layers">
      <button onClick={() => handleSelectBaseLayer("street")}>
        Street view
      </button>
      <button onClick={() => handleSelectBaseLayer("satellite")}>
        Satellite view
      </button>
    </div>
  </div>
);

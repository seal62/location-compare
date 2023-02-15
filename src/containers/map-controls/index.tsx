import { IconButton, Typography } from "@mui/material";
import { PolylineRounded, PanoramaFishEye } from "@mui/icons-material";
import { Type } from "ol/geom/Geometry";
import "./index.css";

import { BaseLayers } from "../../containers/layers/base-layer";
import { BaseLayersSwitch } from "../../components/base-layers-switch";

type MapContextProps = {
  selectedTool?: Type;
  activeBaseLayer: BaseLayers;
  handleSelectDrawTool(tool: Type): void;
  handleSelectBaseLayer(layer: BaseLayers): void;
};

export const MapControls = ({
  selectedTool,
  activeBaseLayer,
  handleSelectDrawTool,
  handleSelectBaseLayer,
}: MapContextProps) => (
  <div className="map_controls">
    <div className="map_controls-drawing">
      <Typography variant="subtitle2">Tools</Typography>
      <div className="map_controls-drawing-tools">
        <IconButton onClick={() => handleSelectDrawTool("Polygon")}>
          <PolylineRounded
            color={selectedTool === "Polygon" ? "primary" : "action"}
          />
        </IconButton>
        <IconButton onClick={() => handleSelectDrawTool("Circle")}>
          <PanoramaFishEye
            color={selectedTool === "Circle" ? "primary" : "action"}
          />
        </IconButton>
      </div>
    </div>
    <div className="map_controls-layers">
      <BaseLayersSwitch
        activeBaseLayer={activeBaseLayer}
        handleSelectStreet={() => handleSelectBaseLayer(BaseLayers.Street)}
        handleSelectSatellite={() =>
          handleSelectBaseLayer(BaseLayers.Satellite)
        }
      />
    </div>
  </div>
);

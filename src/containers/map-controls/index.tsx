import { Type } from "ol/geom/Geometry";
import "./index.css";

type MapContextProps = {
  handleSelectDrawTool(tool: Type): void;
  handleSelectBaseLayer(layer: string): void;
}

export const MapControls = ({ handleSelectDrawTool, handleSelectBaseLayer }: MapContextProps) => (
  <div className="map_controls">
    <div className="map_controls-drawing">
      <select onChange={(evt) => handleSelectDrawTool(evt.currentTarget.value as Type)}>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
        <option value="Point">Point</option>
      </select>
    </div>
    <div className="map_controls-layers">
      <button onClick={() => handleSelectBaseLayer('street')}>Street view</button>
      <button onClick={() => handleSelectBaseLayer('satellite')}>Satellite view</button>
    </div>
  </div>
);

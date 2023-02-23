import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";

import { SecondMapType } from "../../App";

import "./controls.css";

type ControlsProps = {
  active: SecondMapType;
  handleChange(_: any, newValue: SecondMapType): void;
};

export const Controls = ({ active, handleChange }: ControlsProps) => (
  <Box className="controls-container">
    <ToggleButtonGroup value={active} onChange={handleChange} exclusive>
      <ToggleButton value={SecondMapType.Syncd}>Sync'd Map</ToggleButton>
      <ToggleButton value={SecondMapType.Independent}>
        Independent Map
      </ToggleButton>
      <ToggleButton value={SecondMapType.SyncdZoom}>Sync'd Zoom</ToggleButton>
    </ToggleButtonGroup>
  </Box>
);

import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";

import "./controls.css";

type ControlsProps = {
  active: boolean;
  handleChange(_: any, newValue: boolean): void;
};

export const Controls = ({ active, handleChange }: ControlsProps) => (
  <Box className="controls-container">
    <ToggleButtonGroup value={active} onChange={handleChange} exclusive>
      <ToggleButton value={true}>Sync'd Map</ToggleButton>
      <ToggleButton value={false}>Independent Map</ToggleButton>
    </ToggleButtonGroup>
  </Box>
);

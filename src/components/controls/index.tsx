import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import "./controls.css";

type ControlsProps = {
  active: boolean;
  handleChange(_: any, newValue: boolean): void;
};

export const Controls = ({ active, handleChange }: ControlsProps) => (
  <ToggleButtonGroup value={active} onChange={handleChange} exclusive>
    <ToggleButton value={true}>Sync'd Map</ToggleButton>
    <ToggleButton value={false}>Independent Map</ToggleButton>
  </ToggleButtonGroup>
);

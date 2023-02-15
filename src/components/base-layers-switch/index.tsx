import { FormGroup, FormControlLabel, Switch, Typography } from "@mui/material";
import { BaseLayers } from "../../containers/layers/base-layer";

type BaseLayersSwitchProps = {
  activeBaseLayer: BaseLayers;
  handleSelectStreet(): void;
  handleSelectSatellite(): void;
};

export const BaseLayersSwitch = ({
  activeBaseLayer,
  handleSelectStreet,
  handleSelectSatellite,
}: BaseLayersSwitchProps) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={activeBaseLayer === BaseLayers.Street}
          onChange={handleSelectStreet}
          size="small"
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={<Typography fontSize="0.8rem">Street</Typography>}
    />
    <FormControlLabel
      control={
        <Switch
          checked={activeBaseLayer === BaseLayers.Satellite}
          onChange={handleSelectSatellite}
          size="small"
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={<Typography fontSize="0.8rem">Satellite</Typography>}
    />
  </FormGroup>
);

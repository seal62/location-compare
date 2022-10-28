import React from "react";
import { useSyncContext } from "../sync-controller/sync-context";

import "./controls.css";

type ControlsProps = {
  children?: JSX.Element | JSX.Element[];
};

export const Controls = ({ children }: ControlsProps) => {
  const { handleSyncLocked, syncLocked } = useSyncContext();

  return (
    <div className="controls-container">
      {children}
      <div>
        <input
          id="sync-lock"
          type="checkbox"
          checked={syncLocked}
          onChange={(evt) => handleSyncLocked(evt.target.checked)}
        />
        <label htmlFor="sync-lock">Sync map navigation</label>
      </div>
      <div>
        <input
          id="sync-pan"
          type="checkbox"
          checked={false}
          onChange={(evt) => console.log(evt.target.checked)}
        />
        <label htmlFor="sync-pan">Lock pan</label>
      </div>
      <div>
        <input
          id="sync-zoom"
          type="checkbox"
          checked={false}
          onChange={(evt) => console.log(evt.target.checked)}
        />
        <label htmlFor="sync-zoom">Lock zoom</label>
      </div>
    </div>
  );
};

import { useState, useRef, useCallback } from "react";
import * as ol from "ol";
import { fromLonLat } from "ol/proj";

import "./App.css";

import { Map } from "./containers/map";
import { Controls } from "./components/controls";
import { SyncProvider } from "./containers/sync-controller";
import mapConfig from "./config.json";
import { IndependentMapContextProvider } from "./containers/map/independent-context";

const INITIAL_ZOOM = 11;
const INITIAL_CENTER = fromLonLat(mapConfig.center);

function App() {
  const [showSyncMap, setShowSyncMap] = useState(false);
  const view = useRef<ol.View>(
    new ol.View({ zoom: INITIAL_ZOOM, center: INITIAL_CENTER })
  );

  const handleMapChange = useCallback(
    (_: any, newValue: boolean) => setShowSyncMap(newValue),
    []
  );

  return (
    <div className="app-container">
      <SyncProvider>
        <div className="map-container">
          <IndependentMapContextProvider>
            <Map view={view.current} />
            {showSyncMap ? <Map view={view.current} /> : <Map independentMap />}
          </IndependentMapContextProvider>
        </div>
        <Controls active={showSyncMap} handleChange={handleMapChange} />
      </SyncProvider>
    </div>
  );
}

export default App;

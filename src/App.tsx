import { useState, useRef, useCallback, useEffect } from "react";
import * as ol from "ol";
import { fromLonLat } from "ol/proj";

import "./App.css";

import { Map } from "./containers/map";
import { Controls } from "./components/controls";
import { SyncProvider } from "./containers/sync-controller";
import mapConfig from "./config.json";
import { IndependentMapContextProvider } from "./containers/map/independent-context";
import { debounce } from "./utils";

const INITIAL_ZOOM = 11;
const INITIAL_CENTER = fromLonLat(mapConfig.center);

enum Layout {
  Landscape = "landscape",
  Portrait = "portrait",
}

function App() {
  const [showSyncMap, setShowSyncMap] = useState(false);
  const [layout, setLayout] = useState(Layout.Portrait);
  const view = useRef<ol.View>(
    new ol.View({ zoom: INITIAL_ZOOM, center: INITIAL_CENTER })
  );

  const handleMapChange = useCallback(
    (_: any, newValue: boolean) => setShowSyncMap(newValue),
    []
  );

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      const newLayout =
        window.innerWidth < 900 ? Layout.Landscape : Layout.Portrait;
      setLayout(newLayout);
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);
    debouncedHandleResize();
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className={`${layout} app-container`}>
      <SyncProvider>
        <div className={`${layout} map-container`}>
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

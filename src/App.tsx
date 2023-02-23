import { useState, useRef, useCallback, useEffect, useMemo } from "react";
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

export enum SecondMapType {
  Independent,
  Syncd,
  SyncdZoom,
}

function App() {
  const [secondMapType, setShowSyncMap] = useState(SecondMapType.SyncdZoom);
  const [layout, setLayout] = useState(Layout.Portrait);
  const view = useRef<ol.View>(
    new ol.View({ zoom: INITIAL_ZOOM, center: INITIAL_CENTER })
  );

  const handleMapChange = useCallback(
    (_: any, newValue: SecondMapType) => setShowSyncMap(newValue),
    []
  );

  const secondMap = useMemo(() => {
    if (secondMapType === SecondMapType.Syncd) {
      return <Map view={view.current} mapType={SecondMapType.Syncd} />;
    }
    if (secondMapType === SecondMapType.SyncdZoom) {
      return <Map mapType={SecondMapType.SyncdZoom} />;
    }
    return <Map mapType={SecondMapType.Independent} />;
  }, [secondMapType]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      const newLayout =
        window.innerWidth < 900 ? Layout.Landscape : Layout.Portrait;
      setLayout(newLayout);
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);

    const newLayout =
      window.innerWidth < 900 ? Layout.Landscape : Layout.Portrait;
    setLayout(newLayout);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className={`${layout} app-container`}>
      <SyncProvider>
        <div className={`${layout} map-container`}>
          <IndependentMapContextProvider>
            <Map
              view={view.current}
              mapType={
                secondMapType === SecondMapType.SyncdZoom
                  ? SecondMapType.SyncdZoom
                  : undefined
              }
            />
            {secondMap}
          </IndependentMapContextProvider>
        </div>
        <Controls active={secondMapType} handleChange={handleMapChange} />
      </SyncProvider>
    </div>
  );
}

export default App;

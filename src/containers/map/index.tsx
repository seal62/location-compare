import { useCallback, useEffect, useRef, useState } from "react";
import * as ol from "ol";
import { fromLonLat } from "ol/proj";
import { Type } from "ol/geom/Geometry";
import { defaults as defaultControls } from "ol/control";

import "./map.css";

import { MapContext } from "./map-context";
import { useSyncContext } from "../sync-controller/sync-context";
import { ZoomInteraction } from "../interactions/zoom-interaction";
import { Layers } from "../layers";
import { BaseLayer, BaseLayers } from "../layers/base-layer";
import { MapControls } from "../map-controls";
import { Features } from "../features";
import { useIndependentMapContext } from "./independent-context";
import { Search } from "../search";
import { SecondMapType } from "../../App";

type MapProps = {
  children?: JSX.Element | JSX.Element[];
  view?: ol.View;
  mapType?: SecondMapType;
};

export const Map = ({ children, view, mapType }: MapProps) => {
  const { syncedZoom } = useSyncContext();
  const mapRef = useRef<any>();
  const [map, setMap] = useState<ol.Map | null>(null);
  const [baseLayer, setBaseLayer] = useState<BaseLayers>(BaseLayers.Street);
  const [drawTool, setDrawTool] = useState<Type>();
  const [features, setFeatures] = useState<ol.Feature[]>([]); // TODO - do we need this?!

  const { zoom, position } = useIndependentMapContext();

  const handleDrawEnd = useCallback(
    (feature: ol.Feature) => setFeatures((state) => [...state, feature]),
    []
  );

  const handleSetLocation = useCallback(
    (lat: number, lng: number) => {
      if (view) {
        // TODO - maybe fit view to bounding box instead
        const center = fromLonLat([lng, lat]);
        view.setCenter(center);
        view.setZoom(14);
      }
    },
    [view]
  );

  const handleSelectDrawTool = useCallback(
    (tool: Type) => setDrawTool((state) => (state === tool ? undefined : tool)),
    []
  );

  const handleSelectBaseLayer = useCallback(
    (selectedBaseLayer: BaseLayers) => {
      if (selectedBaseLayer === baseLayer) return;
      setBaseLayer(selectedBaseLayer);
    },
    [baseLayer]
  );

  useEffect(() => {
    const controls = defaultControls({ zoom: false, rotate: false });
    let options = {
      view: view || new ol.View({ zoom, center: position }),
      layers: [],
      controls,
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);

    // TODO - add only for dev
    (window as any).MyMap = mapObject;

    return () => mapObject.setTarget(undefined);
  }, [view]);

  // if independentMap set position/zoom/features to context and use when remounting

  useEffect(() => {
    if (mapType !== SecondMapType.SyncdZoom || !map) return;

    const mapId = ol.getUid(map);
    if (mapId !== syncedZoom.fromMapId) {
      map.getView().setZoom(syncedZoom.zoom);
    }
  }, [mapType, syncedZoom, map]);

  return (
    <MapContext.Provider value={{ map }}>
      <ZoomInteraction active={mapType === SecondMapType.SyncdZoom} />
      <div ref={mapRef} className="ol-map" tabIndex={0}>
        <Layers>
          <BaseLayer type={baseLayer} map={map} />
          <Features
            disabled={false}
            drawTool={drawTool}
            onDrawEnd={handleDrawEnd}
          />
          <MapControls
            selectedTool={drawTool}
            activeBaseLayer={baseLayer}
            handleSelectDrawTool={handleSelectDrawTool}
            handleSelectBaseLayer={handleSelectBaseLayer}
          />
          <Search setLocation={handleSetLocation} />
        </Layers>
        {children}
      </div>
    </MapContext.Provider>
  );
};

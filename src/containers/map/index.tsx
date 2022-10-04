import { useCallback, useEffect, useRef, useState } from 'react';
import * as ol from "ol";
import { fromLonLat } from 'ol/proj';
import { Type } from "ol/geom/Geometry";

import "./map.css";

import { MapContext } from './map-context';
import { DraggingInteraction } from '../interactions/dragging-interaction';
import { useSyncContext } from '../sync-controller/sync-context';
import { ZoomInteraction } from '../interactions/zoom-interaction';
import { Layers } from '../layers';
import { BaseLayer } from '../layers/base-layer';
import { MapControls } from '../map-controls';
import { Features } from '../features';

import mapConfig from "../../config.json";

type MapProps = {
  children?: JSX.Element | JSX.Element[];
}

const INITIAL_ZOOM = 11;
const INITIAL_CENTER = fromLonLat(mapConfig.center);

export const Map = ({ children }: MapProps) => {
  const { syncedCenter, syncedZoom, syncLocked } = useSyncContext();
  const mapRef = useRef<any>();
  const [map, setMap] = useState<ol.Map | null>(null);
  const [mapId, setMapId] = useState('');
  const [mapIsDragging, setMapIsDragging] = useState(false);
  const [baseLayer, setBaseLayer] = useState('street');
  const [drawTool, setDrawTool] = useState<Type>("Polygon");

  const handleMapDragging = useCallback((dragging: boolean) => setMapIsDragging(dragging), []);

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom: INITIAL_ZOOM, center: INITIAL_CENTER }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);
    setMapId(ol.getUid(mapObject));

    // TODO - add only for dev
    (window as any).MyMap = mapObject;

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!map || !syncLocked) return;

    if (!mapIsDragging) {
      map.getView().setCenter(syncedCenter);
    }
  }, [syncedCenter, mapIsDragging, map, syncLocked]);

  useEffect(() => {
    if (!map || !syncLocked) return;

    if (syncedZoom.fromMapId !== mapId) {
      map.getView().setZoom(syncedZoom.zoom);
      // map.getView().animate({ zoom: syncedZoom.zoom })
      console.log(mapId, syncedZoom.zoom, map ?.getView().getZoom())
    }
  }, [syncedZoom, mapId, map, syncLocked]);

  return (
    <MapContext.Provider value={{ map }}>
      <DraggingInteraction handleMapDragging={handleMapDragging} />
      <ZoomInteraction />
      <div ref={mapRef} className="ol-map">
        <Layers>
          <BaseLayer type={baseLayer} />
          <Features disabled={false} drawTool={drawTool} />
          <MapControls handleSelectDrawTool={setDrawTool} handleSelectBaseLayer={setBaseLayer} />
        </Layers>
        {children}
      </div>
    </MapContext.Provider>
  )
}

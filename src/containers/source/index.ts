import * as olSource from "ol/source";
// import VectorTileSource from 'ol/source/VectorTile';

type XYZ = {
  url: string;
  attributions: any;
  maxZoom: number;
};
function xyz({ url, attributions, maxZoom }: XYZ) {
  return new olSource.XYZ({ url, attributions, maxZoom });
}

type Vector = {
  features?: any[];
};
function vector({ features }: Vector) {
  return new olSource.Vector({
    features,
  });
}

function osm() {
  return new olSource.OSM();
}

function mapboxSatellite() {
  const key =
    "sk.eyJ1IjoibGRlbm5pczE5ODciLCJhIjoiY2w4bDdyb293MDAwdzNubnM2endzaDE0YSJ9.2XU1SPS3Y-BHA7fVxWmsAA";
  return new olSource.XYZ({
    attributions:
      "'© <a href=\"https://www.mapbox.com/map-feedback/\">Mapbox</a>'",
    url:
      "https://api.mapbox.com/v4/mapbox.satellite/" +
      "{z}/{x}/{y}.@2x.jpg90?access_token=" +
      key,
    crossOrigin: "jpg",
  });
  // https://api.mapbox.com/v4/mapbox.satellite/1/0/0@2x.jpg90
}

export { vector, xyz, osm, mapboxSatellite };

import { Map } from "ol";
import { GeoJSON } from "ol/format";
import * as olSource from "ol/source";
import { getMapTilerKey } from "../../utils";
// import VectorTileSource from 'ol/source/VectorTile';

type XYZ = {
  url: string;
  attributions: any;
  maxZoom: number;
};
function xyz({ url, attributions, maxZoom }: XYZ) {
  return new olSource.XYZ({ url, attributions, maxZoom });
}

const getGeojsonObject = (features: any[]) => ({
  type: "FeatureCollection",
  // crs: {
  //   type: "name",
  //   properties: {
  //     name: "EPSG:3857",
  //   },
  // },
  features,
});

type Vector = {
  map: Map | null;
};
function vector({ map }: Vector) {
  // console.log(features);

  if (!map) {
    return;
  }

  // const geoJsonFeatures =
  //   features.length > 0
  //     ? new GeoJSON().readFeatures(
  //         getGeojsonObject(features),
  //         // features
  //         {
  //           featureProjection: "EPSG:3857",
  //         }
  //       )
  //     : [];
  // console.log(geoJsonFeatures);
  // console.log(geoJsonFeatures);
  // const sourceFeatures = features.length > 0 ? geoJsonFeatures : [];
  // const source = new olSource.Vector();
  // source.addFeatures(geoJsonFeatures);
  // return source;
  // return new olSource.Vector({
  //   features: sourceFeatures,
  // });
  return new olSource.Vector();
}

function osm() {
  return new olSource.OSM();
}

function mapboxSatellite() {
  const key = "";
  return new olSource.XYZ({
    attributions:
      "'© <a href=\"https://www.mapbox.com/map-feedback/\">Mapbox</a>'",
    url:
      "https://api.mapbox.com/v4/mapbox.satellite/" +
      "{z}/{x}/{y}.@2x.jpg90?access_token=" +
      key,
    crossOrigin: "jpg",
  });
}

function mapTilerSatellite() {
  const key = getMapTilerKey();
  return new olSource.XYZ({
    // eslint-disable-next-line prettier/prettier
    attributions: "<a href=\"https://www.maptiler.com/\">&copy; MapTiler</a>",
    url:
      "https://api.maptiler.com/tiles/satellite/" +
      "{z}/{x}/{y}.jpg?key=" +
      key,
    crossOrigin: "jpg",
  });
}

function mapTilerOpenMapTiles() {
  const key = getMapTilerKey();
  return new olSource.XYZ({
    // eslint-disable-next-line prettier/prettier
    attributions: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
    url:
      "https://api.maptiler.com/tiles/v3-openmaptiles/" +
      "{z}/{x}/{y}.pbf?key=" +
      key,
  });
}

export {
  vector,
  xyz,
  osm,
  mapboxSatellite,
  mapTilerSatellite,
  mapTilerOpenMapTiles,
};

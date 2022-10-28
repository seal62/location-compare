import "./App.css";

import { Map } from "./containers/map";
import { Controls } from "./containers/controls";
import { SyncProvider } from "./containers/sync-controller";

// function addMarkers(lonLatArray: Coordinate[]) {
//   var iconStyle = new Style({
//     image: new Icon({
//       anchorXUnits: "fraction",
//       anchorYUnits: "pixels",
//       src: mapConfig.markerImage32,
//     }),
//   });

//   let features = lonLatArray.map((item) => {
//     let feature = new Feature({
//       geometry: new Point(fromLonLat(item)),
//     });
//     feature.setStyle(iconStyle);
//     return feature;
//   });

//   return features;
// }

function App() {
  return (
    <div className="app-container">
      <SyncProvider>
        <div className="map-container">
          <Map />
          <Map />
        </div>
        <Controls />
      </SyncProvider>
    </div>
  );
}

export default App;

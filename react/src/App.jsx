import React, { useEffect, useRef, useState } from "react";
import { getWeather } from "./api.js";
import WeatherPopup from "./components/weatherPopUps.jsx";
import {
  Viewer,
  createWorldTerrainAsync,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartographic,
  Math as CesiumMath
} from "cesium";

function App() {
  const cesiumContainerRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initViewer = async () => {
      const terrainProvider = await createWorldTerrainAsync();
      const viewer = new Viewer(cesiumContainerRef.current, {
        terrainProvider: terrainProvider
      });

      viewer.scene.globe.enableLighting = true;

      // On click handler
      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(async function (movement) {
  try {
    const cartesian = viewer.camera.pickEllipsoid(movement.position);
    if (!cartesian) return;

    const cartographic = Cartographic.fromCartesian(cartesian);
    const lat = CesiumMath.toDegrees(cartographic.latitude);
    const lon = CesiumMath.toDegrees(cartographic.longitude);

    const weather = await getWeather({ lat, lon });
    setWeatherData(weather);
    setPopupPosition({
      x: movement.position.x,
      y: movement.position.y,
    });
  } catch (error) {
    console.error('Failed to get weather:', error);
    // Optionally show an error message to the user
    alert(error.message);
  }
}, ScreenSpaceEventType.LEFT_CLICK);
      return () => {
        handler.destroy();
        viewer.destroy();
      };
    };

    initViewer();
  }, []);

  return (
    <div>
      <div ref={cesiumContainerRef} style={{ height: "100vh", width: "100vw" }} />
      <WeatherPopup
        data={weatherData}
        position={popupPosition}
        onClose={() => setWeatherData(null)}
      />
    </div>
  );
}

export default App;
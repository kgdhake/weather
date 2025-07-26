import React from "react";

const WeatherPopup = ({ data, position, onClose }) => {
  if (!data) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x + 10,
        top: position.y + 10,
        background: "#ffffffdd",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 999,
        width: "220px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "right" }}>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          ❌
        </button>
      </div>
      <h3 style={{ margin: "0 0 0.5rem" }}>{data.name}</h3>
      <p style={{ margin: "0.3rem 0" }}>
        🌡️ <strong>Temp:</strong> {data.main.temp}°C
      </p>
      <p style={{ margin: "0.3rem 0" }}>
        ☁️ <strong>Weather:</strong> {data.weather[0].main}
      </p>
      <p style={{ margin: "0.3rem 0" }}>
        💧 <strong>Humidity:</strong> {data.main.humidity}%
      </p>
    </div>
  );
};

export default WeatherPopup;

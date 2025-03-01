import React from "react";
import { useBattery } from "./hooks/useBattery";

const BatteryDemo: React.FC = () => {
  const battery = useBattery();

  if (!battery.supported) {
    return <div>Your browser does not support the Battery Status API.</div>;
  }

  if (battery.loading) {
    return <div>Loading battery status...</div>;
  }

  return (
    <div>
      <h2>Battery Status</h2>
      <p>
        Level:{" "}
        {battery.level !== null
          ? `${(battery.level * 100).toFixed(0)}%`
          : "N/A"}
      </p>
      <p>Charging: {battery.charging ? "Yes" : "No"}</p>
      <p>
        Charging Time:{" "}
        {battery.chargingTime !== null
          ? `${battery.chargingTime} seconds`
          : "N/A"}
      </p>
      <p>
        Discharging Time:{" "}
        {battery.dischargingTime !== null
          ? `${battery.dischargingTime} seconds`
          : "N/A"}
      </p>
    </div>
  );
};

export default BatteryDemo;

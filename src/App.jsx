import React, { useEffect, useState } from "react";
import Plots from "./Plots";

function App() {
  const [voltageData, setVoltageData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const fetchInitialData = (columnName) => {
    const params = new URLSearchParams({
      initial: "true",
      column: columnName,
      limit: "10",
    });

    return fetch(`/api/fetch_latest_cvt.php?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(`Error fetching ${columnName} data:`, error);
        return []; // Return an empty array on error to prevent crashing
      });
  };

  useEffect(() => {
    const voltagePromise = fetchInitialData("voltage");
    const currentPromise = fetchInitialData("current");
    const temperaturePromise = fetchInitialData("temperature");

    Promise.all([voltagePromise, currentPromise, temperaturePromise])
      .then(([voltage, current, temperature]) => {
        setVoltageData(voltage);
        setCurrentData(current);
        setTemperatureData(temperature);
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      });
  }, []);

  useEffect(() => {
    if (voltageData.length !== 0) {
      const newCombinedData = voltageData.map((voltage, i) => ({
        id: voltage.id,
        voltage: voltage.voltage,
        current: currentData[i].current,
        temperature: temperatureData[i].temperature,
      }));
      setCombinedData(newCombinedData); // Update combined data in one go
      console.log("Combined Data:", newCombinedData); // Log the combined data
    }
  }, [voltageData, currentData, temperatureData]);

  return (
    <div className="w-screen">
      <Plots data={combinedData} />
    </div>
  );
}

export default App;

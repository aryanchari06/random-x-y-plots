import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RandomPlots = () => {
  const [voltageData, setVoltageData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();

      // Generate random values
      const voltage = (Math.random() * (3.7 - 3) + 3).toFixed(2);
      const current = (Math.random() * (150 - 100) + 100).toFixed(2);
      const temperature = (Math.random() * (350 - 300) + 300).toFixed(2);

      // Limit data to 100 points
      setLabels((prevLabels) => [...prevLabels, time].slice(-100));
      setVoltageData((prevData) => [...prevData, voltage].slice(-100));
      setCurrentData((prevData) => [...prevData, current].slice(-100));
      setTemperatureData((prevData) => [...prevData, temperature].slice(-100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createChartData = (data, label, color) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        borderWidth: 2,
        fill: false,
        pointRadius: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Disable animation
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10, // Show limited ticks for better readability
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%] bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
        Real-Time Random Data Plots
      </h1>
      <div className="gap-8 w-full">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full">
          <Line
            data={createChartData(voltageData, "Voltage (V)", "purple")}
            options={chartOptions}
          />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Line
            data={createChartData(currentData, "Current (mA)", "blue")}
            options={chartOptions}
          />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Line
            data={createChartData(temperatureData, "Temperature (K)", "red")}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default RandomPlots;

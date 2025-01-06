import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Plots = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [voltageData, setVoltageData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // Extract labels and data
      const newLabels = data.map((item) => item.id); // Assuming `id` is a timestamp or unique identifier
      const newVoltageData = data.map((item) => item.voltage);
      const newCurrentData = data.map((item) => item.current);
      const newTemperatureData = data.map((item) => item.temperature);

      setLabels(newLabels);
      setVoltageData(newVoltageData);
      setCurrentData(newCurrentData);
      setTemperatureData(newTemperatureData);
    }
  }, [data]);

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
    animation: false, // Disable animation for real-time data
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14, // Adjust font size for better readability
          },
          color: "#4A4A4A", // Set label color
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`, // Custom tooltip
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          font: {
            size: 16, // Font size for the axis title
            weight: "bold",
          },
          color: "#4A4A4A", // Title color
        },
        ticks: {
          color: "#4A4A4A", // Tick label color
          font: {
            size: 12, // Adjust font size for ticks
          },
          maxTicksLimit: 10, // Show a limited number of ticks for readability
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Gridline color
          drawOnChartArea: true, // Draw gridlines on the chart area
          drawTicks: true, // Draw tick marks
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          font: {
            size: 16, // Font size for the axis title
            weight: "bold",
          },
          color: "#4A4A4A", // Title color
        },
        ticks: {
          color: "#4A4A4A", // Tick label color
          font: {
            size: 12, // Adjust font size for ticks
          },
          callback: (value) => `${value}`, // Customize tick label (e.g., add units like "V", "mA", "K")
        },
        beginAtZero: true, // Ensure Y-axis starts at zero
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Gridline color
          drawOnChartArea: true, // Draw gridlines on the chart area
          drawTicks: true, // Draw tick marks
        },
      },
    },
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-[100%] bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
        Real-Time Data Plots
      </h1>
      <div className="gap-8 w-full">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full">
          <Line
            className="h-[800px]"
            data={createChartData(voltageData, "Voltage (V)", "purple")}
            options={chartOptions}
          />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Line
            className="h-[800px]"
            data={createChartData(currentData, "Current (mA)", "blue")}
            options={chartOptions}
          />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Line
            className="h-[800px]"
            data={createChartData(temperatureData, "Temperature (K)", "red")}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Plots;

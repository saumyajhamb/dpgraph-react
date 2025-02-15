import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

import './DemandPriceGraph.css'


const DemandPriceGraph = () => {
  const [totalDemand, setTotalDemand] = useState(0);
  const [highlightedRange, setHighlightedRange] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const chartRef = useRef(null);
  const [shadedData, setShadedData] = useState([]);

  const originalData = [1000, 800, 600, 400, 200, 0];
  const data = {
    labels: ["0", "100", "200", "300", "400", "500"],
    datasets: [
      {
        label: "Demand Curve",
        data: originalData,
        fill: false,
        borderColor: "rgb(7, 48, 122)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Selected Area",
        data: shadedData,
        fill: true,
        backgroundColor: "rgba(15, 73, 131, 0.59)",
        borderWidth: 0,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Price" } },
      y: { title: { display: true, text: "Demand" } },
    },
  };

  const handleMouseDown = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const startIndex = getIndexFromEvent(event, chart);
    setIsDragging(true);
    setHighlightedRange([startIndex, startIndex]);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const chart = chartRef.current;
    if (!chart) return;

    const endIndex = getIndexFromEvent(event, chart);
    if (endIndex >= highlightedRange[0]) {
      setHighlightedRange([highlightedRange[0], endIndex]);
      updateShading(highlightedRange[0], endIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getIndexFromEvent = (event, chart) => {
    const { offsetX } = event.nativeEvent;
    const { left, right } = chart.chartArea;
    const index = Math.round(
      ((offsetX - left) / (right - left)) * (data.labels.length - 1)
    );
    return Math.min(Math.max(index, 0), data.labels.length - 1);
  };

  const updateShading = (startIndex, endIndex) => {
    const newShadedData = originalData.map((value, index) =>
      index >= startIndex && index <= endIndex ? value : null
    );

    setShadedData(newShadedData);

    const total = originalData
      .slice(startIndex, endIndex + 1)
      .reduce((acc, value) => acc + value, 0);
    setTotalDemand(total);
  };

  return (
    <div className="card-container">
    <div className="card">
      <h2>Interactive Demand-Price Graph</h2>
      <div
        className="graph-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Line ref={chartRef} data={data} options={chartOptions} />
      </div>
      <div className="demand-info">
        <strong>Total Demand for Highlighted Range:</strong> {totalDemand}
      </div>
      {highlightedRange[1] > 0 && (
        <div className="demand-info">
          Highlighted Range: {data.labels[highlightedRange[0]]} to {data.labels[highlightedRange[1]]}
        </div>
      )}
    </div>
  </div>
);
};


export default DemandPriceGraph;


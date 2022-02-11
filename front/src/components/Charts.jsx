import React, { useContext } from "react";
import context from "../context/scrapingContext";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { getObjectNoTotal } from "../helpers/objectHelpers";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);
export default function Charts() {
  const { analytics, traffic } = useContext(context);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const pieParams = {
    labels: Object.keys(getObjectNoTotal(analytics)),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(getObjectNoTotal(analytics)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const trafficLabels = Object.keys(traffic);
  const trafficData = {
    labels: trafficLabels,
    datasets: [
      {
        label: "Traffic",
        data: trafficLabels.map((key) => traffic[Number(key)]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="charts">
      <Pie data={pieParams} options={options} />
      <Line className="lineChart" data={trafficData} options={options} />
    </div>
  );
}

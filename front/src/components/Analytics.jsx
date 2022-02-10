import React, { useContext } from "react";
import context from "../context/scrapingContext";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { getObjectNoTotal } from "../helpers/objectHelpers";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export default function Analytics() {
  const { analytics } = useContext(context);
  const graphs = () => {
    const elems = [];
    for (const [key, value] of Object.entries(analytics)) {
      if (key === "total") continue;
      elems.push(
        <div key={key}>
          <div>
            <label className="labels" htmlFor={key}>
              {key} - {value} Pastes{" "}
            </label>
            <progress id={key} max={analytics.total} value={value}></progress>
          </div>
        </div>
      );
    }
    return elems;
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

  return (
    <div className="analytics transition">
      <h3>Total Posts: {analytics.total}</h3>
      <div className="graph">{graphs()}</div>
      <Pie data={pieParams} />
    </div>
  );
}

import React, { useContext } from "react";
import context from "../context/scrapingContext";
import Charts from "./Charts";

export default function Analytics() {
  const { analytics } = useContext(context);

  return (
    <div className="analytics transition">
      <h3 className="totalPastes">Total Pastes: {analytics.total}</h3>
      <Charts />
    </div>
  );
}

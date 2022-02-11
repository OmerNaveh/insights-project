import React, { useState } from "react";
import scrapingContext from "./scrapingContext";

export default function FeedProvider({ children }) {
  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [traffic, setTraffic] = useState({});
  return (
    <scrapingContext.Provider
      value={{ data, setData, analytics, setAnalytics, traffic, setTraffic }}
    >
      {children}
    </scrapingContext.Provider>
  );
}

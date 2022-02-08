import React, { useState } from "react";
import scrapingContext from "./scrapingContext";

export default function FeedProvider({ children }) {
  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState({});
  return (
    <scrapingContext.Provider
      value={{ data, setData, analytics, setAnalytics }}
    >
      {children}
    </scrapingContext.Provider>
  );
}

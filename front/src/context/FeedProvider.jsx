import React, { useState } from "react";
import scrapingContext from "./scrapingContext";

export default function FeedProvider({ children }) {
  const [data, setData] = useState([]);
  return (
    <scrapingContext.Provider value={{ data, setData }}>
      {children}
    </scrapingContext.Provider>
  );
}

import React, { useContext, useState } from "react";
import context from "../context/scrapingContext";
import Post from "./Post";
import SearchBar from "./SearchBar";
export default function Feed() {
  const { data } = useContext(context);
  const [localData, setLocalData] = useState([]);
  const renderFeed = () => {
    if (localData.length > 0)
      return localData.map((entry) => (
        <Post key={entry.date + entry.title} entry={entry} />
      ));
    return data.map((entry) => (
      <Post key={entry.date + entry.title} entry={entry} />
    ));
  };
  return (
    <div className="feedDiv transition">
      <SearchBar setLocalData={setLocalData} localData={localData} />
      <div className="feed">{renderFeed()}</div>
    </div>
  );
}

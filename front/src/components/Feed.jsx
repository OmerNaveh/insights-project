import React, { useContext } from "react";
import context from "../context/scrapingContext";
import Post from "./Post";
export default function Feed() {
  const { data } = useContext(context);
  const renderFeed = () => {
    return data.map((entry) => (
      <Post key={entry.date + entry.title} entry={entry} />
    ));
  };
  return <div className="feed">{renderFeed()}</div>;
}

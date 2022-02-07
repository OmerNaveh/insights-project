import React, { useState } from "react";

export default function Post(entry) {
  const { author, title, content, date } = entry.entry;
  const [show, setShow] = useState(false);
  const showContent = () => {
    return (
      <div className="entryContent">
        {!show ? content.slice(0, 30) : content}{" "}
        <span
          className="showMoreLess"
          onClick={() => {
            setShow(!show);
          }}
        >
          {!show ? "...show more" : "show less"}
        </span>
      </div>
    );
  };
  return (
    <div className="entry">
      <h4 className="entryTitle">{title}</h4>
      <p className="entryDets">
        {author} - {new Date(date).toUTCString()}
      </p>
      {showContent()}
    </div>
  );
}

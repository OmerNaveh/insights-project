import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FeedProvider from "./context/FeedProvider";

ReactDOM.render(
  <React.StrictMode>
    <FeedProvider>
      <App />
    </FeedProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

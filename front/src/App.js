/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import context from "./context/scrapingContext";
import axios from "axios";
import Feed from "./components/Feed";
const url = "http://localhost:4000/api";
function App() {
  const { setData } = useContext(context);
  useEffect(async () => {
    const request = await axios.get(url);
    setData(request.data);
  }, []);
  return (
    <div className="App">
      <Feed />
    </div>
  );
}

export default App;

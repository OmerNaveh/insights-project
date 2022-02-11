import { useContext, useEffect } from "react";
import context from "./context/scrapingContext";
import Feed from "./components/Feed";
import Analytics from "./components/Analytics";
import Navigationbar from "./components/Navigationbar";
const url = "http://localhost:4000/api";
function App() {
  const { setData, setAnalytics, setTraffic } = useContext(context);
  useEffect(() => {
    let source = new EventSource(url);
    source.onmessage = (e) => {
      setData(JSON.parse(e.data).entries);
      setAnalytics(JSON.parse(e.data).analytics);
      setTraffic(JSON.parse(e.data).traffic);
    };
    source.onerror = () => {
      source.close();
    };
  }, []);
  return (
    <div className="App">
      <Navigationbar />
      <Analytics />
      <Feed />
    </div>
  );
}

export default App;

import { useContext, useEffect } from "react";
import context from "./context/scrapingContext";
import Feed from "./components/Feed";
const url = "http://localhost:4000/api";
function App() {
  const { setData } = useContext(context);
  useEffect(() => {
    let source = new EventSource(url);
    source.onmessage = (e) => {
      setData(JSON.parse(e.data).entries);
    };
    source.onerror = () => {
      source.close();
    };
  }, []);
  return (
    <div className="App">
      <Feed />
    </div>
  );
}

export default App;

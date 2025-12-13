import { useState } from "react";
import { analyzReviews } from "./api/reviewApi";
import SentimentCards from "./components/SentimentCards";
import ReviewCharts from "./components/ReviewCharts";
import ReviewList from "./components/ReviewList";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzReviews(url);
      setData(result);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Backend error");
  }
  setLoading(false);
};

return (
  <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
    <h2>Amazon Review Analyzer</h2>

    <input
      style={{ width: "70%", padding: "8px" }}
      placeholder="Paste Amazon product URL"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />

    <button onClick={handleAnalyze} style={{ marginLeft: "10px" }}>
      Analyze
    </button>

    {loading && <p>Analyzing reviews...</p>}

    {data && (
      <>
        <SentimentCards sentiment={data.sentiment} />
        <ReviewCharts sentiment={data.sentiment} />
        <ReviewList reviews={data.reviews} />
      </>
    )}
  </div>
);
}

export default App;

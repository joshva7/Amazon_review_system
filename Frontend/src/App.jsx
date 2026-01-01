import { useState } from "react";
import { analyzeReviews } from "./api/reviewApi";
import ReviewCharts from "./components/ReviewCharts";
import ReviewList from "./components/ReviewList";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    try {
      const data = await analyzeReviews(url);
      setResult(data);
    } catch (error) {
      alert("Backend not reachable. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Amazon Product Review Analysis</h2>

      <input
        type="text"
        placeholder="Paste Amazon product URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "70%", padding: 8 }}
      />

      <button
        onClick={handleAnalyze}
        style={{ marginLeft: 10, padding: "8px 16px" }}
      >
        Analyze
      </button>

      {loading && <p>Analyzing reviews...</p>}

      {result && (
        <>
          <p><b>ASIN:</b> {result.asin}</p>
          <p><b>Source:</b> {result.review_source}</p>
          <p><b>Total Reviews:</b> {result.total_reviews}</p>

          <ReviewCharts analysis={result.analysis} />
          <ReviewList reviews={result.sample_reviews || []} />
        </>
      )}
    </div>
  );
}

export default App;

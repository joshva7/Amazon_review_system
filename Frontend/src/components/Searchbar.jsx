import { useState, useContext } from "react";
import { DataContext } from "../Context/Datacontextprovied";

const Searchbar = () => {
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setData } = useContext(DataContext);

  // ✅ Amazon URL Validator
  const isAmazonProductUrl = (url) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(amazon\.[a-z.]+\/.*(dp|gp\/product)\/|amzn\.in\/)/i;
    return pattern.test(url);
  };

  const handleAnalyze = async () => {
    setError("");

    if (!productUrl.trim()) {
      setError("Please enter Amazon product link");
      return;
    }

    if (!isAmazonProductUrl(productUrl)) {
      setError("Invalid Amazon Product URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_url: productUrl
        })
      });

      const data = await response.json();

      setData(data);
      console.log("ANALYSIS RESULT:", data);

    } catch (error) {
      console.error("Analyze failed:", error);
      setError("Backend error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 flex flex-col items-center gap-4 mt-2">
      <input
        type="text"
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
        placeholder="Paste Amazon product URL here"
        className="p-2 border border-gray-300 rounded-md focus:outline-none 
        focus:ring-2 focus:ring-blue-500 w-2/3"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-60 bg-blue-500 text-white p-2 rounded-md 
        hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Reviews"}
      </button>
    </div>
  );
};

export default Searchbar;
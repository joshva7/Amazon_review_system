import { useState, useContext } from "react";
// import { DataContext } from "../context/DataContext";
import { DataContext } from "../Context/Datacontextprovied";
const Searchbar = () => {
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { setData } = useContext(DataContext);

  const handleAnalyze = async () => {
    if (!productUrl.trim()) return;

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

      // ✅ Store FULL backend response in Context
      setData(data);

      console.log("ANALYSIS RESULT:", data);
    } catch (error) {
      console.error("Analyze failed:", error);
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

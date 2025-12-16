import { useState, useContext } from "react";
import { analyzReviews } from "/src/api/reviewApi.js";
import { Providerdata } from "../../globalcontext/Prodatesetprov";
const Products = () => {
  const { setData } = useContext(Providerdata);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const getUrlData = async () => {
    if (!url.trim() || loading) return;
    setLoading(true);
    try {
      const result = await analyzReviews(url);
      setData(result);
      console.log("Result:", result);
    } catch (error) {
      console.error("Backend error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="mt-5 md:flex gap-6 items-baseline mx-2 justify-center">
        <span className="text-2xl font-bold font-roboto">Products</span>
        <div className="flex mt-3 gap-2 md:w-1/2">
          <input
            type="text"
            value={url}
            placeholder="Enter the Product Link"
            className="md:w-full border-2 rounded-full px-2 md:px-6 py-1"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={getUrlData}
            disabled={loading}
            className="bg-amber-600 font-roboto text-sm px-8 py-2 rounded-full disabled:opacity-60"
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;

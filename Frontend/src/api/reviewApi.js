import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

// Chat API
export const chatWithReviews = (data) =>
  API.post("/chat-reviews", data);

// Analyze API
export const analyzeReviews = async (productUrl) => {
  const response = await API.post("/analyze", {
    product_url: productUrl,
  });

  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:5000/analyze";

export const analyzeReviews = async (productUrl) => {
  const response = await axios.post(API_URL, {
    product_url: productUrl,
  });
  console.log(response.data);
  return response.data;
};

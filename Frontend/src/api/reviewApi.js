import axios from "axios"

export const analyzReviews = async (productUrl)=>{
    const resoponse = await axios.post("https://amazonreviewsystembackend-production.up.railway.app/analyze",{
        url: productUrl,
    });
    return resoponse.data;
};
export const getAnalyzReviews = async () => {
  try {
    const response = await axios.get("https://amazonreviewsystembackend-production.up.railway.app/analyze");
    return response.data;
  } catch (error) {
    console.error("Get Analyze Reviews API error:", error);
    throw error;
  }
};
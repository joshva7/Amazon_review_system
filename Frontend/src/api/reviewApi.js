import axios from "axios"

export const analyzReviews = async (productUrl)=>{
    const resoponse = await axios.post("http://localhost:5000/analyze",{
        url: productUrl,
    });
    return resoponse.data;
};
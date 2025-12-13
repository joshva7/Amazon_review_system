from flask import Flask, request, jsonify
from flask_cors import CORS

from analyzer import (
    get_amazon_product_data,
    categorize_reviews_by_sentiment_and_topic,
    get_product_image,
    MOCK_REVIEWS
)

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    product_url = data.get("url")

    if not product_url:
        return jsonify({"error": "Product URL is required"}), 400

    # Fetch image
    product_image = get_product_image(product_url)

    # Fetch reviews
    reviews = get_amazon_product_data(product_url)

    # ---------- DEMO FALLBACK ----------
    demo_mode = False
    if not reviews:
        reviews = MOCK_REVIEWS
        demo_mode = True

    result = categorize_reviews_by_sentiment_and_topic(reviews)

    response = {
        "productImage": product_image,
        "sentiment": {
            "positive": len(result["positive"]),
            "negative": len(result["negative"]),
            "neutral": len(result["neutral"]),
        },
        "topics": {
            "quality": len(result["quality"]),
            "usability": len(result["usability"]),
            "price": len(result["price"]),
        },
        "reviews": {
            "positive": result["positive"][:5],
            "negative": result["negative"][:5],
            "neutral": result["neutral"][:5],
        }
    }

    if demo_mode:
        response["message"] = "Demo mode: Showing sample reviews"

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)

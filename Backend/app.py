from flask import Flask, request, jsonify
from flask_cors import CORS

from analyzer import get_amazon_product_data, categorize_reviews_by_sentiment_and_topic

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    product_url = data.get("url")

    if not product_url:
        return jsonify({"error": "Product URL is required"}), 400

    reviews = get_amazon_product_data(product_url)

    if not reviews:
        return jsonify({"error": "No reviews found"}), 404

    result = categorize_reviews_by_sentiment_and_topic(reviews)

    return jsonify({
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
    })

if __name__ == "__main__":
    app.run(debug=True)

from cmath import asin
from utils.serpapi_product import fetch_amazon_product_details
import os
import sys
from dotenv import load_dotenv
from utils.url_resolver import resolve_amazon_url
from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp.sentiment import analyze_reviews
from utils.demo_reviews import DEMO_REVIEWS
from utils.asin_extractor import extract_asin
from utils.serpapi_reviews import fetch_amazon_reviews
from flask_cors import CORS
from nlp.review_chat import build_review_embeddings, chat_with_reviews
load_dotenv()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)
DEMO_ANALYSIS_CACHE = analyze_reviews(DEMO_REVIEWS.copy())
app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False
)
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "OK", "message": "Amazon Review Analysis API Running"})

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json or {}
    product_details = {}
    product_url = data.get("product_url", "")
    user_reviews = data.get("reviews", [])
   
    resolved_url = resolve_amazon_url(product_url)
    
    
    asin = extract_asin(resolved_url)

    print("Original URL:", product_url)
    print("Resolved URL:", resolved_url)
    print("Extracted ASIN:", asin)
    api_key = os.getenv("API_KEY")

    if api_key is None:
        print("API_KEY not found in .env file")
    else:
        print("API_KEY loaded successfully")
    MIN_REVIEWS = 10 

    if asin:
        product_details = fetch_amazon_product_details(asin)

    if user_reviews:
        reviews = list(user_reviews)
        source = "user_provided"
        analysis = analyze_reviews(reviews)

    elif asin:
        live_reviews = fetch_amazon_reviews(asin)

        if live_reviews:
            reviews = live_reviews.copy()

            if len(reviews) < MIN_REVIEWS:
                needed = MIN_REVIEWS - len(reviews)
                reviews.extend(DEMO_REVIEWS[:needed])
                source = "serpapi_amazon"
            else:
                source = "serpapi_amazon"

            analysis = analyze_reviews(reviews)

        else:
            reviews = DEMO_REVIEWS.copy()
            source = "demo_only"
            analysis = DEMO_ANALYSIS_CACHE

    else:
        reviews = DEMO_REVIEWS.copy()
        source = "demo_only"
        analysis = DEMO_ANALYSIS_CACHE

    return jsonify({
        "asin": asin,
        "product": product_details, 
        "review_source": source,
        "total_reviews": len(reviews),
        "analysis": analysis,
    })
@app.route("/chat-reviews", methods=["POST"])
def chat_reviews():
    data = request.json or {}

    question = data.get("question", "")
    product_url = data.get("product_url", "")
    user_reviews = data.get("reviews", [])

    resolved_url = resolve_amazon_url(product_url)
    asin = extract_asin(resolved_url)

    MIN_REVIEWS = 10
    reviews = []

    # ---- Review Source Logic (Reuse Your Existing Logic) ----
    if user_reviews:
        reviews = list(user_reviews)

    elif asin:
        live_reviews = fetch_amazon_reviews(asin)

        if live_reviews:
            reviews = live_reviews.copy()

            if len(reviews) < MIN_REVIEWS:
                needed = MIN_REVIEWS - len(reviews)
                reviews.extend(DEMO_REVIEWS[:needed])

        else:
            reviews = DEMO_REVIEWS.copy()

    else:
        reviews = DEMO_REVIEWS.copy()

    # ---- Build Embeddings ----
    review_embeddings = build_review_embeddings(reviews)

    # ---- Chat Response ----
    chat_result = chat_with_reviews(
        question,
        reviews,
        review_embeddings
    )

    return jsonify({
        "question": question,
        "answer": chat_result["answer"],
        "matched_reviews": chat_result["matched_reviews"],
        "total_reviews_used": len(reviews)
    })

if __name__ == "__main__":
    app.run(debug=True)


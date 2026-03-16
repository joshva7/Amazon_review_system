import os
import requests

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

def fetch_amazon_reviews(asin, country="in"):
    if not SERPAPI_KEY:
        return []

    params = {
        "engine": "amazon_product",
        "amazon_domain": f"amazon.{country}",
        "asin": asin,
        "api_key": SERPAPI_KEY
    }

    response = requests.get(
        "https://serpapi.com/search",
        params=params,
        timeout=20
    )

    data = response.json()
    reviews = []

    # 🔴 THIS IS THE KEY FIX
    review_blocks = (
        data.get("reviews_information", {})
            .get("authors_reviews", [])
    )

    for r in review_blocks:
        text = r.get("text")
        if text:
            reviews.append(text)

    return reviews

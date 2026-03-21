import os
import requests 

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

def fetch_amazon_product_details(asin, country="in"):
    if not SERPAPI_KEY or not asin:
        return {}

    params = {
        "engine": "amazon_product",
        "amazon_domain": f"amazon.{country}",
        "asin": asin,
        "api_key": SERPAPI_KEY
    }

    try:
        r = requests.get("https://serpapi.com/search", params=params, timeout=15)
        data = r.json()
        product = data.get("product")

        if product and product.get("title"):
            return {
                "title": product.get("title"),
                "image": product.get("main_image"),
                "features": product.get("features", []),
                "rating": product.get("rating"),
                "reviews_count": product.get("reviews")
            }

    except Exception as e:
        print("amazon_product failed:", e)

    # 2️⃣ FALLBACK: amazon search engine (FREE PLAN SAFE)
    search_params = {
        "engine": "amazon",
        "amazon_domain": f"amazon.{country}",
        "q": asin,
        "api_key": SERPAPI_KEY
    }

    r = requests.get("https://serpapi.com/search", params=search_params, timeout=15)
    data = r.json()

    for item in data.get("organic_results", []):
        if asin in item.get("link", ""):
            return {
                "title": item.get("title"),
                "image": item.get("thumbnail"),
                "features": [],
                "rating": item.get("rating"),
                "reviews_count": item.get("reviews")
            }

    # 3️⃣ FINAL FALLBACK (Never return empty UI)
    return {
        "title": f"Amazon Product ({asin})",
        "image": None,
        "features": [],
        "rating": "N/A",
        "reviews_count": "N/A"
    }

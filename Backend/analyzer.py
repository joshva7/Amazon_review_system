import requests
import time
import random
from bs4 import BeautifulSoup
from nltk.sentiment import SentimentIntensityAnalyzer

# ---------- VADER INIT ----------
sia = SentimentIntensityAnalyzer()

# ---------- USER AGENTS ----------
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64)",
]

# ---------- AMAZON SCRAPER ----------
def get_amazon_product_data(product_url, retries=5):
    for _ in range(retries):
        headers = {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept-Language": "en-US,en;q=0.9",
        }

        response = requests.get(product_url, headers=headers, timeout=10)

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            reviews = soup.find_all("span", {"data-hook": "review-body"})
            return [r.text.strip() for r in reviews]

        time.sleep(random.uniform(2, 5))

    return []

# ---------- SENTIMENT + TOPIC ANALYSIS ----------
def categorize_reviews_by_sentiment_and_topic(reviews):
    quality_keywords = ["quality", "durable", "material"]
    usability_keywords = ["easy", "simple", "user-friendly"]
    price_keywords = ["price", "cheap", "expensive", "value", "₹"]

    negative_words = ["useless", "bug", "not working", "lag", "stuck", "issue"]

    result = {
        "positive": [],
        "negative": [],
        "neutral": [],
        "quality": [],
        "usability": [],
        "price": []
    }

    for review in reviews:
        clean_review = review.replace("Read more", "").strip()
        text = clean_review.lower()

        compound = sia.polarity_scores(clean_review)["compound"]

        # ----- SENTIMENT (PRIORITY ORDER) -----
        if any(w in text for w in negative_words):
            result["negative"].append(clean_review)

        elif compound >= 0.05:
            result["positive"].append(clean_review)

        elif compound <= -0.05:
            result["negative"].append(clean_review)

        else:
            result["neutral"].append(clean_review)

        # ----- TOPICS -----
        if any(k in text for k in quality_keywords):
            result["quality"].append(clean_review)

        if any(k in text for k in usability_keywords):
            result["usability"].append(clean_review)

        if any(k in text for k in price_keywords):
            result["price"].append(clean_review)

    return result

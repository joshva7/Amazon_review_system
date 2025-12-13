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

# ---------- DEMO / MOCK REVIEWS (90 ITEMS TOTAL) ----------
MOCK_REVIEWS = [

    # ================= POSITIVE REVIEWS (30) =================
    "Excellent phone for the price. Battery life is amazing.",
    "Very smooth performance and good build quality.",
    "Value for money product. Totally satisfied.",
    "Display quality is bright and clear.",
    "Camera works well in daylight conditions.",
    "Fast charging is very useful.",
    "Good phone for daily use without lag.",
    "Sound quality is loud and clear.",
    "Premium design and solid build quality.",
    "No heating issue during normal usage.",
    "Battery lasts more than a full day.",
    "Software experience is smooth and clean.",
    "Good gaming performance for this budget.",
    "Touch response is very fast.",
    "Phone feels light and comfortable to hold.",
    "Great network reception and call clarity.",
    "UI animations are smooth.",
    "Apps open quickly without delay.",
    "Good storage and RAM management.",
    "Camera stabilization is decent.",
    "Good quality display for watching videos.",
    "Speaker output is loud and clear.",
    "Charging speed is impressive.",
    "Fingerprint sensor works accurately.",
    "Face unlock is fast and reliable.",
    "Good phone for students.",
    "Build quality feels durable.",
    "No major issues noticed so far.",
    "Worth buying at this price.",
    "Overall very good smartphone.",

    # ================= NEUTRAL REVIEWS (30) =================
    "Phone is okay for the price.",
    "Average performance, nothing special.",
    "Battery life is decent but could be better.",
    "Camera quality is average.",
    "Build quality is fine.",
    "Works well for basic usage.",
    "Heating issue sometimes but manageable.",
    "Charging speed is average.",
    "Software experience is okay.",
    "Display is acceptable for the price.",
    "Sound quality is average.",
    "Not bad, not great.",
    "Performance is decent for daily tasks.",
    "Phone feels slightly bulky.",
    "Camera struggles in low light.",
    "UI has minor lag occasionally.",
    "Battery drains faster during gaming.",
    "Acceptable phone for normal use.",
    "No major complaints so far.",
    "Phone meets basic expectations.",
    "Average phone in this segment.",
    "Good enough for calling and browsing.",
    "Performance is fine for light users.",
    "Screen brightness could be better.",
    "Design is simple and plain.",
    "Camera is usable but not impressive.",
    "Phone is okay for students.",
    "Build quality is average.",
    "Decent phone at this price.",
    "Overall an average experience.",

    # ================= NEGATIVE REVIEWS (30) =================
    "Very disappointed. Phone lags a lot.",
    "Worst experience. Phone hangs frequently.",
    "Battery drains very fast.",
    "Phone heats up quickly.",
    "Too many bugs in the software.",
    "Touch response is slow.",
    "Camera quality is poor.",
    "Screen freezes sometimes.",
    "Not worth the money.",
    "Charging takes too long.",
    "Phone restarts automatically.",
    "Performance is very slow.",
    "Frequent app crashes.",
    "Build quality feels cheap.",
    "Network issues occur often.",
    "Audio quality is poor.",
    "Phone becomes hot during calls.",
    "Battery backup is bad.",
    "Software update made it worse.",
    "Fingerprint sensor is inaccurate.",
    "Face unlock fails often.",
    "Gaming performance is very bad.",
    "UI lag is frustrating.",
    "Display has poor brightness.",
    "Phone stopped working properly.",
    "Camera app crashes frequently.",
    "Overheating issue is serious.",
    "Very poor optimization.",
    "Completely dissatisfied with purchase.",
    "Not recommended at all."
]

# ---------- PRODUCT IMAGE (OG IMAGE) ----------
def get_product_image(product_url):
    headers = {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        response = requests.get(product_url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            og_image = soup.find("meta", property="og:image")
            if og_image:
                return og_image.get("content")
    except requests.exceptions.RequestException:
        pass

    return None

# ---------- AMAZON SCRAPER ----------
def get_amazon_product_data(product_url, retries=5):
    for _ in range(retries):
        headers = {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept-Language": "en-US,en;q=0.9",
        }

        if "/dp/" in product_url:
            asin = product_url.split("/dp/")[1].split("/")[0]
            review_url = (
                f"https://www.amazon.in/product-reviews/{asin}"
                "?reviewerType=all_reviews"
            )
        else:
            review_url = product_url

        try:
            response = requests.get(review_url, headers=headers, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, "html.parser")
                reviews = soup.select(
                    "div[data-hook='review'] span[data-hook='review-body']"
                )
                if reviews:
                    return [r.get_text(strip=True) for r in reviews]
        except requests.exceptions.RequestException:
            pass

        time.sleep(random.uniform(2, 5))

    return []

# ---------- SENTIMENT + TOPIC ANALYSIS ----------
def categorize_reviews_by_sentiment_and_topic(reviews):
    quality_keywords = ["quality", "durable", "material", "build"]
    usability_keywords = ["easy", "simple", "user-friendly", "smooth", "lag"]
    price_keywords = ["price", "cheap", "expensive", "value", "₹"]

    negative_words = ["useless", "bug", "not working", "lag", "stuck", "issue", "heat"]

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

        # ----- SENTIMENT -----
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

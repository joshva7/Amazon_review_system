import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from .preprocess import clean_text

try:
    nltk.data.find("sentiment/vader_lexicon")
except LookupError:
    nltk.download("vader_lexicon")

sia = SentimentIntensityAnalyzer()

POS = 0.1
NEG = -0.1

def analyze_reviews(reviews):
    pos = neg = neu = 0

    for r in reviews:
        score = sia.polarity_scores(clean_text(r))["compound"]
        if score >= POS:
            pos += 1
        elif score <= NEG:
            neg += 1
        else:
            neu += 1

    total = len(reviews)
    return {
        "total 👍:": total,
        "positive 😀:": pos,
        "negative ☹️:": neg,
        "neutral 🥺:": neu,
        "positive_percent": round(pos / total * 100, 2) if total else 0,
        "negative_percent": round(neg / total * 100, 2) if total else 0,
        "neutral_percent": round(neu / total * 100, 2) if total else 0,
    }

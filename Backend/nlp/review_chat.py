from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load model once
model = SentenceTransformer("all-MiniLM-L6-v2")

def build_review_embeddings(reviews):
    if not reviews:
        return None
    return model.encode(reviews)

def chat_with_reviews(question, reviews, review_embeddings):
    if not reviews or review_embeddings is None:
        return {
            "answer": "No reviews available to answer.",
            "matched_reviews": []
        }

    question_embedding = model.encode([question])

    similarity_scores = cosine_similarity(
        question_embedding,
        review_embeddings
    )[0]

    top_indexes = np.argsort(similarity_scores)[-3:][::-1]
    matched_reviews = [reviews[i] for i in top_indexes]

    answer = "Based on customer reviews: " + " | ".join(matched_reviews)

    return {
        "answer": answer,
        "matched_reviews": matched_reviews
    }

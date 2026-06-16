# Amazon Review Sentiment Analysis System

A full-stack web application that analyzes product reviews using Natural Language Processing (NLP). Users can submit product reviews and receive instant sentiment predictions categorized as Positive, Negative, or Neutral using the NLTK VADER sentiment analysis model.

---

## Project Overview

The Amazon Review Sentiment Analysis System helps users understand the overall sentiment of product reviews through automated text analysis. The application consists of a responsive frontend interface and a Python-based backend API that performs sentiment classification.

> **Note:** This project does not scrape or collect data from Amazon. All reviews are user-provided or sourced from demo/sample datasets for educational purposes only.

---

## Features

### Frontend

* Modern and responsive user interface
* Submit product reviews for analysis
* Real-time sentiment prediction display
* Easy-to-use review input form
* Displays sentiment results with confidence scores

### Backend

* REST API for sentiment analysis
* NLP-powered review processing
* Sentiment classification using NLTK VADER
* JSON request and response handling
* Scalable backend architecture

---

## Tech Stack

### Frontend

* HTML5
* Tailwind 5v
* JavaScript
* React

### Backend

* Python
* Flask
* NLTK
* VADER Sentiment Analyzer

---

## Project Structure

```bash
Amazon_review_system/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── assets/
│   └── package.json
│
├── Backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── sentiment_analysis.py
│   └── models/
│
└── README.md
```

---

## How Sentiment Analysis Works

The backend uses the **VADER (Valence Aware Dictionary and Sentiment Reasoner)** model from the NLTK library.

### Sentiment Categories

| Compound Score         | Sentiment |
| ---------------------- | --------- |
| >= 0.05                | Positive  |
| <= -0.05               | Negative  |
| Between -0.05 and 0.05 | Neutral   |

The model evaluates the emotional tone of review text and returns sentiment scores.

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/joshva7/Amazon_review_system.git
cd Amazon_review_system
```

---

## Backend Setup

Navigate to Backend directory:

```bash
cd Backend
```

Create Virtual Environment:

```bash
python -m venv venv
```

Activate Environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Download NLTK Resources:

```python
import nltk
nltk.download('vader_lexicon')
```

Run Backend Server:

```bash
python app.py
```

Backend runs at:

```bash
http://localhost:5000
```

---

## Frontend Setup

Navigate to Frontend directory:

```bash
cd Frontend
```

Install Dependencies:

```bash
npm install
```

Start Frontend:

```bash
npm start
```

Frontend runs at:

```bash
http://localhost:3000
```

---

## API Endpoint

### Analyze Review Sentiment

**POST**

```http
/api/analyze
```

### Request Body

```json
{
  "review": "This product is amazing and works perfectly."
}
```

### Response

```json
{
  "sentiment": "Positive",
  "compound_score": 0.87,
  "positive": 0.72,
  "neutral": 0.25,
  "negative": 0.03
}

---

## Future Enhancements

* Deep Learning-based sentiment analysis
* Product recommendation system
* User authentication
* Sentiment history dashboard
* Review analytics visualization
* Multi-language sentiment support

---

## Educational Purpose Disclaimer

This project is developed for educational and learning purposes.

* No Amazon data is scraped.
* No Amazon APIs are used.
* Reviews are user-generated or sourced from sample datasets.
* The project demonstrates NLP sentiment analysis concepts using NLTK VADER.

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to GitHub
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

Pradeesh Kumar

GitHub: https://github.com/joshva7

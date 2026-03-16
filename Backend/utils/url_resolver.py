import requests

def resolve_amazon_url(url: str) -> str:
    try:
        r = requests.get(
            url,
            allow_redirects=True,
            timeout=10,
            headers={"User-Agent": "Mozilla/5.0"}
        )
        return r.url
    except Exception:
        return url

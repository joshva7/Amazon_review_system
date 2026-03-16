import re

def extract_asin(url: str):
    if not url:
        return None

    patterns = [
        r"/dp/([A-Z0-9]{10})",
        r"/gp/product/([A-Z0-9]{10})",
        r"/product/([A-Z0-9]{10})",
    ]

    for p in patterns:
        m = re.search(p, url)
        if m:
            return m.group(1)

    return None

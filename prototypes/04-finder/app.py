from flask import Flask, jsonify, request, render_template
import requests
import difflib
import re

app = Flask(__name__)
DISCOGS_TOKEN = "YOUR_DISCOGS_TOKEN"
HEADERS = {
    "User-Agent": "RareGemFinderApp",
    "Authorization": f"Discogs token={DISCOGS_TOKEN}"
}

def parse_advanced_search(query):
    year_match = re.search(r'\b(19|20)\d{2}\b', query)
    year = year_match.group(0) if year_match else None
    base_query = re.sub(r'\b(19|20)\d{2}\b', '', query).strip()
    cleaned_query = base_query.lower()
    return cleaned_query, year

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gems')
def rare_gem_search():
    raw_query = request.args.get('query', 'boogie 1983')
    query, year = parse_advanced_search(raw_query)

    url = "https://api.discogs.com/database/search"
    params = {
        'q': query,
        'format': 'Vinyl',
        'token': DISCOGS_TOKEN,
        'per_page': 20,
        'page': 1
    }

    if year:
        params['year'] = year

    response = requests.get(url, params=params, headers=HEADERS)
    results = response.json().get("results", [])
    gems = []

    for index, item in enumerate(results):
        title = item.get('title', '')
        release_id = item.get('id')
        thumb = item.get('thumb', '')
        price = item.get('lowest_price', None)

        stats = {
            "lowest_price": 8,
            "median_price": 48,
            "highest_price": 90,
            "num_for_sale": 2,
            "num_sold": 17
        }

        median = stats.get("median_price")
        deal_score = round((1 - price / median) * 100, 1) if price and median else None
        match_score = difflib.SequenceMatcher(None, query.lower(), title.lower()).ratio()

        gems.append({
            'title': title,
            'label': item.get('label', []),
            'year': item.get('year', 'N/A'),
            'price': price,
            'link': item.get('resource_url'),
            'thumb': thumb,
            'deal_score': deal_score,
            'match_score': round(match_score * 100, 1),
            'sales_stats': stats
        })

    return jsonify(gems)
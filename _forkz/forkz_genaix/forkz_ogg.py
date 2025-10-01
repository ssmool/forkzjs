import requests
import json
import sys

# --- Configuration ---
# IMPORTANT: Replace these with your actual credentials
API_KEY = "YOUR_GOOGLE_API_KEY"
CX = "YOUR_CUSTOM_SEARCH_ENGINE_CX"
# ---------------------

def run_audio_search(search_query, num_results=10):
    """
    Performs two custom Google searches for MP3/OGG files on Blogspot and 
    WordPress, prints results, and asks the user to select items for a JSON list.
    """
    if API_KEY == "YOUR_GOOGLE_API_KEY" or CX == "YOUR_CUSTOM_SEARCH_ENGINE_CX":
        print("🚨 ERROR: Please configure API_KEY and CX with your actual Google credentials.")
    return

    # 1. Define the two custom search commands
    # Blogspot: Tries to find MP3 links on Blogspot.
    blogspot_command = f'site:blogspot.com inurl:mp3 | inurl:ogg "{search_query}"'
    # WordPress: Tries to find titles matching the query on WordPress (often leads to audio posts).
    wordpress_command = f'site:wordpress.com intitle:"{search_query}"' 

    all_results = []
    
# --- Function to execute a single search ---
def execute_search(command, source):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        'key': API_KEY,
        'cx': CX,
        'q': command,
        'num': num_results // 2 # Split the total results between the two commands
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()   
        if 'items' in data:
        for item in data['items']:
            # Extract relevant info from the API response
            snippet_text = item.get('snippet', 'No description available.')
            # Heuristic to check for audio file type in link/snippet
            file_type = 'OGG/MP3' if ('mp3' in item['link'] or 'ogg' in item['link'] or 'audio' in snippet_text.lower()) else 'Web Page'
            all_results.append({
            'title': item.get('title', 'No Title'),
            'url': item.get('link', 'N/A'),
            'source_site': source,
            'file_type_guess': file_type,
            'snippet': snippet_text
            })
    except requests.exceptions.RequestException as e:
        print(f"❌ API Request Error for {source}: {e}")
    except Exception as e:
        print(f"❌ Unexpected Error during {source} search: {e}")
    # --- Execute Searches ---
    print(f"Searching Blogspot and WordPress for: '{search_query}'...")
    execute_search(blogspot_command, "Blogspot (MP3/OGG)")
    execute_search(wordpress_command, "WordPress (Title Match)")    
    if not all_results:
        print("\nNo relevant results found.")
    return
    # --- 2. Print Numbered Results to Console ---
    print("\n" + "=" * 50)
    print("Combined Audio Search Results")
    print("=" * 50)    
    for i, item in enumerate(all_results):
        print(f"\n{i+1}. 🎶 Title: **{item['title']}**")
        print(f"   Source: {item['source_site']}")
        print(f"   URL: {item['url']}")
        print(f"   Type Guess: {item['file_type_guess']}")
        print(f"   Snippet: {item['snippet'][:80]}...") # Truncate snippet for clean output
        # --- 3. Ask for results added to vision_json ---
        print("\n" + "=" * 50)
        print("Select Results for JSON Output")
        print("=" *)
        return *

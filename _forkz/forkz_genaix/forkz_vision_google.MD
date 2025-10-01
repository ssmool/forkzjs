⚠️ Prerequisite Setup
Before running the script, you must obtain the following credentials:

Google API Key:

Go to the Google Cloud Console.

Create a new project.

Search for and enable the Custom Search API.

Create an API Key under "Credentials."

Custom Search Engine ID (CX):

Go to the Google Custom Search page.

Create a new search engine.

Under "What exactly do you want to search?", select "Search the entire web" (or a specific site, but searching the entire web is required for a general image search).

Go to "Edit search engine" -> "Setup" -> "Basics" and make sure Image search is toggled ON.

Copy the Search Engine ID (CX).

To fulfill your request for a Python script to search Google Images and display the results on the console, you must use the Google Custom Search Engine (CSE) API, as there is no simple, non-scraping public API for Google Images.

This script uses the Python requests library to interface with the Custom Search API.

⚠️ Prerequisite Setup
Before running the script, you must obtain the following credentials:

Google API Key:

Go to the Google Cloud Console.

Create a new project.

Search for and enable the Custom Search API.

Create an API Key under "Credentials."

Custom Search Engine ID (CX):

Go to the Google Custom Search page.

Create a new search engine.

Under "What exactly do you want to search?", select "Search the entire web" (or a specific site, but searching the entire web is required for a general image search).

Go to "Edit search engine" -> "Setup" -> "Basics" and make sure Image search is toggled ON.

Copy the Search Engine ID (CX).

📜 Python Script: Google Search_images.py
This script will search for the keyword and print the image's title, direct URL, and dimensions in a numbered list.

Python

import requests
import sys

# --- Configuration ---
# IMPORTANT: Replace these with your actual credentials
API_KEY = "YOUR_GOOGLE_API_KEY"
CX = "YOUR_CUSTOM_SEARCH_ENGINE_CX"
# ---------------------

def google_image_search(keyword, num_results=10):
    """
    Searches Google Images via the Custom Search Engine API and prints
    results to the console in a numbered, field-separated format.
    """
    if API_KEY == "YOUR_GOOGLE_API_KEY" or CX == "YOUR_CUSTOM_SEARCH_ENGINE_CX":
        print("🚨 ERROR: Please configure API_KEY and CX with your actual Google credentials.")
        print("   - API Key: Get from Google Cloud Console.")
        print("   - CX ID: Get from Google Custom Search Engine.")
        return

    print(f"Searching Google Images for: '{keyword}'...")
    print("-" * 30)

    try:
        # Google Custom Search API endpoint
        url = "https://www.googleapis.com/customsearch/v1"
        
        # API request parameters
        params = {
            'key': API_KEY,
            'cx': CX,
            'q': keyword,
            'searchType': 'image', # Essential parameter for image search
            'num': num_results
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status() # Raises an HTTPError for bad responses (4xx or 5xx)
        
        data = response.json()

        if 'items' not in data:
            # The 'items' key is missing if no results are found
            print(f"No image results found for '{keyword}'.")
            return

        photos = data['items']
        
        print(f"Displaying first {len(photos)} results:")
        print("=" * 30)
        
        # Iterate over the results and print them in the requested format
        for i, item in enumerate(photos):
            image_info = item.get('image', {})
            
            # 1. Numbered List and Title Field
            print(f"\n{i+1}. 🖼️ Source Title: **{item.get('title', 'No Title')}**")
            
            # 2. Item info separated by fields
            print(f"   Image URL: {item.get('link', 'N/A')}")
            print(f"   Context Page: {image_info.get('contextLink', 'N/A')}")
            print(f"   Dimensions: {image_info.get('width', 'N/A')}px x {image_info.get('height', 'N/A')}px")
            print(f"   File Size: {image_info.get('byteSize', 'N/A')} bytes")

    except requests.exceptions.RequestException as e:
        print(f"❌ An error occurred during the API request. Check your key/CX or connection: {e}")
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

# --- Main execution block ---
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python google_search_images.py <keyword>")
        sys.exit(1)
    
    # Get the keyword from command line arguments (joining multiple words)
    search_keyword = " ".join(sys.argv[1:])
    
    # Set the maximum number of results to display (max is 10 per API call)
    RESULTS_LIMIT = 10
    
    google_image_search(search_keyword, RESULTS_LIMIT)
🏃 How to Run
Install the library: Open your terminal and run:

Bash

pip install requests
Save the script: Save the code above as Google Search_images.py.

Replace credentials: Update API_KEY and CX in the script with your actual values.

Execute the script: Run from the terminal, passing your search term:

Bash

python google_search_images.py "eiffel tower night"
Example Console Output
Searching Google Images for: 'eiffel tower night'...
------------------------------
Displaying first 10 results:
==============================

1. 🖼️ Source Title: **Eiffel Tower Paris At Night Wallpaper**
   Image URL: https://example.com/images/eiffel_tower_night.jpg
   Context Page: https://www.examplewallpaper.com/
   Dimensions: 1920px x 1080px
   File Size: 452123 bytes

2. 🖼️ Source Title: **The Sparkling Eiffel Tower**
   Image URL: https://secondexample.com/photo/eiffel_sparkle.jpeg
   Context Page: https://www.secondexamplephotography.com/
   Dimensions: 1200px x 800px
   File Size: 210590 bytes
   
... (more results)

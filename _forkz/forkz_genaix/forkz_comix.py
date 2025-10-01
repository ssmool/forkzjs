import json
import random
from typing import List, Dict, Any

# --- CONFIGURATION (In a real script, this would hold API keys) ---
# GIPHY_API_KEY = "YOUR_GIPHY_API_KEY"
# PINTEREST_ACCESS_TOKEN = "YOUR_PINTEREST_TOKEN"

# --- PLACEHOLDER DATA & FUNCTIONS (FOR DEMONSTRATION) ---

def simulate_giphy_search(query: str, limit: int = 2) -> List[Dict[str, str]]:
    """Simulates Giphy search results."""
    base_id = hash(query) % 1000
    return [
        {
            "url": f"https://giphy.com/gifs/{base_id + i}",
            "embed": f"https://giphy.com/embed/{base_id + i}",
            "thumbnail": f"https://media.giphy.com/media/{base_id + i}/200w.gif",
            "channel": f"Giphy Channel {i}",
            "description": f"GIF result {i} for '{query}' from Giphy.",
            "title": f"Giphy | {query} Animation {i}"
        }
        for i in range(limit)
    ]

def simulate_pinterest_search(query: str, limit: int = 2) -> List[Dict[str, str]]:
    """Simulates Pinterest search results."""
    base_id = hash(query) % 1000 + 1000
    return [
        {
            "url": f"https://www.pinterest.com/pin/{base_id + i}/",
            "embed": f"N/A (Pinterest Pins often use dedicated widgets)",
            "thumbnail": f"https://i.pinimg.com/236x/{base_id + i}.jpg",
            "channel": f"Pinterest User {i}",
            "description": f"Pin result {i} for '{query}' from Pinterest.",
            "title": f"Pinterest | {query} Idea {i}"
        }
        for i in range(limit)
    ]

def simulate_google_image_search(query: str, limit: int = 1) -> List[Dict[str, str]]:
    """
    Simulates Google Images search results. 
    (Reliable API not available, this is purely illustrative).
    """
    base_id = hash(query) % 1000 + 2000
    return [
        {
            "url": f"https://www.google.com/imgres?imgurl=example.com/{base_id + i}.jpg",
            "embed": "N/A (Google doesn't provide embed for raw images)",
            "thumbnail": f"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_placeholder_{i}",
            "channel": "Google Images",
            "description": f"Image result {i} for '{query}' from Google Search.",
            "title": f"Google | {query} Picture {i}"
        }
        for i in range(limit)
    ]

def aggregate_search_results(query: str) -> List[Dict[str, str]]:
    """
    Calls all simulated search functions and aggregates results.
    In a real script, API requests would replace the simulated calls.
    """
    print(f"\n[Searching Giphy, Pinterest, and Google Images for: '{query}']")
    
    results = []
    # Mix up the results to simulate real-world varied search
    results.extend(simulate_giphy_search(query, limit=2))
    results.extend(simulate_pinterest_search(query, limit=2))
    results.extend(simulate_google_image_search(query, limit=1))
    
    random.shuffle(results) # Shuffle to look more organic
    return results

# -------------------------------------------------------------------

def display_results_and_select(results: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Displays search results and handles user selection by number.
    This function is identical in logic to the previous script.
    """
    if not results:
        print("❌ No images/media found for your search query.")
        return []

    print("\n\n--- 🔍 Aggregated Search Results ---")
    
    # Display results by number
    for i, item in enumerate(results, 1):
        source = "Giphy" if "Giphy" in item['channel'] else ("Pinterest" if "Pinterest" in item['channel'] else "Google")
        print(f"\n{i}. **{item['title']}** ({source})")
        print(f"   Channel/User: {item['channel']}")
        print(f"   URL: {item['url']}")
        print(f"   Description (Snippet): {item['description'][:70]}...")

    print("\n------------------------------------")
    
    # Get user selection
    while True:
        selection_input = input(
            "Enter the **numbers** of the media items to add to your library, separated by a **comma** (e.g., 1,3,4): "
        ).strip()

        if not selection_input:
            print("No selection made. Returning an empty library.")
            return []

        try:
            # Convert comma-separated string to a list of integers (media indices)
            selected_indices = [int(x.strip()) for x in selection_input.split(',')]
            
            # Validate indices
            max_index = len(results)
            valid_selections = []
            
            for index in selected_indices:
                if 1 <= index <= max_index:
                    # Append the selected media dictionary
                    valid_selections.append(results[index - 1])
                else:
                    print(f"⚠️ Warning: Selection '{index}' is out of range (1 to {max_index}) and was ignored.")
            
            if valid_selections:
                print(f"\n✅ Selected {len(valid_selections)} media items.")
                return valid_selections
            else:
                print("❌ No valid selections were made. Please try again.")

        except ValueError:
            print("❌ Invalid input format. Please ensure you only enter numbers separated by commas (e.g., 1, 2).")

def create_vision_json(items: List[Dict[str, str]]) -> str:
    """
    Formats the list of media dictionaries into the requested JSON string format.
    """
    # The final JSON structure is a list of the media dictionaries
    return json.dumps(items, indent=4)

# --- MAIN EXECUTION BLOCK ---
if __name__ == "__main__":
    
    print("🖼️ Welcome to **forkz_comix.py** - Media Search 🖼️")
    
    # 1. Get search query from the user
    search_query = input("\nEnter your search query (e.g., 'superhero sketch'): ").strip()
    
    if not search_query:
        print("Exiting: No search query provided.")
    else:
        # 2. Search for media across all platforms (using placeholder functions)
        media_results = aggregate_search_results(search_query)
        
        # 3. Display results and allow user selection
        selected_media = display_results_and_select(media_results)
        
        # 4. Generate the final JSON string
        # NOTE: The requested output name is 'str_vision'
        str_vision = create_vision_json(selected_media)
        
        # 5. Output the final result
        print("\n\n*** 💾 Final `str_vision` JSON Output ***")
        print("--------------------------------------------------")
        print(str_vision)
        print("--------------------------------------------------")
        
        print(f"\n✨ Operation complete. Added {len(selected_media)} media items to the library JSON.")

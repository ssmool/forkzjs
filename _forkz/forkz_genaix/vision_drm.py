#pip install pytube
import json
from pytube import Search, YouTube
from typing import List, Dict, Any

# --- Data Structure for Output ---
# Define the fields required in the final JSON, though we can only
# reliably get a subset of these fields (url, title, thumbnail) 
# directly from the pytube search results without extra API calls.
FIELD_DEFAULTS = {
    "url": "N/A",
    "embed": "N/A",
    "thumbnail": "N/A",
    "channel": "N/A",
    "description": "N/A",
    "title": "N/A"
}

def search_youtube_videos(keyword: str) -> List[Dict[str, str]]:
    """
    Searches YouTube using pytube and structures the results.
    """
    print(f"\nSearching YouTube for keyword: '{keyword}'...")
    
    try:
        # 1. Perform the search
        s = Search(keyword)
        
        # Limit the results to a reasonable number (e.g., top 10)
        video_results = s.results[:10] 
        
        structured_results = []
        for v in video_results:
            # Pytube Video object provides key details
            video_data = FIELD_DEFAULTS.copy()
            
            # Populate the available fields from the pytube search result object
            video_data["url"] = v.watch_url
            video_data["title"] = v.title
            
            # The thumbnail URL is available as an attribute
            # We use the default thumbnail quality for simplicity
            if hasattr(v, 'thumbnail_url'):
                 video_data["thumbnail"] = v.thumbnail_url
            
            # The embed URL is constructed from the video ID
            video_id = v.video_id
            video_data["embed"] = f"https://www.youtube.com/embed/{video_id}"
            
            # Note: Pytube search results don't easily provide 'channel', 'description'
            # without making a *second* full fetch request (YouTube(v.watch_url).initial_data), 
            # which is slow. We keep them as N/A here for performance.
            
            structured_results.append(video_data)
            
        return structured_results

    except Exception as e:
        print(f"❌ An error occurred during search: {e}")
        return []

# -------------------------------------------------------------------

def display_results_and_select(results: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Displays search results and handles user selection by number.
    """
    if not results:
        print("❌ No videos found for your search query.")
        return []

    print("\n--- 🔍 Search Results ---")
    
    # Display results by number
    for i, video in enumerate(results, 1):
        # Format the item details neatly for the console
        print(f"\n{i}. **{video['title']}**")
        print(f"   URL: {video['url']}")
        print(f"   Thumbnail: {video['thumbnail'][:60]}...")
        print(f"   Embed: {video['embed']}")
        print(f"   Channel: {video['channel']}")
        print(f"   Description: {video['description']}")

    print("\n-------------------------")
    
    # Get user selection
    while True:
        selection_input = input(
            "Enter the **numbers** of the videos to add to your library, separated by a **comma** (e.g., 1,3,4): "
        ).strip()

        if not selection_input:
            print("No selection made. Returning an empty library.")
            return []

        try:
            # Convert comma-separated string to a list of integers (video indices)
            selected_indices = [int(x.strip()) for x in selection_input.split(',')]
            
            # Validate indices
            max_index = len(results)
            valid_selections = []
            
            for index in selected_indices:
                if 1 <= index <= max_index:
                    # Append the selected video dictionary
                    valid_selections.append(results[index - 1])
                else:
                    print(f"⚠️ Warning: Selection '{index}' is out of range (1 to {max_index}) and was ignored.")
            
            if valid_selections:
                print(f"\n✅ Selected {len(valid_selections)} videos.")
                return valid_selections
            else:
                print("❌ No valid selections were made. Please try again.")

        except ValueError:
            print("❌ Invalid input format. Please ensure you only enter numbers separated by commas (e.g., 1, 2).")

def create_vision_json(videos: List[Dict[str, str]]) -> str:
    """
    Formats the list of video dictionaries into the requested JSON string format.
    """
    # The final JSON structure is a list of the video dictionaries
    return json.dumps(videos, indent=4)

# --- MAIN EXECUTION BLOCK ---
if __name__ == "__main__":
    
    print("🎬 Welcome to **youtube_drm.py** - YouTube Search 🎬")
    
    # 1. Get search query from the user
    search_keyword = input("\nEnter your YouTube search keyword: ").strip()
    
    if not search_keyword:
        print("Exiting: No search keyword provided.")
    else:
        # 2. Search for videos
        video_results = search_youtube_videos(search_keyword)
        
        # 3. Display results and allow user selection
        selected_videos = display_results_and_select(video_results)
        
        # 4. Generate the final JSON string
        str_vision = create_vision_json(selected_videos)
        
        # 5. Output the final result
        print("\n\n*** 💾 Final `str_vision` JSON Output ***")
        print("--------------------------------------------------")
        print(str_vision)
        print("--------------------------------------------------")
        
        print(f"\n✨ Operation complete. Added {len(selected_videos)} videos to the library JSON.")

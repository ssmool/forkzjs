import json
from typing import List, Dict, Any

# --- PLACEHOLDER DATA & FUNCTION (FOR DEMONSTRATION) ---
# In a real script, this function would use the YouTube Data API v3
# to search videos and extract the necessary fields.

def youtube_search_placeholder(query: str) -> List[Dict[str, str]]:
    """
    Placeholder function to simulate YouTube video search results.
    
    In a real implementation, this would:
    1. Initialize the YouTube Data API client with an API key.
    2. Call the 'search.list' method.
    3. Call the 'videos.list' method to get full details (like description).
    4. Format the results into the required dictionary structure.
    """
    print(f"\n[Simulating YouTube search for: '{query}']")
    
    # Dummy data for demonstration purposes
    if "programming" in query.lower():
        return [
            {
                "url": "https://www.youtube.com/watch?v=v1",
                "embed": "https://www.youtube.com/embed/v1",
                "thumbnail": "https://i.ytimg.com/vi/v1/hqdefault.jpg",
                "channel": "Code Master Channel",
                "description": "Learn the basics of Python in 10 minutes.",
                "title": "Python for Beginners - Quick Guide"
            },
            {
                "url": "https://www.youtube.com/watch?v=v2",
                "embed": "https://www.youtube.com/embed/v2",
                "thumbnail": "https://i.ytimg.com/vi/v2/hqdefault.jpg",
                "channel": "Tech Tutorials Inc.",
                "description": "Advanced JavaScript concepts explained simply.",
                "title": "Deep Dive into JavaScript Closures"
            },
            {
                "url": "https://www.youtube.com/watch?v=v3",
                "embed": "https://www.youtube.com/embed/v3",
                "thumbnail": "https://i.ytimg.com/vi/v3/hqdefault.jpg",
                "channel": "Data Science Hub",
                "description": "Introduction to Machine Learning with Scikit-learn.",
                "title": "ML Fundamentals: Scikit-learn Basics"
            }
        ]
    else:
        return []

# -------------------------------------------------------------------

def display_results_and_select(results: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Displays search results and handles user selection.
    """
    if not results:
        print("❌ No videos found for your search query.")
        return []

    print("\n\n--- 🔍 Search Results ---")
    
    # Display results by number
    for i, video in enumerate(results, 1):
        print(f"\n{i}. **{video['title']}**")
        print(f"   Channel: {video['channel']}")
        print(f"   URL: {video['url']}")
        print(f"   Description (Snippet): {video['description'][:70]}...")

    print("\n-------------------------")
    
    # Get user selection
    while True:
        selection_input = input(
            "Enter the **numbers** of the videos to add to your library, separated by a **comma** (e.g., 1,3,4): "
        ).strip()

        if not selection_input:
            print("No selection made. Returning an

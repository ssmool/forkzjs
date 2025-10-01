🚀 How to Run the Script
1. Get an API Key
You need to obtain a Flickr API Key and Secret by creating an account and registering a non-commercial application on the official Flickr website (look for the "API" or "App Garden" section).

2. Install the Library
The script requires the flickrapi Python package. Open your terminal or command prompt and run:

Bash

pip install flickrapi
3. Configure the Script
Open the flicker_search.py file and replace the placeholder values:

Python

# --- Configuration ---
# You need to replace these with your actual Flickr API Key and Secret
API_KEY = "YOUR_ACTUAL_API_KEY_HERE"
API_SECRET = "YOUR_ACTUAL_API_SECRET_HERE"
# ---------------------
4. Execute the Search
Run the script from your terminal, passing your search term as a command-line argument.

Example:

Bash

python flicker_search.py "golden retriever puppies"
Example Console Output
If you ran the example above, your console output would look something like this:

Searching Flickr for: 'golden retriever puppies'...
------------------------------
Total photos found: 1547. Displaying first 15 results:
==============================

1. 🖼️ Photo ID: 52984501234
   Title: **Puppy's First Snow Day**
   Owner: dogLover123
   Taken: 2025-01-10 14:30:00
   Views: 4521
   URL: https://farm66.staticflickr.com/65535/52984501234_a2b3c4d5e6_m.jpg

2. 🖼️ Photo ID: 52984501235
   Title: **Nap Time**
   Owner: CutePaws
   Taken: 2025-01-08 10:15:22
   Views: 3105
   URL: https://farm66.staticflickr.com/65535/52984501235_f7g8h9i0j1_m.jpg

3. 🖼️ Photo ID: 52984501236
   Title: **Golden Trio**
   Owner: petPhotog
   Taken: 2024-12-25 09:00:00
   Views: 6890
   URL: https://farm66.staticflickr.com/65535/52984501236_k2l3m4n5o6_m.jpg

... (more results)

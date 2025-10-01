#!/bin/bash

# Define the directory for project assets
FORKZ_ASSETS_DIR="_forkz_assets"
FORKZ_DATA_DIR="_data"

# --- Utility Functions (Placeholders) ---

# Function to simulate data encoding and saving (Highly simplified)
forkz_assemble_data() {
    local data_path="$1"
    local data_type="$2"
    local project_name="$3"
    
    # Create necessary directories
    mkdir -p "$project_name/$FORKZ_DATA_DIR"
    
    # Simulate Base64 encoding and saving. 
    # In a real scenario, this would involve processing the data 
    # into the specific forkzjs JSON format first.
    GUID=$(uuidgen | tr -d '-') # Generate a unique ID (requires uuidgen)
    ENCODED_FILE="$project_name/$FORKZ_DATA_DIR/_forkz_data64_${GUID}.skalz"

    # NOTE: This is a placeholder. Real forkzjs logic is much more complex.
    echo "Simulated data content for $data_path (Type: $data_type)" | base64 > "$ENCODED_FILE"
    
    echo "Data assembled and saved to: $ENCODED_FILE"
    FORKZ_DATA_FILE_GUID="$GUID"
}

# Function to simulate generating the main HTML content
forkz_generate_html() {
    local project_name="$1"
    local layout_type="$2"
    local search_opt="$3"
    local media_opt="$4"
    local stream_path="$5"
    
    HTML_FILE="$project_name/index.html"
    
    # Simulate fetching the correct layout template
    case "$layout_type" in
        1) TEMPLATE_URL="http://www.github.com/ssmool/forkz/assets/_html/list.html" ;;
        2) TEMPLATE_URL="http://www.github.com/ssmool/forkz/assets/_html/cards.html" ;;
        3) TEMPLATE_URL="http://www.github.com/ssmool/forkz/assets/_html/forms.html" ;;
        4) TEMPLATE_URL="http://www.github.com/ssmool/forkz/assets/_html/dashboard.html" ;;
        *) TEMPLATE_URL="http://www.github.com/ssmool/forkz/assets/_html/list.html" ;; # Default
    esac

    # Start assembling a basic HTML file (Highly simplified for shell script)
    echo "<!DOCTYPE html>" > "$HTML_FILE"
    echo "<html lang='en'>" >> "$HTML_FILE"
    echo "<head><title>$project_name</title>" >> "$HTML_FILE"
    echo "<script src='forkzjs.js'></script>" >> "$HTML_FILE" # Assume forkzjs.js is available
    
    # Add data loading script (converting non-JSON types is complex and simulated here)
    if [ "$forkz_type" != "1" ]; then # Not JSON
        # Simulate the remote conversion call
        echo "<script>_slalz = forkz_remote('$stream_path', _type = 'json')</script>" >> "$HTML_FILE"
    else
        # In a real forkzjs setup, the script would likely load the .skalz file or have an inline JSON object.
        echo "" >> "$HTML_FILE"
    fi
    
    # Add search feature if requested
    if [[ "$search_opt" =~ ^[Yy]$ ]]; then
        echo "<script src='/$FORKZ_ASSETS_DIR/_forkz_searchbar.js'></script>" >> "$HTML_FILE"
        echo "<script>setupSearch(data);</script>" >> "$HTML_FILE"
    fi

    # Media handling logic would go here, which would involve adding specific HTML/JSON
    # to the .skalz data file and adding relevant embedding code. (Skipped for brevity)

    echo "</head><body>" >> "$HTML_FILE"
    echo "" >> "$HTML_FILE"
    echo "<h1>Welcome to $project_name</h1>" >> "$HTML_FILE"
    echo "<div id='forkz-app'></div>" >> "$HTML_FILE" # Placeholder for forkzjs mount point
    echo "</body></html>" >> "$HTML_FILE"

    echo "HTML content generated: $HTML_FILE"
}

# Function to simulate ZIP generation with a password
forkz_generate_zip() {
    local project_name="$1"
    
    # Generate a random password (uses /dev/urandom and tr)
    FORKZ_ZIP_PASSWORD=$(LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c 16)
    ZIP_FILE="${project_name}.zip"

    echo ""
    echo "[*] Generating ZIP file: ${ZIP_FILE}..."
    
    # Requires 'zip' utility. Uses '-e' for encryption.
    # NOTE: This is a robust zip command. For simplicity, we use -r.
    zip -r -e "$ZIP_FILE" "$project_name" -P "$FORKZ_ZIP_PASSWORD" > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "✅ HTML Page Build Complete!"
        echo ""
        echo "This is your **${ZIP_FILE}** password: **${FORKZ_ZIP_PASSWORD}**"
        echo ""
    else
        echo "❌ Error: ZIP file generation failed. Do you have the 'zip' utility installed?"
    fi
}

# --- CLI Steps ---

echo "Forkz CLI HTML Authoring Tool"

# [step 0]> Register the Website name: 
while true; do
    read -r -p "[step 0]> Register the Website name: " forkz_project
    if [ -n "$forkz_project" ]; then
        # Sanitize project name for directory use
        forkz_project=$(echo "$forkz_project" | tr ' ' '_' | tr -cd '[:alnum:]_.-')
        echo "Project name registered as: **$forkz_project**"
        break
    fi
done

# ---

# [step 1]> Select data source: [json, csv, xml, rss]
echo ""
echo "[step 1]> Select data source:"
select data_type_choice in "json" "csv" "xml" "rss"; do
    case "$data_type_choice" in
        "json") forkz_type=1; echo "Source selected: **json** (1)"; break ;;
        "csv") forkz_type=2; echo "Source selected: **csv** (2)"; break ;;
        "xml") forkz_type=3; echo "Source selected: **xml** (3)"; break ;;
        "rss") forkz_type=4; echo "Source selected: **rss** (4)"; break ;;
        *) echo "Invalid choice. Please select 1-4." ;;
    esac
done

# ---

# [step 2]> Enter file path: ./data/mydata.[csv][json][xml][rss]
echo ""
read -r -p "[step 2]> Enter file path (use ';' as separator for multiple streams): " forkz_stream

# ---

# [step 3]> Choose layout: [list, cards, forms, dashboard]
echo ""
echo "[step 3]> Choose layout:"
select layout_choice in "list" "cards" "forms" "dashboard"; do
    case "$layout_choice" in
        "list") forkz_dom=1; echo "Layout selected: **list** (1)"; break ;;
        "cards") forkz_dom=2; echo "Layout selected: **cards** (2)"; break ;;
        "forms") forkz_dom=3; echo "Layout selected: **forms** (3)"; break ;;
        "dashboard") forkz_dom=4; echo "Layout selected: **dashboard** (4)"; break ;;
        *) echo "Invalid choice. Please select 1-4." ;;
    esac
done

# ---

# [step 4]> Add search? [y/N]
echo ""
read -r -p "[step 4]> Add search? [y/N] " forkz_search
forkz_search=${forkz_search:-N} # Default to 'N'

# ---

# [step 5]> Add images/videos? [y/N]
echo ""
read -r -p "[step 5]> Add images/videos? [y/N] " forkz_media
forkz_media=${forkz_media:-N} # Default to 'N'
if[[ "$forkz_media" =~ [Yy] ]]; then
	echo"Welcome to FORKZ VISION - create a library with videos online:"
	python forks_www_library.py
# ---

# [step 6]> Generate ZIP? [y/N]
echo ""
read -r -p "[step 6]> Generate ZIP? [y/N] " forkz_zip
forkz_zip=${forkz_zip:-N} # Default to 'N'

# ---

## [ASSEMBLY]

if [[ "$forkz_zip" =~ ^[Yy]$ ]]; then
    echo ""
    echo "--- Assembly and Generation ---"
    
    # 1. Create the main project directory
    mkdir -p "$forkz_project"

    # 2. Simulate Data Assembly and Encoding
    # NOTE: The script is designed to handle multiple streams via $forkz_stream 
    # but the following call only processes the first one for simplicity.
    first_stream=$(echo "$forkz_stream" | cut -d';' -f1)
    forkz_assemble_data "$first_stream" "$data_type_choice" "$forkz_project"

    # 3. Media Handling (Simulated)
    if [[ "$forkz_media" =~ ^[Yy]$ ]]; then
        echo "Media integration requested. (Real logic would involve YouTube/Google search and JSON composition in _data)"
        # This would normally involve complex interactive steps to build the media JSON 'forkzvision'
    fi

    # 4. Create necessary _forkz directory and files (Placeholder)
    mkdir -p "$forkz_project/$FORKZ_ASSETS_DIR"
    touch "$forkz_project/forkzjs.js" # Placeholder for the core library
    if [[ "$forkz_search" =~ ^[Yy]$ ]]; then
        touch "$forkz_project/$FORKZ_ASSETS_DIR/_forkz_searchbar.js" # Placeholder for search script
    fi

    # 5. Generate the main HTML page
    forkz_generate_html "$forkz_project" "$forkz_dom" "$forkz_search" "$forkz_media" "$first_stream"

    # 6. Generate ZIP file
    forkz_generate_zip "$forkz_project"

else
    echo "Generation skipped. Project variables stored (use them to manually run the build)."
fi

# ---

echo ""
echo "CLI session finished."

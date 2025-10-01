#!/bin/bash

# Define file paths
FIRST_FILE="$1"
SECOND_FILE="$2"
TOTAL_ARGS="$#"
LIBRARY_FILE="forkz_library.json"
NEW_NODE_FILE="forkz.json"
TEMP_FILE="temp_forkz_library.json"

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "❌ Error: 'jq' is not installed. Please install it to run this script."
    exit 1
fi

# Check if the required files exist
if [ ! -f "$FIRST_FILE" ]; then
    echo "❌ Error: Library file '$LIBRARY_FILE' not found."
    exit 1
fi

if [ ! -f "$SECOND_FILE" ]; then
    echo "❌ Error: New node file '$NEW_NODE_FILE' not found."
    exit 1
fi

echo "Starting JSON merge..."

# 1. Read the new node object (forkz.json) into a shell variable.
#NEW_NODE=$(cat "$FIRST_FILE")

# 2. Use jq to append the new node to the 'nodes' array in the library file.
# The expression '.nodes += [$NEW_NODE]' tells jq: 
# - Select the 'nodes' array.
# - Append (+=) a new element ([$NEW_NODE]) to it.
# Note: We pass the variable content into jq using --argjson to ensure it's treated as a JSON object, not a string.
jq --argjson new_node "$FIRST_FILE" '.nodes += [$new_node]' "$SECOND_FILE" > "$FIRST_FILE"

# Check if jq executed successfully
if [ $? -eq 0 ]; then
    echo "✅ Merge successful. Overwriting original file..."
    
    # 3. Overwrite the original library file with the content of the temporary file
    mv "$TEMP_FILE" "$LIBRARY_FILE"
    
    echo "✅ Successfully combined $NEW_NODE_FILE into $LIBRARY_FILE."
else
    echo "❌ Error: 'jq' failed to process the JSON. Check your JSON format."
    # Clean up the temp file if it exists and jq failed
    if [ -f "$FIRST_FILE" ]; then
        cat "$TEMP_FILE"
    fi
fi

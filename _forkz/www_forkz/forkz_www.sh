```bash
#!/bin/bash

# ────────────────
# forkz_www.sh
# ────────────────
# Install and run a ForkzJS-based website from forkz.zip
# Requires: unzip, python3

echo "🌐 ForkzJS Web Server Installer"

# Ask for TCP port
read -p "Enter the TCP port to run the web server on (default: 8080): " _forkzport
_forkzport=${_forkzport:-8080}

# Ask for TCP port
read -p "Enter the file.zip FORKZ GENAI WEBSITE to deploy: " _forkz_pkg
_forkz_pkg=${__forkz_pkg:www.zip}

# Check if forkz.zip exists
if [[ ! -f _forkz_pkg ]]; then
  echo "❌ Error: $_forkz_pkg not found in the current directory."
  exit 1
fi

# Create directory if not exists
mkdir -p forkz_www

# Unzip into forkz_www/
echo "📦 Extracting $_forkz_pkg into forkz_www/..."
unzip -o $_forkz_pkg -d forkz_www/ > /dev/null

# Navigate into the directory
cd forkz_www || exit

# Try to find the main folder (without .zip extension)
zip_name=$_forkz_pkg
if [[ -d "$zip_name" ]]; then
  cd "$zip_name" || exit
else
  echo "⚠️ Warning: '$zip_name/' folder not found. Serving forkz_www/ instead."
fi

# Launch server
echo "🚀 Starting server at http://localhost:$_forkzport"
python3 -m http.server "$_forkzport"

```


### ✅ Features:

1. Asks for a TCP port (`_forkzport`)
2. Unzips `forkz.zip` into `forkz_www/`
3. Serves the unzipped site via `python3 -m http.server $_forkzport`

---

## 📄 `forkz_www.sh`

```bash
#!/bin/bash

# ────────────────
# forkz_www.sh
# ────────────────
# Install and run a ForkzJS-based website from forkz.zip
# Requires: unzip, python3

echo "🌐 F🧬rkzJS Web Server Installer"

# Ask for TCP port
read -p "Enter the TCP port to run the web server on (default: 8080): " _forkzport
_forkzport=${_forkzport:-8080}

# Check if forkz.zip exists
if [[ ! -f "forkz.zip" ]]; then
  echo "❌ Error: forkz.zip not found in the current directory."
  exit 1
fi

# Create directory if not exists
mkdir -p forkz_www

# Unzip into forkz_www/
echo "📦 Extracting forkz.zip into forkz_www/..."
unzip -o forkz.zip -d forkz_www/ > /dev/null

# Navigate into the directory
cd forkz_www || exit

# Try to find the main folder (without .zip extension)
zip_name="forkz"
if [[ -d "$zip_name" ]]; then
  cd "$zip_name" || exit
else
  echo "⚠️ Warning: '$zip_name/' folder not found. Serving forkz_www/ instead."
fi

# Launch server
echo "🚀 Starting server at http://localhost:$_forkzport"
python3 -m http.server "$_forkzport"

```

---

## 🧪 How to Use It

### 1. Place this file next to `forkz.zip`

```
/your-folder/
├── forkz.zip
└── forkz_www.sh
```

### 2. Run it

```bash
chmod +x forkz_www.sh
./forkz_www.sh
```

### 3. Follow prompts:

* Enter a port (e.g. `8080`, `3000`)
* It will unzip and start the server

---

## 🌐 Example Output

```
🌐 ForkzJS Web Server Installer
Enter the TCP port to run the web server on (default: 8080): 3000
📦 Extracting forkz.zip into forkz_www/...
🚀 Starting server at http://localhost:3000
Serving HTTP on :: port 3000 ...
```

---


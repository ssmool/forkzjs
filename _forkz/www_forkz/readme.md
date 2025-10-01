### ✅ Features:

1. Asks for a TCP port (`_forkzport`)
2. Asks for a FORKZ PKG(www.zip) (`_forkzport`)
3. Unzips `forkz.zip` into `forkz_www/`
4. Serves the unzipped site via `python3 -m http.server $_forkzport`

---

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


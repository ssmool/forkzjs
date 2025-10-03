````markdown
# FORKZJS – AI Developer Manual

> ⚙️ Automatically generate complete HTML pages and websites from structured data sources like **JSON**, **RSS**, **XML**, and **CSV** using the modular **FORKZJS** system.

---

## 📁 Repository

**GitHub:** [https://github.com/ssmool/forkzjs](https://github.com/ssmool/forkzjs)

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Modules Overview](#modules-overview)
    - [forkzjs.js](#forkzjsjs)
    - [forkz_nav.js](#forkz_navjs)
    - [_forkz_css_auto.js](#_forkz_css_autojs)
    - [_forkz_mock.js](#_forkz_mockjs)
    - [_forkz_searchbar.js](#_forkz_searchbarjs)
    - [_forkz_skafolldingz.js](#_forkz_skafolldingzjs)
4. [FORKZ_WWWW Deployment](#forkz_wwww-deployment)
5. [FORKZGENAIX CLI Generator](#forkzgenaix-cli-generator)
6. [FORKZ KRAFTX Material Design](#forkz-kraftx-material-design)
7. [CSS Files](#css-files)
8. [Project Files](#project-files)
9. [License](#license)

---

## 📌 Introduction

**FORKZJS** is a modular JavaScript toolkit for AI-assisted web development. It turns structured data (JSON, XML, RSS, CSV) into dynamic websites and components through simple scripts or terminal commands.

Whether you're a developer, data scientist, or AI engineer, FORKZJS gives your data a web UI instantly.

---

## 🚀 Getting Started

### Step 1: Clone the repository

```bash
git clone https://github.com/ssmool/forkzjs
cd forkzjs
````

### Step 2: Include the scripts in your HTML

```html
<script src="_forks.js"></script>
<script>
  const _data = _forkz_remote("data.json", "json"); // Types: json, xml, csv, rss
</script>
```

---

## 🧩 Modules Overview

### `forkzjs.js`

Loads and parses remote data sources into `_data`.

```html
<script src="_forks.js"></script>
<script>
  const _data = _forkz_remote("data.json", "json");
</script>
```

---

### `forkz_nav.js`

Generates navigation links based on JSON sections.

```html
<script src="_forks_navz.js"></script>
<script>
  _forkz_add_nav(_data);
</script>
```

---

### `_forkz_css_auto.js`

Dynamically builds CSS styles from the `_data` schema.

```html
<script src="_forks_css_auto.js"></script>
<script>
  generateDynamicCSS(_data); // Injects styles into document.head
</script>
```

---

### `_forkz_mock.js`

Auto-generates HTML forms from the data.

```html
<script src="_forkz_mock.js"></script>
<script>
  buildForm(_data);
</script>
```

---

### `_forkz_searchbar.js`

Adds a searchable input bar to your HTML using the data.

```html
<script src="_forkz_searchbar.js"></script>
<script>
  setupSearch(_data);
</script>
```

---

### `_forkz_skafolldingz.js`

Creates HTML scaffolding automatically from `_data`.

```html
<script src="_forkz_skafolldingz.js"></script>
<script>
  init(_data);
</script>
```

---

## 🌐 FORKZ_WWWW Deployment

Use `forkz_www.sh` to deploy a `FORKZ_PACKAGE.ZIP` to a local web server.

```bash
chmod +x forkz_www.sh
./forkz_www.sh
```

You can run it on a custom port:

```bash
# Example: http://localhost:8080
```

---

## 🛠️ FORKZGENAIX CLI Generator

Auto-generate full website projects using a terminal prompt.

### Generate Pages from Data:

```bash
chmod +x forkz_genaiz.sh
./forkz_genaiz.sh
```

* Accepts: `.json`, `.csv`, `.xml`, `.rss`
* Output: `PROJECT.ZIP`

### Merge JSON Files:

```bash
chmod +x _forkz_merge.sh
./_forkz_merge.sh
```

---

## 🎨 FORKZ KRAFTX Material Design

Use pre-built UI components with modern Material Design.

---

### 📤 File Uploads – `_forkz_ftpzupx.js`

Uploads files via `base64` using Python server.

```html
<script src="_forkz_ftpzupx.js"></script>
<script>
  initializeForkzUp();
</script>
```

---

### 📰 RSS Feeds – `_forkz_kraftx_feed.js`

```html
<script src="_forkz_kraftx_feed.js"></script>
<script>
  loadNewsData(_data);
</script>
```

---

### 🧾 Forms – `_forkz_kraftx_forms.js`

```html
<script src="_forkz_kraftx_forms.js"></script>
<script>
  loadFormData(_data);
</script>
```

---

### 🎧📹 Media Components – `_forkz_kraftx_media.js`

```html
<script src="_forkz_kraftx_media.js"></script>

<forkz-audio player="float" shape="round" playlist="display"></forkz-audio>
<forkz-video shape="square" playlist="none"></forkz-video>

<script>
  const _dataNode = {
    id: 101,
    title: "Trailer do Projeto A",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1:00",
    poster: "https://placehold.co/400x250/333/fff?text=Video+A"
  };
  addPlaylist(_dataNode);
</script>
```

---

### 🎠 Media Carousel – `_forkz_kraftx_media_carrousel.js`

```html
<script src="_forkz_kraftx_media_carrousel.js"></script>
<script>
  forkz_bind(_data);
</script>
```

> 💡 See `_forkx_kraftx/examples/` for working demos and HTML samples.

---

## 🎨 CSS Files

Located in `_forkx_kraftx/`:

* `forkz_kraftx.css`
* `forkz_kraftx_mediax.css`
* `forkz_kraftx_feed.css`
* `forkz_kraftx_formz.css`
* `forkz_kraftx_media_carrousel.css`

---

## 📁 Project Files

### `_forkz/genaix/`

* `forkz_genaiz.sh`
* `_forkz_merge.sh`
* `forks_www_library.py`
* `forkz_comix.py`
* `forkz_ogg.py`
* `forkz_kraftx_example.html`
* `_data/sample.json`

### `_forkz/`

* `_forks_navz.js`
* `_forkz_css_auto.js`
* `_forkz_mock.js`
* `_forkz_searchbar.js`
* `_forkz_skafolldingz.js`
* `forkz_example.html`
* `forkz_lib.js`
* `forkz_setup.sh`

---

## 📜 License

MIT License © [ssmool](https://github.com/ssmool)

---

> 🧠 Fork it. ⚡ Deploy it. 🤖 AI-generate it.
> **FORKZJS** – turning your data into live websites instantly.

```

---

Sure! Here's a **step-by-step Bash console tutorial** for using **FORKZJS** to generate a website from a sample JSON file and run it online using `forkz_genaiz.sh` and `forkz_www.sh`.

This will:

1. Use the sample JSON data.
2. Run the site generator (`forkz_genaiz.sh`).
3. Deploy it with the built-in web server (`forkz_www.sh`).

---

## 🖥️ Terminal Bash Guide: Run FORKZJS with `sample.json_data`

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/ssmool/forkzjs.git
cd forkzjs
```

---

### ✅ 2. Make Scripts Executable

```bash
chmod +x forkz_genaiz.sh
chmod +x forkz_www.sh
chmod +x _forkz_merge.sh
```

---

### ✅ 3. Run `forkz_genaiz.sh` with Sample JSON

> This will prompt you to select the file and format (JSON), and it will create a `PROJECT.ZIP`.

```bash
./forkz_genaiz.sh
```

📦 After generation, you will see a `project.zip` created in the current folder.

---

### ✅ 4. Deploy the Generated Website Locally

> This runs the local web server and unpacks the generated `.zip`.

```bash
./forkz_www.sh
```

💡 By default, it runs on:
**[http://localhost:8080](http://localhost:8080)**

You should see your auto-generated HTML site live in your browser.

---

### ✅ 5. Optional: Use `curl` to fetch & run scripts remotely

If you want to automate it fully (from remote or curl-based install):

```bash
chmod +x forkz_www.sh && curl -O ./forkz_www.sh && ./forkz_www.sh
```

---

## 📁 Input Example

Use this sample data file from your repo:

```
_forkz/forkz_genaix/sample.json_data
```

You’ll be prompted to enter the path during the script execution.

---

## 📎 Summary

| Step                    | Command                                                 |
| ----------------------- | ------------------------------------------------------- |
| Clone Repo              | `git clone https://github.com/ssmool/forkzjs`           |
| Enter Dir               | `cd forkzjs`                                            |
| Make Scripts Executable | `chmod +x forkz_genaiz.sh forkz_www.sh _forkz_merge.sh` |
| Generate Site           | `./forkz_genaiz.sh`                                     |
| Deploy Site             | `./forkz_www.sh`                                        |
| Access Site             | `http://localhost:8080`                                 |

---

Great! Here's a complete **Bash helper script** called `run_forkz_sample.sh` that automates the full process:

* Clones the repo (if not already cloned)
* Makes all needed scripts executable
* Runs `forkz_genaiz.sh` with the sample JSON
* Deploys the generated site with `forkz_www.sh`

---

## 📝 Script: `run_forkz_sample.sh`

```bash
#!/bin/bash

# -----------------------------
# FORKZJS Auto Runner Script
# -----------------------------
# Generates a site from JSON data
# and launches it locally on http://localhost:8080

REPO_URL="https://github.com/ssmool/forkzjs.git"
REPO_DIR="forkzjs"
DATA_FILE="_forkz/forkz_genaix/sample.json_data"
GEN_SCRIPT="forkz_genaiz.sh"
WWW_SCRIPT="forkz_www.sh"

echo "🚀 Starting FORKZJS Auto Generator..."

# Clone repo if not already
if [ ! -d "$REPO_DIR" ]; then
    echo "📥 Cloning FORKZJS repository..."
    git clone "$REPO_URL"
fi

cd "$REPO_DIR" || { echo "❌ Failed to enter $REPO_DIR"; exit 1; }

# Make scripts executable
echo "🔧 Setting permissions..."
chmod +x $GEN_SCRIPT $WWW_SCRIPT _forkz_merge.sh

# Check if data file exists
if [ ! -f "$DATA_FILE" ]; then
    echo "❌ Data file not found: $DATA_FILE"
    exit 1
fi

# Run generator
echo "📦 Generating website with: $DATA_FILE"
echo "$DATA_FILE" | ./$GEN_SCRIPT

# Run web server
echo "🌐 Deploying website locally at http://localhost:8080"
./$WWW_SCRIPT

echo "✅ All done! Visit http://localhost:8080 to view your site."
```

---

## ✅ How to Use

1. **Save the script** above as `run_forkz_sample.sh`
2. Make it executable:

```bash
chmod +x run_forkz_sample.sh
```

3. Run it:

```bash
./run_forkz_sample.sh
```

---

## 🌐 Output

After running, your generated HTML site will be live at:

```
http://localhost:8080
```

---

Perfect — here's the **upgraded version** of your `run_forkz_sample.sh` script with the following enhancements:

### ✅ Features:

1. **Clones the repo** (if not already)
2. **Sets permissions** on scripts
3. **Runs `forkz_genaiz.sh`** using the sample JSON file
4. **Automatically extracts the `.zip`**
5. **Launches the local web server**
6. **Opens the default browser to `http://localhost:8080`**

---

## 🧠 Final Script: `run_forkz_sample.sh`

```bash
#!/bin/bash

# -----------------------------
# FORKZJS Auto Runner Script
# -----------------------------
# Generates a site from JSON data,
# extracts ZIP, launches it locally, and opens browser.
# -----------------------------

REPO_URL="https://github.com/ssmool/forkzjs.git"
REPO_DIR="forkzjs"
DATA_FILE="_forkz/forkz_genaix/sample.json_data"
GEN_SCRIPT="forkz_genaiz.sh"
WWW_SCRIPT="forkz_www.sh"
PROJECT_ZIP="project.zip"
PORT=8080
BROWSER_URL="http://localhost:$PORT"

echo "🚀 Starting FORKZJS Auto Generator..."

# Clone repo if not already
if [ ! -d "$REPO_DIR" ]; then
    echo "📥 Cloning FORKZJS repository..."
    git clone "$REPO_URL"
    if [ $? -ne 0 ]; then
        echo "❌ Git clone failed."
        exit 1
    fi
fi

cd "$REPO_DIR" || { echo "❌ Failed to enter $REPO_DIR"; exit 1; }

# Make scripts executable
echo "🔧 Setting permissions on scripts..."
chmod +x $GEN_SCRIPT $WWW_SCRIPT _forkz_merge.sh

# Check data file
if [ ! -f "$DATA_FILE" ]; then
    echo "❌ Data file not found: $DATA_FILE"
    exit 1
fi

# Run generator
echo "📦 Generating website from: $DATA_FILE"
echo "$DATA_FILE" | ./$GEN_SCRIPT

# Check if ZIP was created
if [ ! -f "$PROJECT_ZIP" ]; then
    echo "❌ Project ZIP not found. Generation may have failed."
    exit 1
fi

# Unzip project
echo "📂 Extracting $PROJECT_ZIP..."
unzip -o "$PROJECT_ZIP" -d www_project/

# Run local server
echo "🌐 Launching local server at $BROWSER_URL"
./$WWW_SCRIPT &

# Give the server a second to start
sleep 2

# Open browser
echo "🌍 Opening browser..."
if command -v xdg-open > /dev/null; then
    xdg-open "$BROWSER_URL"
elif command -v open > /dev/null; then
    open "$BROWSER_URL"
else
    echo "ℹ️ Please open your browser and go to: $BROWSER_URL"
fi

echo "✅ FORKZJS site is now live!"
```

---

## 💾 Save & Run

1. Save this as `run_forkz_sample.sh` in your terminal.

2. Give it permissions:

```bash
chmod +x run_forkz_sample.sh
```

3. Run it:

```bash
./run_forkz_sample.sh
```

---

## 📦 After Running:

* Your generated site will be in: `forkzjs/www_project/`
* Live site served at: `http://localhost:8080`
* Browser opens automatically (Linux/macOS supported)

---




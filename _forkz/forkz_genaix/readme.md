### FORKZ GENAIX

![FORKZJS](../../assets/forksjs.jpg)
# ForkzWWW (*Forkz*)

> Developed by **#asytrick**
> E‑mail: [eusmool@gmail.com](mailto:eusmool@gmail.com)

“Do or do not. There is no try.” — Yoda

ForkzJS is a small JavaScript micro‑renderer that takes structured data (JSON, XML, CSV, RSS) and binds it into your HTML, iterating over DOM tags like `<div>` or `<ul>`, using custom attributes to drive the binding logic. You supply the template in HTML, and ForkzJS fills it with your data.

It supports class‑based customization, letting you style output as you like while the library merely handles data insertion.

**Generate dynamic HTML web pages from data files (JSON, XML, CSV, RSS) with search, media integration, and deploy-ready ZIP packages — all through terminal or PowerShell.**

---

## 📦 What is `forkz_genaix.sh`?

`forkz_genaix.sh` is a shell script tool that automates the creation of interactive, data-driven HTML web pages from local or online data sources like `.json`, `.csv`, `.xml`, and `.rss`. It also supports embedded media content from platforms like **YouTube**, **Giphy**, and **Flickr**, based on keyword prompts.

The script outputs a deployable `.zip` file ready for use with the `www_forks` HTTP web server.

---

## ✨ Features

- Generate static HTML from structured data
- Support for `JSON`, `CSV`, `XML`, and `RSS`
- Embed media from YouTube, Giphy, and Flickr by keyword search
- Multiple layout formats: `list`, `cards`, `forms`, `dashboard`
- Optional toolbar search and media library
- Export to `.zip` for quick web deployment
- Launch with `forkz_www.sh` HTTP server

---

## 🚀 Quick Start Guide

### 1️⃣ Run the Generator

Use a terminal (Linux/macOS) or PowerShell (Windows):

```bash
./forkz_genaix.sh
````

### 2️⃣ Register Project Name

> Enter a unique name for your project
> Use **lowercase letters** and **no spaces**

```
Enter your project name (e.g. myproject):
```

### 3️⃣ Choose Your Layout Format

> Select how the data will be displayed
> Options: `list`, `cards`, `forms`, `dashboard`
> Default: `list`

```
Choose layout format [list/cards/forms/dashboard]:
```

### 4️⃣ Add Search Toolbar?

```
Enable search toolbar on your page? [y/n]:
```

### 5️⃣ Add Media Library?

> Includes search prompts for **YouTube**, **Giphy**, **Flickr**

```
Add media content library to page? [y/n]:
```

### 6️⃣ Generate Deployable ZIP?

```
Generate forkz.zip for web deployment? [y/n]:
```

### 7️⃣ Check ZIP Output

After completion, ensure your `.zip` file was generated:

```
forkz_project.zip created successfully.
```

---

## 🌐 Deploy Online

Use the built-in `forkz_www.sh` server to host your project:

```bash
./forkz_www.sh
```

Then follow prompts:

* Select your server port (e.g. 8080)
* Select the `forkz_project.zip` file
* The project will auto-extract and serve in your browser

---

## 🧪 Example Usage

```bash
./forkz_genaix.sh
```

**Example input when prompted:**

```
Enter your project name: weatherdashboard
Choose layout format: dashboard
Enable search toolbar? y
Add media content library? y
Generate forkz.zip? y
```

**Example Data URIs (Comma-separated):**

```
https://example.com/data1.json;https://example.com/data2.xml
```

After the script runs, verify that `weatherdashboard.zip` is created.

Deploy:

```bash
./forkz_www.sh
```

Then choose port `9090`, and select `weatherdashboard.zip`. Open your browser:

```
http://localhost:9090
```

---

## 📁 Supported Data Formats

* `.json`
* `.csv`
* `.xml`
* `.rss`

---

## 🎥 Supported Media Platforms

* **YouTube**
* **Giphy**
* **Flickr**

Search media content by prompt keywords, and add them directly into your project gallery.

---

## 🛠 Requirements

* Unix-like shell or PowerShell
* `bash` (for Linux/macOS)
* Internet connection (for web URIs and media search)
* Permissions to execute `.sh` scripts

---

## 📃 License

MIT License © [ssmool](https://github.com/ssmool)

---

## 🤝 Contributions

Pull requests and feature ideas are welcome! Please open an issue first to discuss what you'd like to change.

---

## 🔗 Related

* `forkz_www.sh` – Local web server for ZIP project deployment
* `forkzjs` – JavaScript utilities used inside generated HTML

---


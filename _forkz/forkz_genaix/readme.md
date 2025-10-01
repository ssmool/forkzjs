![FORKZJS](../../assets/forksjs.jpg)
# ForkzGENAIX (*Forkz*)

> Developed by **#asytrick**
> E‑mail: [eusmool@gmail.com](mailto:eusmool@gmail.com)

“Do or do not. There is no try.” — Yoda

ForkzJS is a small JavaScript micro‑renderer that takes structured data (JSON, XML, CSV, RSS) and binds it into your HTML, iterating over DOM tags like `<div>` or `<ul>`, using custom attributes to drive the binding logic. You supply the template in HTML, and ForkzJS fills it with your data.

It supports class‑based customization, letting you style output as you like while the library merely handles data insertion.

# 🛣️ ROADMAP: ForkzJS Website Generator

## 🚀 GOAL

Automatically generate **HTML websites** from **structured data files** (`.json`, `.csv`, `.xml`, `.rss`) using `forkzjs`, Bootstrap, JS plugins, and CLI prompts — with built-in content scaffolding, search, media integration, and export to `.zip`.

---

## 🧱 PHASE 1: Core Foundation

### ✅ 1. Modular Architecture

* ✅ Organize core modules in `/modules/`

  * `_forkz_lib.js`
  * `_forkz_skafolding.js`
  * `_forkz_searchbar.js`
  * `_forkz_css_auto.js`
  * `_forkz_mock.js`

### ✅ 2. Data Source Support

* Support fetching and parsing:

  * `.json`
  * `.csv` → via CSV parser to JSON
  * `.xml`, `.rss` → via XML DOM parser
* Implement in `forkz_remote()` (already partially supported)

### ✅ 3. Settings File

Create `forkz.config.json`:

```json
{
  "theme": "bootstrap",
  "output": "website/",
  "dataSource": "data/sample.json",
  "layout": "list+form+search",
  "title": "My Website"
}
```

---

## 🎨 PHASE 2: Styling & Visuals

### ✅ 4. Bootstrap Integration

* Add Bootstrap 5 CDN to all generated HTML pages

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

### ✅ 5. Sample CSS Theme

* `_forkz_css_auto.js` should generate modern styles for:

  * `.card`
  * `.form-control`
  * `.btn`
  * `.container`
* Output `style.css` and include in generated HTML

### ✅ 6. JS Plugins (Optional UI Enhancements)

Integrate:

* [AOS.js](https://michalsnik.github.io/aos/) (scroll animations)
* [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/) for image galleries
* [Fancybox](https://fancyapps.com/) for videos/images
* [Chart.js](https://www.chartjs.org/) for visual data

---

## ⚙️ PHASE 3: CLI Tool

### ✅ 7. `forkz-cli.sh` or `forkz-cli.js`

CLI prompts:

```bash
$ ./forkz-cli.sh
> Select data source: [json, csv, xml, rss]
> Enter file path: ./data/mydata.csv
> Choose layout: [list, cards, forms, dashboard]
> Add search? [y/N]
> Add images/videos? [y/N]
> Generate ZIP? [y/N]
```

CLI generates:

* A complete folder: `/website_output/`
* Includes: HTML, CSS, JS, assets, data, etc.
* Optional: `website_output.zip`

### 🧠 Future: Add `node.js` version for cross-platform support.

---

## 🧩 PHASE 4: Content Management Prompt (AI-Enhanced)

### ✅ 8. Prompt Content Manager (via CLI or TUI)

#### Features:

* Add/search/edit:

  * 📝 Text (e.g., blog post, description)
  * 📁 Files (attach docs or .pdf)
  * 🎥 Videos (YouTube URLs or mp4)
  * 🖼️ Images (from folder or URL)
* Optional AI-generated placeholders:

  * `ai_generate_image("modern dashboard")`
  * `ai_write_text("intro for product catalog")`

```bash
> Add content [text/image/video/file]
> Describe your section: "Modern portfolio grid"
> AI design a layout? [Y/n]
> Add to homepage? [Y/n]
```

---

## 📦 PHASE 5: Output + Export

### ✅ 9. Generate Static Website

Output structure:

```
/website_output/
├── index.html
├── assets/
│   ├── style.css
│   ├── images/
│   └── plugins/
├── data/
│   └── sample.json
├── js/
│   └── forkz_modules.js
└── README.html
```

### ✅ 10. ZIP Export

* Auto-zip the generated site:

```bash
zip -r website_output.zip website_output/
```

---

## 📚 PHASE 6: Documentation & Templates

### ✅ 11. Templates & Themes

* Provide `templates/` folder with:

  * `minimal.html`
  * `form-builder.html`
  * `dashboard.html`
  * `card-grid.html`

### ✅ 12. GitHub Pages Deployment

* Allow `forkz-cli` to deploy directly to GitHub Pages:

```bash
$ ./forkz-cli.sh --deploy-gh
```

---

## 🧠 BONUS: Future AI Extensions

* `ai_suggest_layout(data.json)` → recommend Bootstrap layouts
* `ai_autosummarize(content.txt)` → create landing page intros
* `ai_generate_style(themeName)` → propose CSS variables

---

# ✅ Final Deliverable

### 📁 Output: `website_output.zip` includes:

* Dynamic HTML files with:
* Data visualizations
* Forms and search
* Styled content
* Bootstrap + Plugins
* Mock/fake or real content
* Media (images, videos)
* Clean, modern design
* Deploy-ready package

---

## 📌 Summary Table

| Feature                      | Tool / File            | Status      |
| ---------------------------- | ---------------------- | ----------- |
| JSON/CSV/XML parsing         | `_forkz_lib.js`        | ✅ Done      |
| HTML scaffolding (list/form) | `_forkz_skafolding.js` | ✅ Done      |
| Search bar                   | `_forkz_searchbar.js`  | ✅ Done      |
| CSS generation               | `_forkz_css_auto.js`   | ✅ Done      |
| Mock data                    | `_forkz_mock.js`       | ✅ Done      |
| Bootstrap visual             | Bootstrap 5            | ✅ Planned   |
| JS plugins (lightbox, etc)   | AOS.js, Fancybox, etc  | ⏳ Optional  |
| CLI to generate sites        | `forkz-cli.sh` / `.js` | 🛠️ In Plan |
| Prompt-based content manager | Terminal prompt + AI   | 🧠 In Plan  |
| Export to .zip               | CLI zip                | ✅ Easy      |
| GitHub Pages deployment      | `gh-pages` branch      | ✅ Easy      |

---


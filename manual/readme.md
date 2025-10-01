![FORKZJS](../assets/forksjs.jpg)
# ForkzJS (*Forkz*)

> Developed by **#asytrick**
> E‑mail: [eusmool@gmail.com](mailto:eusmool@gmail.com)

“Do or do not. There is no try.” — Yoda

ForkzJS is a small JavaScript micro‑renderer that takes structured data (JSON, XML, CSV, RSS) and binds it into your HTML, iterating over DOM tags like `<div>` or `<ul>`, using custom attributes to drive the binding logic. You supply the template in HTML, and ForkzJS fills it with your data.

It supports class‑based customization, letting you style output as you like while the library merely handles data insertion.

---

````markdown
# 🧬 forkzjs

**forkzjs** is a lightweight client-side JavaScript toolkit for parsing structured data (JSON, CSV, XML, RSS), generating HTML scaffolding (e.g., lists, forms), creating dynamic CSS, and adding search capabilities – all from declarative JavaScript.

---

## 📦 Included Modules

- `_forkz_lib.js` — Parse JSON, XML, CSV, RSS from URIs to iterable DOM-ready structures
- `_forkz_skafolding.js` — Generate HTML elements like `<ul>` and `<form>` from remote data
- `_forkz_css_auto.js` — Dynamically generate CSS styles based on data content
- `_forkz_searchbar.js` — Adds a functional search bar with filtering and results

---

## 📄 Example: Basic Data Fetch + List

**File:** `forkz_x.html`

```html
<script src="_forkz_lib.js"></script>
<script>
  const _data = forkz_remote('https://example.com/data.json', 'json');

  _data.then(data => {
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.node;
      document.body.appendChild(li);
    });
  });
</script>
````

✅ Supports remote parsing of:

* `.json`
* `.csv`
* `.xml`
* `.rss`

---

## 🔍 Example: Add Search Bar

**File:** `forkz_x.html` (extended)

```html
<script src="_forkz_searchbar.js"></script>
<script>
  _data.then(data => {
    setupSearch(data);  // Adds search input + filter + result table
  });
</script>
```

🧠 `setupSearch(data)`:

* Adds `<input type="text">` for text search
* Adds `<select>` for filtering by type (`data.nodeTYPE`)
* Renders results into a table with `innerHTML`

---

## 🎨 Example: Auto-generate CSS

**File:** `forkz_x.html` (extended)

```html
<script src="_forkz_css_auto.js"></script>
<script>
  _data.then(data => {
    generateDynamicCSS(data); // Injects a dynamic <style> tag into <head>
  });
</script>
```

🎯 Styles are generated for each data node or class:

```css
.nodeClass {
  border: 1px solid #333;
  padding: 4px;
}
```

---

## 🧱 Example: Generate <form> Scaffolding

**File:** `forkz_x.html` (extended)

```html
<script src="_forkz_skafolding.js"></script>
<script>
  _data.then(data => {
    buildForm(data); // Creates form inputs from data structure
  });
</script>
```

🧩 `buildForm(data)` generates:

```html
<form method="post" class="{{nodeClass}}">
  <input type="text" id="{{node}}" name="{{node}}" />
</form>
```

🔢 Automatically grouped by `nodeClass` and indexed by data position.

---

## 🛠️ Mock Services & File Generator

Optionally, you can generate mock data for scaffolding:

```bash
./forkz.sh
```

Features:

1. Choose output type: JSON / CSV / XML / RSS
2. Input field names (e.g. `name;email;age`)
3. Generate random sample data
4. Output file like: `output.json`

---

## 📁 Example Folder Structure

```
/forkzjs/
├── _forkz_lib.js
├── _forkz_searchbar.js
├── _forkz_css_auto.js
├── _forkz_skafolding.js
├── forkz_x.html
├── forkz.sh
└── README.md
```

---

## 💡 License

MIT — use freely, fork creatively.

---

## 🧪 Contributors & Feedback

Open issues or pull requests welcome at
👉 [https://github.com/ssmool/forkzjs](https://github.com/ssmool/forkzjs)

```

---

Great! Here's how you can set up:

---

## ✅ What You'll Get

1. **Live Demo HTML page**: `index.html` showing all ForkzJS features.
2. **GitHub Pages deployment** so the demo runs live from your repo.
3. **Auto-generated docs** from JavaScript comments in each file.

---

## 1. ✅ `index.html`: Live Demo Page

Create a simple demo HTML file in the root of your repo (`forkzjs/index.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ForkzJS Demo</title>
  <script src="_forkz_lib.js"></script>
  <script src="_forkz_searchbar.js"></script>
  <script src="_forkz_css_auto.js"></script>
  <script src="_forkz_skafolding.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    #results-container table { border-collapse: collapse; width: 100%; }
    #results-container th, #results-container td { border: 1px solid #ccc; padding: 8px; }
  </style>
</head>
<body>
  <h1>🧬 ForkzJS Demo</h1>

  <section>
    <h2>1. Fetched Data as List</h2>
    <ul id="data-list"></ul>
  </section>

  <section>
    <h2>2. Generated Form</h2>
    <div id="form-container"></div>
  </section>

  <section>
    <h2>3. Search Interface</h2>
    <div id="search-container">
      <input type="text" id="search-input" placeholder="Search…" />
      <select id="search-filter"></select>
      <button id="search-btn">Search</button>
    </div>
    <div id="results-container"></div>
  </section>

  <script>
    const url = 'https://raw.githubusercontent.com/ssmool/forkzjs/main/sample_data.json';

    forkz_remote(url, 'json').then(data => {
      // Render list
      const ul = document.getElementById('data-list');
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.node;
        ul.appendChild(li);
      });

      // Build form
      buildForm(data);

      // Search
      setupSearch(data);

      // Dynamic CSS
      generateDynamicCSS(data);
    });
  </script>
</body>
</html>
```

---

## 2. 🚀 Deploy on GitHub Pages

To make the demo live:

### Step-by-step:

1. Commit your `index.html` to the `main` or `master` branch.
2. Go to your repository on GitHub.
3. Click **Settings** > **Pages**.
4. Under **"Build and deployment"**:

   * **Source**: `Deploy from a branch`
   * **Branch**: `main` (or `master`)
   * **Folder**: `/ (root)`
5. Click **Save**.

GitHub will deploy your page at:

```
https://ssmool.github.io/forkzjs/
```

---

## 3. 🧠 Auto-generate JS Docs from Comments

Use [JSDoc](https://jsdoc.app/) to generate docs from your `.js` files:

### Step-by-step:

1. **Install JSDoc** (Node.js required):

```bash
npm install -g jsdoc
```

2. **Write comments** in your `.js` files like:

```js
/**
 * Fetches and parses data from a remote file.
 * Supports JSON, XML, CSV, and RSS.
 *
 * @param {string} url - The file URL
 * @param {string} type - One of 'json', 'csv', 'xml', 'rss'
 * @returns {Promise<Array>} Parsed data
 */
function forkz_remote(url, type) { ... }
```

3. **Run JSDoc**:

```bash
jsdoc . -r -d docs
```

This creates a `docs/` folder with full HTML API docs.

4. **Optional**: Publish to GitHub Pages by switching your Pages source to `docs/` folder.

---

## 🔄 Summary To-Do List

| Task                     | File / Command       |
| ------------------------ | -------------------- |
| ✅ Create demo HTML       | `index.html`         |
| ✅ Add live data sample   | `sample_data.json`   |
| ✅ Include all JS modules | in HTML              |
| ✅ Enable GitHub Pages    | Settings > Pages     |
| ✅ Generate documentation | `jsdoc . -r -d docs` |

---

Would you like me to create and upload all these files as a `.zip`, or do you want to build it out step-by-step yourself with guidance?



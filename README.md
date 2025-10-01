![FORKZJS](.//assets/forksjs.jpg)
# ForkzJS (*Forkz*)

> Developed by **#asytrick**
> E‑mail: [eusmool@gmail.com](mailto:eusmool@gmail.com)

“Do or do not. There is no try.” — Yoda

ForkzJS is a small JavaScript micro‑renderer that takes structured data (JSON, XML, CSV, RSS) and binds it into your HTML, iterating over DOM tags like `<div>` or `<ul>`, using custom attributes to drive the binding logic. You supply the template in HTML, and ForkzJS fills it with your data.

It supports class‑based customization, letting you style output as you like while the library merely handles data insertion.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage & Binding](#usage--binding)
4. [Examples](#examples)
5. [Manual / User Guide](#manual--user-guide)
6. [Developer Philosophy & Versioning](#developer-philosophy--versioning)
7. [Quotes & Inspiration](#quotes--inspiration)
8. [Happy New Year 2026 & Acknowledgments](#happy-new-year-2026--acknowledgments)
9. ![FORKZ WWW SERVER - EXECUTE YOUR FORKZ_GENAIX WEBSITE LOCAL](./_forkz/www_forkz/)
10. ![FORKZGENAI - ROADMAP - Generate Automatic Websites with FORKZ and FORKZGENAI by CLI](./_forkz/forkz_genaix/)

---

## Features

* Fetch remote data (JSON, XML, CSV, RSS) via a simple JS call
* Bind data into HTML templates via attributes `_forkz_lib` and `_forkx` / `_fork`
* Works with either `<div>`‑based layouts or `<ul> / <li>` lists
* You control the HTML structure and CSS; ForkzJS only inserts data
* Lightweight, minimal dependencies

---

## Installation

Include the script in your HTML:

```html
<script src="forkzjs.js"></script>
```

Or clone the repository and include it in your project:

```bash
#!/usr/bin/env bash
git clone https://github.com/ssmool/forkz.git
cd forkz
echo "ForkzJS cloned. Include forkzjs.js in your HTML pages."  
```

You can call that script `install_forkz.sh` and run:

```bash
chmod +x install_forkz.sh  
./install_forkz.sh  
```

---

## Usage & Binding

### Fetching remote data

Invoke the fetch call in a `<script>` block:

```html
<script>
  forkz_remote(_uri, _type = 'json')
</script>
```

* `_uri` : URL of the remote resource (JSON, XML, CSV, RSS)
* `_type` : optional (defaults to `'json'`), other valid types: `'xml'`, `'csv'`, `'rss'`

This triggers ForkzJS to fetch and parse the remote content.

### Binding with HTML attributes

You instruct ForkzJS how to map your data into HTML via attributes:

* On a container element (`<div>` or `<ul>`), set

  ```html
  _forkz_lib = 'json_node'
  ```

  This tells ForkzJS: “Iterate over this data node.”

* On an inner element (`<div>` inside, or `<li>` in a list), use:

  ```html
  _forkx = '_book'  (or your alias)  
  _fork = '__data'  (or your alias)  
  ```

  This tells ForkzJS: “Use this alias for each item, and bind this field.”

* Use Mustache‑style placeholders `{{alias.field}}` within your inner tags to render the data values

Example from your snippet:

```html
<div _forkz_lib="catalag_books">        
  <div _forkx="_book" class="book-item">
    [CAPTION]: <h3>{{_book.title}}</h3>
  </div>
</div>

<ul _forkz_lib="catalag_movies" class="movie-list">
  <li _forkx="_data">
    [CAPTION]: <strong>{{_data.title}}</strong> ({{_data.year}})
  </li>
</ul>

<script src="forkzjs.js"></script>
<script>
  forkz_remote(_uri, 'json')
</script>
```

* The first container iterates `catalag_books`, populating each `.book-item` with `{{_book.title}}`.
* The second container iterates `catalag_movies`, creating `<li>` entries, rendering `{{_data.title}}` and `{{_data.year}}`.

You can also use `{{__data.childNodes}}` or deeper nested properties depending on your JSON structure.

### Notes & tips

* Mix static HTML (labels, separators) with dynamic placeholders freely
* Use CSS classes (on container, items, inner tags) to style the output
* The library should only replace or insert text content into placeholders
* Nested / hierarchical data can be handled by nesting containers with their own `_forkz_lib` inside iterated items

---

## Examples

Below is a minimal full HTML example combining JSON and list layout:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ForkzJS Example</title>
  <script src="forkzjs.js"></script>
  <style>
    .movie-list { list-style: none; padding: 0; }
    .movie-list li { margin-bottom: 8px; }
    .book-item { border: 1px solid #ccc; padding: 8px; margin: 4px; }
  </style>
</head>
<body>

  <h1>Books</h1>
  <div _forkz_lib="catalog_books">
    <div _forkx="_book" class="book-item">
      <h3>{{_book.title}}</h3>
      <p>Author: {{_book.author}}</p>
    </div>
  </div>

  <h1>Movies</h1>
  <ul _forkz_lib="catalog_movies" class="movie-list">
    <li _forkx="_data">
      <strong>{{_data.title}}</strong> — {{_data.year}}
    </li>
  </ul>

  <script>
    forkz_remote('https://example.com/data.json', 'json');
  </script>
</body>
</html>
```

You can similarly build pages for CSV, XML or RSS by adjusting `_type` to `'csv'` / `'xml'` / `'rss'` and setting appropriate `_forkz_lib` paths.

---

## Manual / User Guide

1. **Design your HTML template**

   * Decide whether to use a list (`<ul>`/`<li>`) or block containers (`<div>`).
   * On the parent container, assign `_forkz_lib="node_path"` to specify the data node to iterate.
   * On children, assign `_forkx="alias"` (the alias used in placeholders) and use `{{alias.field}}` in their inner markup.

2. **Include ForkzJS & trigger fetch**

   * Load `forkzjs.js` with `<script src="forkzjs.js"></script>`
   * After that, call `forkz_remote(_uri, _type)` to fetch and parse data.

3. **Map your JSON/XML/CSV structure**

   * For JSON: simple object / array paths
   * For XML / RSS: use slash paths (e.g. `channel/item`)
   * For CSV: first line as header names, subsequent lines as records

4. **Style via CSS**

   * Use standard class selectors or IDs on your containers or item tags
   * ForkzJS doesn’t affect styling — it only injects data into your placeholders.

5. **Error & fallback handling**

   * In your version of ForkzJS, you may wrap fetch in `try/catch`
   * Provide a fallback message or empty state in your HTML template (e.g. a `<div class="no-data">No items available</div>` that you hide/show as appropriate)

6. **Advanced use**

   * Nested arrays: within an iterated item, include another `_forkz_lib` block
   * Multiple data sources: call `forkz_remote` more than once on separate containers
   * Pre/post processing: for custom logic, you can override or hook into ForkzJS internals

---

## Developer Philosophy & Versioning

ForkzJS embodies a **Sub Microsystem** mindset: a focused, small engine embedded in your pages that bridges structured data and HTML without heavy dependencies or frameworks.

Much like **Java’s ecosystem** (J2SE, J2ME, J2SP, JavaFX) each serving different contexts, ForkzJS is your minimal front-end engine tailored to the web.

In the browser universe, **JavaScript** is the W3C‑spec player, the paradigm that allows you to embed your algorithms across the web. ForkzJS helps you embed data-driven logic cleanly within your HTML pages.

Adopt semantic versioning (e.g. `v0.1.0`, `v1.0.0`) and include a `LICENSE` file (MIT, Apache, etc.) to clarify reuse.

---

# 🛣️ ForkzJS Project Roadmap

**Repository:** [github.com/ssmool/forkzjs](https://github.com/ssmool/forkzjs)
**Lead Developer:** #asytrick
**Contact:** [eusmool@gmail.com](mailto:eusmool@gmail.com)

## 🧩 Vision

> **ForkzJS** evolves into a **Sub Microsystem** frontend generator:
> Minimal HTML + JSON/CSV + scripts → Full responsive, data-driven web pages with zero framework overhead.

---

## 📅 Roadmap Overview

| Milestone | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `v0.2.0`  | Basic scaffolding: init project, create folder structure, include templates |
| `v0.3.0`  | Form generator from JSON schema                                             |
| `v0.4.0`  | CSV + JSON merger: bind prompts with values                                 |
| `v0.5.0`  | Auto CSS file generator & class binding                                     |
| `v0.6.0`  | Complete page generator from JSON + CSS + CSV                               |
| `v1.0.0`  | CLI interactive mode + plugin-ready system                                  |

---

## Quotes & Inspiration

> “Wars not make one great.” — Yoda
> “Do. Or do not. There is no try.” — Yoda
> “Luminous beings are we, not this crude matter.” — Yoda

> “JavaScript is the Force that binds data and HTML across the galaxy of browsers.”
> “In the micro realm, the Sub Microsystem is strong; simplicity is its power.”

---

## Happy New Year 2026 & Acknowledgments

Happy New Year **2026** coming soon! May your code be robust, your designs elegant, and your community ever growing. Strong together — *kawabanaga*.

This project is developed by **#asytrick**
Contact: [eusmool@gmail.com](mailto:eusmool@gmail.com)

![YODA-JEDI](.//assets/yoda.jpg)

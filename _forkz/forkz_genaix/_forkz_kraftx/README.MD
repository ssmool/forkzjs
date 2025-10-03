### FORKZ GENAIX

![FORKZJS](../../assets/forksjs.jpg)
### ForkzJS → forkz_genaix / kraftx Manual

This manual describes how to integrate and use the the **forkz_genaix / kraftx** extensions in your ForkzJS‑based project. It covers how to include the scripts, the custom tags, configuration attributes, and related modules (feeds, forms, media, upload).


> Developed by **#asytrick**
> E‑mail: [eusmool@gmail.com](mailto:eusmool@gmail.com)

“Do or do not. There is no try.” — Yoda

ForkzJS is a small JavaScript micro‑renderer that takes structured data (JSON, XML, CSV, RSS) and binds it into your HTML, iterating over DOM tags like `<div>` or `<ul>`, using custom attributes to drive the binding logic. You supply the template in HTML, and ForkzJS fills it with your data.

It supports class‑based customization, letting you style output as you like while the library merely handles data insertion.
---

## 1. Setup and Imports

To use forkzgenaix and kraftx in your site, you need to import two (or more) JavaScript files in your HTML, in the correct order:

```html
<script src="forkzjs.js"></script>
<script src="_forkz_kraftx.js"></script>
```

* `forkzjs.js` is the core Forkz library (data binding, remote loading, etc.).
* `_forkz_kraftx.js` is the kraftx extension that defines custom elements like `<forks-krafter>` and handles menu / layout binding.

Make sure `forkzjs.js` is loaded **before** `_forkz_kraftx.js`.

---

## 2. `<forks-krafter>` — Menu / Layout Tag

The main custom tag provided by kraftx is `<forks-krafter>`. It acts as a container / binder for menu items, navigation, and layout fragments.

### 2.1 Basic Usage (HTML)

You place `<forks-krafter>` somewhere in your HTML where you want the menu or UI to appear:

```html
<forks-krafter
  position="top-right"
  type="rounded"
  orientation="vertical"
  background="#f0f9ff">
</forks-krafter>
```

Or for other styles:

* Floating / vertical / rounded:

  ```html
  <forks-krafter position="top-right"
                  type="rounded"
                  orientation="vertical"
                  background="#f0f9ff">
  </forks-krafter>
  ```

* Embedded / horizontal / Android (Material) style:

  ```html
  <forks-krafter type="android"
                 orientation="horizontal"
                 background="white">
  </forks-krafter>
  ```

* Embedded / vertical / “cards” style:

  ```html
  <forks-krafter type="cards"
                 orientation="vertical">
  </forks-krafter>
  ```

* Embedded / circles / icon style:

  ```html
  <forks-krafter type="circles"
                 orientation="horizontal"
                 background="transparent">
  </forks-krafter>
  ```

### 2.2 Attributes / Configuration

Here are the attributes that `<forks-krafter>` recognizes / uses:

| Attribute     | Purpose / Description                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `position`    | For float menus: e.g. `"top-right"`, `"top-left"`, `"bottom-right"`, etc.                                          |
| `type`        | Style theme for the menu / layout. Options include `rounded`, `android`, `cards`, `circles`                        |
| `orientation` | Layout direction: `"horizontal"` or `"vertical"`                                                                   |
| `background`  | CSS color for background (e.g. `"#f0f9ff"`, `"white"`, `"transparent"` )                                           |
| `class`       | CSS classes can be passed, e.g. `"forks_krafter krafter-rounded krafter-vertical krafter-float krafter-top_right"` |

Internally, kraftx may apply class names based on these attributes (e.g. `krafter-rounded`, `krafter-vertical`, `krafter-float`, `krafter-top_right`).

### 2.3 Data Binding & Template (Hypothetical)

Inside `<forks-krafter>` you usually include a child container (e.g. `<ul>`) annotated with a data-binding attribute. For example:

```html
<forks-krafter type="android" orientation="horizontal" background="white">
  <ul _forkz_lib="site">
    <li forkx="__data">{{name}}</li>
  </ul>
</forks-krafter>
```

* `_forkz_lib="site"` points to the data array (e.g. `window.site` or `window.__data`).
* `<li forkx="__data">…</li>` acts as the *template* for each item in the array.
* Within the template, you may use placeholder syntax (e.g. `{{name}}`) so that each cloned item substitutes property `name` from each data object.

When the data loads (via `forkz_remote` or other), kraftx should automatically clone the template for each data element and inject the substituted HTML.

---

## 3. Additional Modules / Features

In addition to the main menu / layout functionality, there are auxiliary modules you can include for more UI elements. Below is a summary based on your instructions.

### 3.1 `_forkz_kraftx_feed.js`

This module supports displaying a list of string / updates or feed items.

**HTML usage:**

```html
<forkz-str-arr fillz="{{_data.updates}}">
  <forkz-str _forkx="{{item}}"
            content="{{item_str}}"
            _forkz_assets="assets">
  </forkz-str>
</forkz-str-arr>
```

* `fillz="{{_data.updates}}"`: binds an array of updates to the container.
* Inside, each `<forkz-str>` is a template, with placeholders like `{{item_str}}`.
* `_forkz_assets="assets"` might link to additional resources or icons.

### 3.2 `_forkz_kraftx_formz.js`

This module automates form generation:

* Use a function `loadFormData(_data)` to generate a form from JSON schema or data definitions.
* Example: after the JSON loads, call `loadFormData(_data)` to render a form dynamically on the page.

### 3.3 `_forkz_kraftx_media.js`

To embed audio / video players:

```html
<forkz-audio player="float"
             shape="round"
             playlist="display">
</forkz-audio>

<forkz-video shape="square"
             playlist="none">
</forkz-video>
```

* `player="float"` or `player="round"` controls how the audio UI floats or is styled.
* `shape="round"` or `shape="square"` defines UI appearance.
* `playlist` attribute may point to `"display"`, `"none"`, or some list.

### 3.4 `_forkz_kratx_media_carrousel`

For carousels, e.g. news carousel:

* Provide a JSON feed to `loadNewsData(_data)` which will build a carousel layout of media or news items.

### 3.5 `_forkz_ftpzupx.js` (File Upload / Uploader)

This module supports file upload / picker components.

**Initialization & usage:**

```js
initializeForkzUp();  // call this to set up upload features
```

**HTML:**

```html
<div id="forkzup-component"
     data-server="http://www.domain.com/upserver:8080"
     data-pipio="file1.pdf,file2.mp3,file.txt"
     class="mb-8">
</div>

<forkza href="filepicker" type="_uri"></forkza>
```

* The `data-server` attribute points to the upload server endpoint.
* `data-pipio` lists allowed file types (extensions).
* You can use a `forkza` tag as a button or link to open a file picker:

  ```html
  <a id="forkza-filepicker" href="javascript:void(0)"
     class="forkza-button"
     data-allow=".csv,.mp4,.ogg,.txt"
     onclick="
       document.getElementById('file-input').accept = this.dataset.allow;
       document.getElementById('file-input').click();
     ">+</a>
  ```
* To start uploading:

  ```js
  startUploadQueue();
  ```

---

## 4. Example: Complete Integration

Here is a minimal example putting things together.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Forkz GenAix Demo</title>
  <script src="forkzjs.js"></script>
  <script src="_forkz_kraftx.js"></script>
  <script src="_forkz_kraftx_feed.js"></script>
  <script src="_forkz_kraftx_formz.js"></script>
  <script src("_forkz_kraftx_media.js")></script>
  <script src("_forkz_ftpzupx.js"></script>
</head>
<body>
  <!-- Menu -->
  <forks-krafter type="android"
                 orientation="horizontal"
                 background="white">
    <ul _forkz_lib="menuItems">
      <li forkx="menuItems">
        {{label}}
      </li>
    </ul>
  </forks-krafter>

  <!-- Feed / updates panel -->
  <forkz-str-arr fillz="{{updateData.updates}}">
    <forkz-str _forkx="{{item}}"
              content="{{item_str}}"
              _forkz_assets="assets">
    </forkz-str>
  </forkz-str-arr>

  <!-- Media example -->
  <forkz-audio player="float"
               shape="round"
               playlist="display">
  </forkz-audio>

  <!-- Upload component -->
  <div id="forkzup-component"
       data-server="https://yourserver.com/upload"
       data-pipio=".jpg,.png,.pdf"
       class="mb-8">
  </div>
  <forkza href="filepicker" type="_uri"></forkza>

  <script>
    // Load menus and data
    menuItems = forkz_remote('https://yourserver.com/data/menu.json', _type='json');
    updateData = forkz_remote('https://yourserver.com/data/updates.json', _type='json');

    // Maybe load a form
    loadFormData(someSchemaData);

    // Initialize uploader
    initializeForkzUp();

    // After DOM ready or data arrival, you may need to re-render or call internal mounts
  </script>
</body>
</html>
```

---

## 5. Tips & Considerations for Developers

* Ensure data fetch URLs are *raw JSON* (e.g. via raw.githubusercontent.com) so that the browser can retrieve them.
* If `forkz_remote` is asynchronous (returns a Promise), ensure that rendering happens *after* data is available. You may need to listen for `.then(...)` or trigger re-render manually.
* When templating, avoid using dangerously arbitrary `innerHTML` injection if possible; better to walk text nodes / attribute nodes and bind individually.
* Support updates / reactivity: if the bound data changes after initial render, the library should update the UI accordingly (diff, patch, re-render).
* Provide CSS styles for the various `type`, `orientation`, `position` options — e.g. `.krafter-rounded`, `.krafter-float`, `.krafter-top_right`, etc.
* For upload features, handle server-side endpoints securely (validate file types, limits, CORS, etc.).
* Validate media features (audio / video) across browsers; provide fallback when unsupported.

---

If you like, I can convert this manual into a `README.md` suitable for your GitHub repo, or even generate skeleton code files for all the modules (`_forkz_kraftx.js`, `_forkz_kraftx_feed.js`, etc.) based on your spec. Would you prefer me to do that now?


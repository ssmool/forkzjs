function generateDynamicCSS(data) {
  let css = '';

  data.forEach(item => {
    // For each node, create a class like `.node-{node}`
    const cls = '.' + (item.nodeClass || item.node);
    css += `${cls} { border: 1px solid #333; padding: 4px; margin: 4px; }\n`;
    css += `${cls} input { background-color: #f9f9f9; }\n`;
  });
  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

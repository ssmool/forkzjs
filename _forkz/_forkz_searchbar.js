function buildFilterOptions(data) {
  const sel = document.getElementById('search-filter');
  // assume each item has a `nodeTYPE` property
  const types = new Set(data.map(i => i.nodeTYPE));
  types.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    sel.appendChild(opt);
  });
}

function setupSearch(data) {
  const btn = document.getElementById('search-btn');
  const input = document.getElementById('search-input');
  const sel = document.getElementById('search-filter');
  const resultsDiv = document.getElementById('results-container');

  btn.addEventListener('click', () => {
    const query = input.value.toLowerCase();
    const filterType = sel.value;

    // filter data
    let filtered = data.filter(item => {
      const matchesQ = !query || (item.node && item.node.toLowerCase().includes(query));
      const matchesType = !filterType || item.nodeTYPE === filterType;
      return matchesQ && matchesType;
    });

    // generate HTML table
    let html = '<table><thead><tr>';
    // headers from keys of first item
    if (filtered.length > 0) {
      Object.keys(filtered[0]).forEach(k => {
        html += `<th>${k}</th>`;
      });
      html += '</tr></thead><tbody>';
      filtered.forEach(item => {
        html += '<tr>';
        Object.keys(item).forEach(k => {
          html += `<td>${item[k]}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
    } else {
      html = '<p>No results</p>';
    }

    resultsDiv.innerHTML = html;
  });
}

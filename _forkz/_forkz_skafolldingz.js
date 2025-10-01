function renderList(_data) {
  const ul = document.getElementById('data-list');
  ul.innerHTML = '';
  _data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.node;  // or whatever property you want
    ul.appendChild(li);
  });
}

async function init(_data) {
  try {
    renderList(_data);
    buildForm(_data);
    buildFilterOptions(_data);
    setupSearch(_data);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);

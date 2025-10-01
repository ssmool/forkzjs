function buildForm(data) {
  const container = document.getElementById('form-container');
  container.innerHTML = '';  
  data.forEach(item => {
    // For each “node” in data, make a form
    const form = document.createElement('form');
    form.method = 'post';
    form.action = '#';
    form.className = item.nodeClass || '';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = item.node;
    input.name = item.node;
    input.placeholder = item.node;

    form.appendChild(input);
    container.appendChild(form);
  });
}

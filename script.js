let assets = [];

fetch('./data/assets.json')
  .then(res => res.json())
  .then(data => {
    assets = data;
    populateFilters();
    renderAssets(assets);
  })
  .catch(err => console.error('Asset yüklenemedi', err));

function populateFilters() {
  const categorySet = new Set();
  const levelSet = new Set();
  assets.forEach(a => {
    categorySet.add(a.category);
    levelSet.add(a.level);
  });

  const categoryFilter = document.getElementById('categoryFilter');
  categorySet.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    categoryFilter.appendChild(opt);
  });

  const levelFilter = document.getElementById('levelFilter');
  levelSet.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l; opt.textContent = l;
    levelFilter.appendChild(opt);
  });
}

function renderAssets(list) {
  const container = document.getElementById('assets');
  container.innerHTML = '';
  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h2>${item.title}</h2>
      <p class="desc">${item.description}</p>
      <p class="meta"><strong>Kategori:</strong> ${item.category} | <strong>Seviye:</strong> ${item.level}</p>
      <a class="btn" href="./pages/asset.html?id=${item.id}">Detay ve indir</a>
    `;
    container.appendChild(div);
  });
}

document.getElementById('searchInput').addEventListener('input', filterAssets);
document.getElementById('categoryFilter').addEventListener('change', filterAssets);
document.getElementById('levelFilter').addEventListener('change', filterAssets);

function filterAssets() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const level = document.getElementById('levelFilter').value;

  const filtered = assets.filter(a => 
    a.title.toLowerCase().includes(search) &&
    (category === '' || a.category === category) &&
    (level === '' || a.level === level)
  );

  renderAssets(filtered);
}

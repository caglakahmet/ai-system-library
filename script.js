fetch('./data/assets.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('assets');

    data.forEach(item => {
      const div = document.createElement('div');

      div.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <a href="./pages/asset.html?id=${item.id}">Detay</a>
      `;

      container.appendChild(div);
    });
  });
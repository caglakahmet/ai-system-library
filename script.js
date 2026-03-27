/* ─── AI SYSTEM LIBRARY — script.js ──────────────────────── */

let assets = [];
let filtered = [];

/* ─── DATA ────────────────────────────────────────────────── */
async function loadAssets() {
  try {
    const res = await fetch('data/assets.json');
    if (!res.ok) throw new Error('Failed to load assets.json');
    assets = await res.json();
    filtered = [...assets];
    updateStats();
    render();
  } catch (err) {
    console.error(err);
    document.getElementById('grid').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠</div>
        <h3>Failed to load assets</h3>
        <p>Check that data/assets.json is accessible.</p>
      </div>`;
  }
}

/* ─── STATS ───────────────────────────────────────────────── */
function updateStats() {
  const agents = assets.filter(a => a.category === 'agent').length;
  const skills = assets.filter(a => a.category === 'skill').length;
  const total  = assets.reduce((sum, a) => sum + (a.downloads || 0), 0);
  document.getElementById('stat-total').textContent  = assets.length;
  document.getElementById('stat-agents').textContent = agents;
  document.getElementById('stat-skills').textContent = skills;
  document.getElementById('stat-downloads').textContent = total >= 1000
    ? (total / 1000).toFixed(1) + 'k' : total;
}

/* ─── FILTER & SEARCH ─────────────────────────────────────── */
function applyFilters() {
  const query    = document.getElementById('search').value.trim().toLowerCase();
  const category = document.getElementById('filter-category').value;
  const level    = document.getElementById('filter-level').value;
  const sort     = document.getElementById('filter-sort').value;

  filtered = assets.filter(asset => {
    const matchCat   = !category || asset.category === category;
    const matchLevel = !level    || asset.level === level;
    const searchText = [
      asset.title, asset.description, asset.category,
      ...(asset.tags || [])
    ].join(' ').toLowerCase();
    const matchQuery = !query || searchText.includes(query);
    return matchCat && matchLevel && matchQuery;
  });

  if (sort === 'downloads') {
    filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sort === 'newest') {
    filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  } else if (sort === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  const count = document.getElementById('results-count');
  count.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
  render();
}

/* ─── RENDER GRID ─────────────────────────────────────────── */
function render() {
  const grid = document.getElementById('grid');

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">◎</div>
        <h3>No assets found</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((asset, i) => `
    <article
      class="card"
      onclick="openDetail('${asset.id}')"
      role="button"
      tabindex="0"
      aria-label="${asset.title}"
      style="animation-delay: ${Math.min(i * 0.04, 0.4)}s"
      onkeydown="if(event.key==='Enter')openDetail('${asset.id}')"
    >
      <div class="card-header">
        <div class="card-badges">
          <span class="badge badge-category ${asset.category}">${asset.category}</span>
          <span class="badge badge-level ${asset.level}">${asset.level}</span>
        </div>
        <span class="card-downloads" title="Downloads">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          ${formatNumber(asset.downloads)}
        </span>
      </div>

      <h2 class="card-title">${escHtml(asset.title)}</h2>
      <p class="card-desc">${escHtml(asset.description)}</p>

      <div class="card-tags">
        ${(asset.tags || []).slice(0, 4).map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}
      </div>

      <div class="card-footer">
        <span class="card-version">v${escHtml(asset.version)}</span>
        <span class="card-action">
          View details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </div>
    </article>
  `).join('');
}

/* ─── DETAIL VIEW ─────────────────────────────────────────── */
function openDetail(id) {
  const asset = assets.find(a => a.id === id);
  if (!asset) return;

  history.pushState({ id }, '', `?asset=${id}`);
  showDetail(asset);
}

function showDetail(asset) {
  document.getElementById('catalog-view').style.display = 'none';
  const detail = document.getElementById('detail-view');
  detail.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  detail.innerHTML = `
    <div class="hero" style="padding-top: 48px;">
      <button class="back-btn" onclick="closeDetail()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to catalog
      </button>

      <div class="detail-layout">
        <div class="detail-main">
          <div class="detail-eyebrow">
            <span class="badge badge-category ${asset.category}">${asset.category}</span>
            <span class="badge badge-level ${asset.level}">${asset.level}</span>
          </div>

          <h1 class="detail-title">${escHtml(asset.title)}</h1>
          <p class="detail-desc">${escHtml(asset.description)}</p>

          <div class="detail-long-desc">
            ${escHtml(asset.longDescription || asset.description)}
          </div>

          <div class="detail-tags">
            ${(asset.tags || []).map(t => `<span class="detail-tag">${escHtml(t)}</span>`).join('')}
          </div>

          <div class="files-section">
            <h3>Included Files</h3>
            <ul class="file-list">
              ${(asset.files || []).map(f => `<li class="file-item">${escHtml(f)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-card">
            <h3>Asset Details</h3>
            <div class="sidebar-stat">
              <span class="sidebar-stat-label">Version</span>
              <span class="sidebar-stat-value">v${escHtml(asset.version)}</span>
            </div>
            <div class="sidebar-stat">
              <span class="sidebar-stat-label">Updated</span>
              <span class="sidebar-stat-value">${formatDate(asset.updated)}</span>
            </div>
            <div class="sidebar-stat">
              <span class="sidebar-stat-label">Author</span>
              <span class="sidebar-stat-value">${escHtml(asset.author)}</span>
            </div>
            <div class="sidebar-stat">
              <span class="sidebar-stat-label">Downloads</span>
              <span class="sidebar-stat-value">${formatNumber(asset.downloads)}</span>
            </div>
            <div class="sidebar-stat">
              <span class="sidebar-stat-label">Files</span>
              <span class="sidebar-stat-value">${(asset.files || []).length}</span>
            </div>

            <a href="${asset.downloadUrl || '#'}" class="btn-download">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Package
            </a>
            <a href="${asset.docsUrl || '#'}" class="btn-docs">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              View Docs
            </a>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function closeDetail() {
  history.pushState({}, '', window.location.pathname);
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('catalog-view').style.display = 'block';
}

/* ─── URL ROUTING ─────────────────────────────────────────── */
function handleRoute() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('asset');
  if (id && assets.length > 0) {
    const asset = assets.find(a => a.id === id);
    if (asset) { showDetail(asset); return; }
  }
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('catalog-view').style.display = 'block';
}

window.addEventListener('popstate', handleRoute);

/* ─── HELPERS ─────────────────────────────────────────────── */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function formatNumber(n) {
  if (!n) return '0';
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}
function formatDate(str) {
  if (!str) return '—';
  try {
    return new Date(str).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  } catch { return str; }
}

/* ─── DEBOUNCE ────────────────────────────────────────────── */
function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadAssets();
  handleRoute();

  document.getElementById('search').addEventListener('input', debounce(applyFilters, 200));
  document.getElementById('filter-category').addEventListener('change', applyFilters);
  document.getElementById('filter-level').addEventListener('change', applyFilters);
  document.getElementById('filter-sort').addEventListener('change', applyFilters);
});

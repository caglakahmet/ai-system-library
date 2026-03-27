/* ─── AI SYSTEM LIBRARY — script.js ──────────────────────── */

let assets = [];
let filtered = [];
let activeCategory = '';
let activeLevel    = '';
let activeSort     = 'downloads';

/* ─── DATA ────────────────────────────────────────────────── */
async function loadAssets() {
  try {
    const res = await fetch('data/assets.json');
    if (!res.ok) throw new Error('Failed to load assets.json');
    assets = await res.json();
    filtered = [...assets];
    updateStats();
    applyFilters();
  } catch (err) {
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
  const total  = assets.reduce((s, a) => s + (a.downloads || 0), 0);
  document.getElementById('stat-total').textContent    = assets.length;
  document.getElementById('stat-agents').textContent   = agents;
  document.getElementById('stat-skills').textContent   = skills;
  document.getElementById('stat-downloads').textContent = total >= 1000
    ? (total / 1000).toFixed(1) + 'k' : total;
}

/* ─── FILTER ──────────────────────────────────────────────── */
function applyFilters() {
  const query = document.getElementById('search').value.trim().toLowerCase();

  filtered = assets.filter(a => {
    if (activeCategory && a.category !== activeCategory) return false;
    if (activeLevel    && a.level    !== activeLevel)    return false;
    if (query) {
      const hay = [a.title, a.description, a.category, ...(a.tags||[])].join(' ').toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  if (activeSort === 'downloads') filtered.sort((a,b) => (b.downloads||0) - (a.downloads||0));
  else if (activeSort === 'newest') filtered.sort((a,b) => new Date(b.updated) - new Date(a.updated));
  else if (activeSort === 'title') filtered.sort((a,b) => a.title.localeCompare(b.title));

  const el = document.getElementById('results-count');
  if (el) el.textContent = filtered.length + ' result' + (filtered.length !== 1 ? 's' : '');
  render();
}

/* ─── PILLS ───────────────────────────────────────────────── */
function initPills(groupId, onChange) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onChange(btn.dataset.value);
    });
  });
}

/* ─── RENDER ──────────────────────────────────────────────── */
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
  grid.innerHTML = filtered.map((a, i) => `
    <article class="card"
      onclick="openDetail('${a.id}')"
      role="button" tabindex="0"
      onkeydown="if(event.key==='Enter')openDetail('${a.id}')"
      style="animation-delay:${Math.min(i*0.04,0.4)}s"
    >
      <div class="card-header">
        <div class="card-badges">
          <span class="badge badge-category ${a.category}">${a.category}</span>
          <span class="badge badge-level ${a.level}">${a.level}</span>
        </div>
        <span class="card-downloads">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          ${fmt(a.downloads)}
        </span>
      </div>
      <h2 class="card-title">${esc(a.title)}</h2>
      <p class="card-desc">${esc(a.description)}</p>
      <div class="card-tags">
        ${(a.tags||[]).slice(0,4).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="card-version">v${esc(a.version)}</span>
        <span class="card-action">
          View details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </div>
    </article>
  `).join('');
}

/* ─── DETAIL ──────────────────────────────────────────────── */
function openDetail(id) {
  const asset = assets.find(a => a.id === id);
  if (!asset) return;
  history.pushState({ id }, '', `?asset=${id}`);
  showDetail(asset);
}

function showDetail(asset) {
  document.getElementById('catalog-view').style.display = 'none';
  const dv = document.getElementById('detail-view');
  dv.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  dv.innerHTML = `
    <div class="detail-wrap">
      <button class="back-btn" onclick="closeDetail()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to catalog
      </button>
      <div class="detail-layout">
        <div class="detail-main">
          <div class="detail-eyebrow">
            <span class="badge badge-category ${asset.category}">${asset.category}</span>
            <span class="badge badge-level ${asset.level}">${asset.level}</span>
          </div>
          <h1 class="detail-title">${esc(asset.title)}</h1>
          <p class="detail-desc">${esc(asset.description)}</p>
          <div class="detail-long-desc">${esc(asset.longDescription||asset.description)}</div>
          <div class="detail-tags">${(asset.tags||[]).map(t=>`<span class="detail-tag">${esc(t)}</span>`).join('')}</div>
          <div class="files-section">
            <h3>Included Files</h3>
            <ul class="file-list">
              ${(asset.files||[]).map(f=>`<li class="file-item">${esc(f)}</li>`).join('')}
            </ul>
          </div>
        </div>
        <aside class="detail-sidebar">
          <div class="sidebar-card">
            <h3>Asset Details</h3>
            <div class="sidebar-stat"><span class="sidebar-stat-label">Version</span><span class="sidebar-stat-value">v${esc(asset.version)}</span></div>
            <div class="sidebar-stat"><span class="sidebar-stat-label">Updated</span><span class="sidebar-stat-value">${fmtDate(asset.updated)}</span></div>
            <div class="sidebar-stat"><span class="sidebar-stat-label">Author</span><span class="sidebar-stat-value">${esc(asset.author)}</span></div>
            <div class="sidebar-stat"><span class="sidebar-stat-label">Downloads</span><span class="sidebar-stat-value">${fmt(asset.downloads)}</span></div>
            <div class="sidebar-stat"><span class="sidebar-stat-label">Files</span><span class="sidebar-stat-value">${(asset.files||[]).length}</span></div>
            <a href="${esc(asset.downloadUrl||'#')}" class="btn-download">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Package
            </a>
            <a href="${esc(asset.docsUrl||'#')}" class="btn-docs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              View Docs
            </a>
          </div>
        </aside>
      </div>
    </div>`;
}

function closeDetail() {
  history.pushState({}, '', window.location.pathname);
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('catalog-view').style.display = 'block';
}

window.addEventListener('popstate', () => {
  const id = new URLSearchParams(window.location.search).get('asset');
  if (id && assets.length) {
    const a = assets.find(x => x.id === id);
    if (a) { showDetail(a); return; }
  }
  closeDetail();
});

/* ─── HELPERS ─────────────────────────────────────────────── */
function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmt(n) { return n>=1000 ? (n/1000).toFixed(1)+'k' : String(n||0); }
function fmtDate(s) {
  try { return new Date(s).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); }
  catch { return s; }
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(()=>fn(...a), ms); }; }

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadAssets();

  const id = new URLSearchParams(window.location.search).get('asset');
  if (id) { const a = assets.find(x => x.id === id); if (a) { showDetail(a); return; } }

  document.getElementById('search').addEventListener('input', debounce(applyFilters, 180));

  initPills('pill-category', val => { activeCategory = val; applyFilters(); });
  initPills('pill-level',    val => { activeLevel    = val; applyFilters(); });
  initPills('pill-sort',     val => { activeSort     = val; applyFilters(); });
});

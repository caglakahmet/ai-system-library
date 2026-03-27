/* ─── AI SYSTEM LIBRARY — script.js ──────────────────────── */

/* Inline data — works both via file:// and http:// */
const INLINE_ASSETS = [{"id": "web-research-agent", "title": "Web Research Agent", "category": "agent", "level": "intermediate", "description": "Autonomous agent that searches the web, synthesizes multi-source content, and delivers structured research reports. Supports follow-up queries and source citation.", "longDescription": "A full-stack research agent built on tool-use architecture. Accepts a research query, runs parallel web searches, filters low-quality sources, and synthesizes a structured Markdown report with citations. Designed for integration into Claude Code or API-driven pipelines. Includes retry logic, token budget management, and configurable depth levels (quick / standard / deep).", "tags": ["web-search", "synthesis", "tool-use", "research"], "author": "AI System Library", "version": "1.2.0", "updated": "2025-03-10", "downloads": 1840, "downloadUrl": "#", "docsUrl": "#", "files": ["agent.json", "tools/web_search.json", "tools/fetch_page.json", "README.md"]}, {"id": "code-review-agent", "title": "Code Review Agent", "category": "agent", "level": "advanced", "description": "Automated code review agent for pull requests. Detects bugs, security vulnerabilities, and style violations. Integrates with GitHub Actions.", "longDescription": "Analyzes diffs and full file context to produce structured review comments. Understands project-level conventions when given a CLAUDE.md or style guide. Outputs GitHub-compatible review JSON or plain Markdown. Supports Python, TypeScript, Go, and Rust. Configurable severity thresholds and custom rule injection.", "tags": ["code-review", "github", "security", "automation"], "author": "AI System Library", "version": "2.0.1", "updated": "2025-03-18", "downloads": 3210, "downloadUrl": "#", "docsUrl": "#", "files": ["agent.json", "prompts/review_system.txt", "schemas/review_output.json", "README.md"]}, {"id": "data-extraction-skill", "title": "Structured Data Extraction", "category": "skill", "level": "beginner", "description": "Extract structured JSON from unstructured text, PDFs, or HTML. Schema-driven with validation and fallback handling.", "longDescription": "Provide any schema and raw input \u2014 the skill maps extracted entities to your target structure, validates required fields, and flags low-confidence fields. Handles nested objects, arrays, and optional fields. Works on invoices, contracts, product listings, and more. Includes a built-in schema builder prompt.", "tags": ["extraction", "json", "schema", "parsing"], "author": "AI System Library", "version": "1.0.3", "updated": "2025-02-28", "downloads": 2750, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "examples/invoice.json", "examples/contract.json", "README.md"]}, {"id": "customer-support-agent", "title": "Customer Support Agent", "category": "agent", "level": "intermediate", "description": "Multi-turn support agent with escalation logic, ticket creation, and knowledge base lookup. Deployable as a chat widget or API endpoint.", "longDescription": "Handles Tier-1 support flows autonomously. Queries a vector-embedded knowledge base, resolves common issues, creates tickets in connected systems (Zendesk, Linear, Jira), and escalates complex cases with full context summary. Includes tone calibration, language detection, and CSAT scoring hooks.", "tags": ["support", "multi-turn", "escalation", "rag"], "author": "AI System Library", "version": "1.5.0", "updated": "2025-03-05", "downloads": 4100, "downloadUrl": "#", "docsUrl": "#", "files": ["agent.json", "tools/kb_lookup.json", "tools/ticket_create.json", "config/tone.json", "README.md"]}, {"id": "summarization-skill", "title": "Document Summarization", "category": "skill", "level": "beginner", "description": "Multi-format document summarizer. Outputs executive brief, bullet summary, or detailed breakdown depending on mode.", "longDescription": "Accepts raw text, PDF, or URL input. Three output modes: executive (3-5 sentence brief), structured (section-by-section bullets), and detailed (full outline with key quotes). Configurable output length and focus area injection. Handles 100K+ token documents via chunked summarization with coherence stitching.", "tags": ["summarization", "documents", "pdf", "long-context"], "author": "AI System Library", "version": "1.1.0", "updated": "2025-02-14", "downloads": 5600, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "prompts/chunk_summary.txt", "prompts/stitch.txt", "README.md"]}, {"id": "sql-generation-skill", "title": "Natural Language to SQL", "category": "skill", "level": "intermediate", "description": "Converts natural language queries to production-safe SQL. Schema-aware, supports PostgreSQL, MySQL, and SQLite.", "longDescription": "Provide your DB schema (DDL or JSON) and a plain-language question. Returns validated SQL with explanation, confidence score, and alternative query suggestions. Detects ambiguous queries and requests clarification. Enforces read-only mode by default. Supports CTEs, window functions, and aggregations.", "tags": ["sql", "database", "nl2sql", "postgresql"], "author": "AI System Library", "version": "2.1.0", "updated": "2025-03-20", "downloads": 3890, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "examples/ecommerce_schema.sql", "examples/queries.json", "README.md"]}, {"id": "content-pipeline-agent", "title": "Content Pipeline Agent", "category": "agent", "level": "advanced", "description": "End-to-end content production agent: research \u2192 outline \u2192 draft \u2192 SEO optimize \u2192 publish. Supports blog, LinkedIn, and newsletter formats.", "longDescription": "Fully orchestrated content workflow. Stage 1: keyword and topic research. Stage 2: outline generation with audience targeting. Stage 3: full draft with internal linking suggestions. Stage 4: SEO metadata, readability scoring, and CTA injection. Stage 5: formatted output for CMS APIs (WordPress, Ghost, Webflow). Each stage is independently addressable for partial runs.", "tags": ["content", "seo", "pipeline", "publishing"], "author": "AI System Library", "version": "1.3.2", "updated": "2025-03-15", "downloads": 2200, "downloadUrl": "#", "docsUrl": "#", "files": ["agent.json", "stages/", "tools/cms_publish.json", "config/formats.json", "README.md"]}, {"id": "memory-management-skill", "title": "Agent Memory Management", "category": "skill", "level": "advanced", "description": "Persistent memory layer for AI agents. Handles short-term context, long-term recall, and memory consolidation across sessions.", "longDescription": "Implements a three-tier memory architecture: working memory (in-context), episodic memory (session-level vector store), and semantic memory (long-term distilled facts). Includes automatic memory consolidation triggers, relevance scoring for retrieval, and decay functions for stale memories. Designed for agents that need continuity across multiple runs.", "tags": ["memory", "rag", "vector-store", "persistence"], "author": "AI System Library", "version": "1.0.0", "updated": "2025-03-22", "downloads": 1450, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "memory_schema.json", "consolidation_prompt.txt", "README.md"]}, {"id": "image-analysis-skill", "title": "Image Analysis & Tagging", "category": "skill", "level": "beginner", "description": "Extracts structured metadata from images: objects, text, sentiment, dominant colors, and content classification.", "longDescription": "Pass any image URL or base64 data. Returns structured JSON with detected objects (with bounding box estimates), extracted text via OCR, emotional tone, content safety classification, dominant color palette, and suggested tags. Designed for media pipelines, e-commerce product ingestion, and content moderation workflows.", "tags": ["vision", "ocr", "tagging", "classification"], "author": "AI System Library", "version": "1.2.1", "updated": "2025-03-01", "downloads": 3100, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "output_schema.json", "examples/product_image.json", "README.md"]}, {"id": "orchestrator-agent", "title": "Multi-Agent Orchestrator", "category": "agent", "level": "advanced", "description": "Coordinator agent that decomposes complex tasks, assigns sub-agents, tracks progress, and synthesizes final output.", "longDescription": "Implements a supervisor-worker pattern. The orchestrator receives a high-level goal, breaks it into subtasks using a planning prompt, assigns each subtask to specialized sub-agents, monitors completion state, handles retries on failure, and assembles the final deliverable. Includes a task graph representation and configurable parallelism. Built for production agentic pipelines where reliability and observability matter.", "tags": ["orchestration", "multi-agent", "planning", "supervisor"], "author": "AI System Library", "version": "1.1.0", "updated": "2025-03-25", "downloads": 980, "downloadUrl": "#", "docsUrl": "#", "files": ["orchestrator.json", "worker_template.json", "task_graph_schema.json", "README.md"]}, {"id": "translation-skill", "title": "Contextual Translation", "category": "skill", "level": "beginner", "description": "Context-aware translation preserving tone, technical terminology, and formatting. Supports 50+ languages with domain adaptation.", "longDescription": "Beyond word-for-word translation: the skill accepts a domain context (legal, medical, technical, marketing) and adjusts terminology accordingly. Preserves Markdown formatting, code blocks, and variable placeholders. Supports glossary injection for brand-specific terms. Outputs translation with confidence notes on ambiguous phrases.", "tags": ["translation", "localization", "multilingual", "i18n"], "author": "AI System Library", "version": "1.0.2", "updated": "2025-02-20", "downloads": 4400, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "glossary_template.json", "examples/legal.json", "README.md"]}, {"id": "eval-framework-skill", "title": "LLM Evaluation Framework", "category": "skill", "level": "advanced", "description": "Automated evaluation harness for LLM outputs. Measures accuracy, consistency, safety, and task-specific metrics with configurable rubrics.", "longDescription": "Run systematic evaluations across prompt variations, models, and configurations. Define custom rubrics as JSON. Supports G-Eval (GPT-as-judge), exact match, ROUGE, and semantic similarity metrics. Produces structured reports with per-criterion scores, failure analysis, and improvement suggestions. Integrates with CI/CD pipelines for regression testing on prompt changes.", "tags": ["evaluation", "testing", "metrics", "quality"], "author": "AI System Library", "version": "2.0.0", "updated": "2025-03-19", "downloads": 1670, "downloadUrl": "#", "docsUrl": "#", "files": ["skill.json", "rubrics/default.json", "rubrics/safety.json", "report_schema.json", "README.md"]}];

let assets = [];
let filtered = [];
let activeCategory = '';
let activeLevel    = '';
let activeSort     = 'downloads';

/* ─── DATA ────────────────────────────────────────────────── */
async function loadAssets() {
  try {
    /* Try fetch first (works on a server / GitHub Pages) */
    const res = await fetch('data/assets.json');
    if (!res.ok) throw new Error('not ok');
    assets = await res.json();
  } catch {
    /* Fallback: use inline embedded data (works with file://) */
    assets = INLINE_ASSETS;
  }
  filtered = [...assets];
  updateStats();
  applyFilters();
}

/* ─── STATS ───────────────────────────────────────────────── */
function updateStats() {
  const agents = assets.filter(a => a.category === 'agent').length;
  const skills = assets.filter(a => a.category === 'skill').length;
  const total  = assets.reduce((s, a) => s + (a.downloads || 0), 0);
  set('stat-total',     assets.length);
  set('stat-agents',    agents);
  set('stat-skills',    skills);
  set('stat-downloads', total >= 1000 ? (total/1000).toFixed(1)+'k' : total);
}
function set(id, val) { const el = document.getElementById(id); if(el) el.textContent = val; }

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

  if (activeSort === 'downloads') filtered.sort((a,b) => (b.downloads||0)-(a.downloads||0));
  else if (activeSort === 'newest') filtered.sort((a,b) => new Date(b.updated)-new Date(a.updated));
  else if (activeSort === 'title')  filtered.sort((a,b) => a.title.localeCompare(b.title));

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
  if (id && assets.length) { const a = assets.find(x=>x.id===id); if(a){showDetail(a);return;} }
  closeDetail();
});

/* ─── HELPERS ─────────────────────────────────────────────── */
function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmt(n) { return n>=1000?(n/1000).toFixed(1)+'k':String(n||0); }
function fmtDate(s) {
  try{return new Date(s).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});}catch{return s;}
}
function debounce(fn,ms){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};}

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadAssets();

  const id = new URLSearchParams(window.location.search).get('asset');
  if (id) { const a = assets.find(x=>x.id===id); if(a){showDetail(a);return;} }

  document.getElementById('search').addEventListener('input', debounce(applyFilters, 180));
  initPills('pill-category', val => { activeCategory = val; applyFilters(); });
  initPills('pill-level',    val => { activeLevel    = val; applyFilters(); });
  initPills('pill-sort',     val => { activeSort     = val; applyFilters(); });
});

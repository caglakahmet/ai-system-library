# AI System Library

A production-grade static catalog for AI agents and skill packages. Deployable directly to GitHub Pages with zero build steps.

## Structure

```
ai-system-library/
├── index.html          # Main catalog page
├── style.css           # All styles
├── script.js           # Filtering, search, routing
├── data/
│   └── assets.json     # Asset registry
└── pages/
    └── asset.html      # Standalone detail page (?id=<asset-id>)
```

## GitHub Pages Deployment

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source** → select `main` branch, root folder
3. Access at `https://<username>.github.io/<repo>/`

## Adding Assets

Edit `data/assets.json`. Each asset entry:

```json
{
  "id": "unique-slug",
  "title": "Asset Name",
  "category": "agent | skill",
  "level": "beginner | intermediate | advanced",
  "description": "Short description (shown on card).",
  "longDescription": "Full description (shown on detail page).",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "version": "1.0.0",
  "updated": "2025-03-27",
  "downloads": 0,
  "downloadUrl": "https://link-to-download",
  "docsUrl": "https://link-to-docs",
  "files": ["file1.json", "file2.txt", "README.md"]
}
```

## Features

- Instant search (debounced 200ms)
- Category and level filters
- Sort by downloads / newest / title
- SPA-style detail view with `?asset=<id>` URL routing
- Standalone `pages/asset.html` for direct deep links
- Dark editorial design — no external CSS dependencies
- GitHub Pages compatible (no server required)

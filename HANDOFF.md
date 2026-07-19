# kuyacarlo-portfolio — Handoff Document

**Last updated:** July 2026  
**Version:** v0.3  
**Owner:** John Carlo Santos (`kuyacarlo`)

---

## What this is

A personal portfolio website for John Carlo Santos — BS Computer Engineering student, data engineer, hackathon builder, and CTO of Seekers Guild. Built in Astro, statically generated, single-page.

**Live target domain:** `kuyacarlo.dev` (not yet pointed)  
**Dev server:** `http://localhost:4321` / `http://idea:4321`

---

## Project structure

```
kuyacarlo-portfolio/
├── src/
│   ├── layouts/Layout.astro    # HTML shell, fonts, scroll reveal script
│   ├── pages/index.astro       # Everything — content arrays + all HTML
│   └── styles/global.css       # Full design system — tokens, components
├── public/
│   └── hero-bg.jpg             # Reference image (unused in current design)
├── AGENTS.md                   # Guide for AI agents working on this codebase
├── HANDOFF.md                  # This document
└── README.md                   # Quick start
```

---

## Design decisions

| Decision | Rationale |
|---|---|
| Single-page | Portfolio content is concise — no need for routing overhead |
| No sticky nav | Inspired by leerob.com — let the content breathe |
| Warm greyscale | Less blue → more readable at night, more timeless |
| `680px` max-width | Comfortable reading width, single-column editorial feel |
| Project image slots | `aspect-ratio: 16/9` placeholders — drop screenshots anytime |
| Vanilla CSS | No framework lock-in, fast build, easy to reason about |
| Astro | Zero JS by default, static output, fast deploy to Vercel/Cloudflare |

**Inspiration:** stimmie.dev (media cards, sidebar), leerob.com (prose-first, no chrome), paco.me (column grid, stagger)

---

## Content inventory

### Projects (10 total)
| Project | Live? | Has screenshot? |
|---|---|---|
| tanggol-saka | ✅ tanggol-saka.vercel.app | ❌ placeholder |
| bantay | — | ❌ placeholder |
| forgesure | ✅ forgesure.vercel.app | ❌ placeholder |
| git-profile | — | ❌ placeholder |
| built | — | ❌ placeholder |
| sage-mcp | — | ❌ placeholder |
| sulong | ✅ sarai-sulong.vercel.app | ❌ placeholder |
| pub-routes | — | ❌ placeholder |
| nutrition-api | — | ❌ placeholder |
| qc-for-devs-data-pros | — | ❌ placeholder |

### Hackathons (5)
BPI DataWave 2025 (Top 3), LPU Innoverse 2025 (1st Runner Up), MLH Notion MCP, UP PJDSC, AMD Dev Hackathon 2026

### Talks (2)
Git & GitHub Fundamentals, Web Dev Basics — HTML & CSS

### Writing (2 dev.to articles)

---

## Immediate next steps

### High priority
- [ ] **Add your photo** — drop it in `public/photo.jpg`, add to the About section header
- [ ] **Add project screenshots** — for tanggol-saka, forgesure, bantay at minimum. Put in `public/screenshots/`, set `img: "/screenshots/name.jpg"` in the project object
- [ ] **Point domain** — buy `kuyacarlo.dev` (or use `karlo.dev` if available) and deploy to Vercel

### Medium priority
- [ ] **Devpost profile** — create one at `devpost.com/kuyacarlo` and link from Contact
- [ ] **OG image** — add a `public/og.jpg` for social sharing previews (1200×630px)
- [ ] **Google Search Console** — verify domain after deploy

### Low priority / future
- [ ] Blog/notes section (inline, like stimmie's writing section)
- [ ] GitHub activity heatmap (client-side, like stimmie.dev)
- [ ] `now` page — what you're currently working on
- [ ] Dark/light mode toggle (currently dark-only)

---

## Deploying to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# First deploy (interactive, sets up project)
vercel

# Production deploy
vercel --prod
```

Vercel auto-detects Astro. Zero config needed.

### Alternative: Cloudflare Pages
```bash
npm run build
# Upload dist/ to Cloudflare Pages manually, or connect repo
```

### Alternative: GitHub Pages
Add `.github/workflows/deploy.yml` using `withastro/action`.

---

## Running locally

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4321
```

Access at `http://localhost:4321` or `http://idea:4321` from JetBrains IDE.

---

## Adding project screenshots

1. Take a screenshot (1280×720 recommended)
2. Drop it in `public/screenshots/project-name.jpg`
3. In `src/pages/index.astro`, find the project and change:
   ```js
   img: null
   // to:
   img: "/screenshots/project-name.jpg"
   ```
4. The `<img>` tag and hover zoom effect apply automatically.

---

## Commit history

| Tag | Description |
|---|---|
| v0.1 | Initial scaffold — dark navy/cyan, all content placed |
| v0.2 | Greyscale redesign, fixed nav class bug, project image slot system |
| v0.3 | Final redesign — single-column editorial, stimmie/leerob/paco inspired |

---

## Contact

**John Carlo Santos**  
santos.karlo@outlook.com  
linkedin.com/in/kuyacarlo  
github.com/kuyacarlo

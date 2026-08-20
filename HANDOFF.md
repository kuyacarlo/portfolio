# kuyacarlo-portfolio — Handoff Document

**Last updated:** August 2026
**Version:** v0.6
**Owner:** John Carlo Santos (`kuyacarlo`)

---

## What this is

A personal portfolio website for John Carlo Santos — BS Computer Engineering student, data engineer, DevOps builder, hackathon competitor, and CTO of Seekers Guild. Built with Astro 5, statically generated, multi-page.

**Live target domain:** `kuyacarlo.dev` (not yet pointed)
**Dev server:** `http://localhost:4321` / `http://idea:4321`

---

## Project structure

```
kuyacarlo-portfolio/
├── src/
│   ├── layouts/
│   │   ├── Layout.astro         # Shell — fonts, fixed nav, mobile drawer, scroll JS,
│   │   │                        # "~" CLI terminal overlay, click-to-confetti
│   │   └── NoteLayout.astro     # Note variant — KaTeX CSS, client Mermaid, rehype-tikz
│   ├── pages/
│   │   ├── index.astro          # Home (hero, projects, hackathons, now, contact)
│   │   ├── homelab.astro        # Services + hardware, live status dots
│   │   ├── notes/index.astro    # Notes list
│   │   ├── notes/[slug].astro   # Single note
│   │   ├── certs.astro          # Certifications
│   │   ├── resume.astro         # Resume (screen + print/harvard layout)
│   │   └── book.astro           # Cal.com embed + contact
│   ├── lib/
│   │   ├── portfolio-data.ts    # SINGLE SOURCE OF TRUTH for page content
│   │   ├── site.ts              # PUBLIC_* env-backed site links
│   │   └── cms.ts               # getPosts() over Astro content collections (notes)
│   ├── content.config.ts        # Notes collection schema
│   ├── content/notes/*.md       # Notes (markdown)
│   ├── plugins/rehype-tikz.ts   # Build-time TikZ/CircuiTikZ → SVG (node-tikzjax)
│   └── styles/global.css        # Full design system — tokens, components
├── public/
│   ├── favicon.ico / favicon.svg
│   ├── hero-bg.jpg              # Reference image (unused in current design)
│   ├── resume/                  # Drop john-carlo-santos.pdf here (see README in folder)
│   └── tikz/                    # Legacy static TikZ SVGs (kept; new notes use fences)
├── AGENTS.md                    # Guide for AI agents working on this codebase
├── HANDOFF.md                   # This document
├── NOTES.md                     # How to write notes
└── README.md                    # Quick start
```

---

## Design decisions

| Decision | Rationale |
|---|---|
| Multi-page with fixed nav | homelab / notes / certs / resume / book get their own routes; nav is a deliberate fixed element |
| Nav hides on home hero | `navRevealId="work"` keeps the hero clean until you scroll to Selected Work |
| Note nav variant | `NoteLayout` swaps the logo for the note title, which fades into the bar on scroll |
| Warm greyscale | Less blue → more readable at night, more timeless |
| `1360px` max-width | Comfortable single-column editorial feel |
| One accent (`--sand #c4a882`) | Used sparingly for awards, code, terminal chrome |
| Project image slots | `aspect-ratio: 4/3` placeholder grid — drop screenshots anytime (`img` on the project object) |
| Vanilla CSS | No framework lock-in, fast build, easy to reason about |
| Build-time TikZ | CircuiTikZ → SVG via node-tikzjax (WASM) — static output, no client strobing |
| Astro | Zero JS by default, static output, fast deploy to Cloudflare Workers |

**Inspiration:** stimmie.dev, leerob.com (prose-first), paco.me (column grid)

---

## Content inventory

### Featured projects (6 — homepage)
| Project | Live? | Screenshot? |
|---|---|---|
| FerretOPS (AMD Hackathon 2026) | ✅ ferretops.kuyacarlo.workers.dev | ❌ placeholder |
| WorkSight (BPI DataWave 2025, Top 3) | — (private) | ❌ placeholder |
| tanggol-saka | ✅ tanggol-saka.vercel.app | ❌ placeholder |
| bantay | — | ❌ placeholder |
| SAGE (MLH GHW 2026 · Notion MCP) | — | ❌ placeholder |
| ForgeSure | ✅ forgesure.vercel.app | ❌ placeholder |

### Hackathons (5)
BPI DataWave 2025 (Top 3), LPU Innoverse 2025 (1st Runner Up), MLH GHW 2026 Notion MCP, UP PJDSC 2025, AMD Hackathon 2026

### Certifications (5)
Associate Python Developer (DataCamp), Azure Data Fundamentals (Microsoft), Azure AI Services Workshop (Microsoft), Intro to Cybersecurity (Cisco), Cybersecurity Simulation (Mastercard)

### Talks (3)
Quality Checks for Devs and Data Pros (Data Engineering Pilipinas), Git & GitHub Fundamentals (CSS BulSU), Web Dev Basics (Seekers Guild)

### Notes (3)
`pre-push-safety`, `building-mcp-servers`, `syntax-reference` — all live in `src/content/notes/`

---

## Next steps

### High priority
- [x] **Point domain** — `kuyacarlo.dev` is live, served by the `kuyacarlo-portfolio` Worker (route + proxied DNS on magallanes-main)
- [ ] **Add project screenshots** — set `img: "/file.jpg"` on project objects in `src/lib/portfolio-data.ts` and drop files in `public/`
- [ ] **Add static resume PDF** — drop `john-carlo-santos.pdf` into `public/resume/` (see `public/resume/README.md`). Until then the "Download PDF" button falls back to print-to-PDF on `/resume`

### Medium priority
- [ ] **OG image** — no `public/og.jpg` yet; add one (1200×630px) for social sharing previews
- [ ] **Social proof strip** — gated off (`socialProof.enabled = false`); drop 4–6 photos in `public/proof/`, flip `enabled: true`, fill `photos`
- [ ] **Google Search Console** — verify the domain after deploy

### Low priority / future
- [ ] More notes (KaTeX / Mermaid / CircuiTikZ all working — see `NOTES.md`)
- [ ] Dark/light mode toggle (currently dark-only; print uses a light paper theme)

---

## Deploying to Cloudflare Workers (static assets)

Automated via GitHub Actions (`.github/workflows/deploy.yml`) — on push to `main` it runs `pnpm build` then `wrangler deploy`. Manual/local:

```bash
pnpm wrangler deploy --profile magallanes   # uses wrangler.toml → ./dist
```

Prerequisites:
- GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` — **account ID must be `magallanes-main`: `04a311dd63265e896ca15a8e8124f144`** (wrong account = wrong namespace)
- Worker `kuyacarlo-portfolio` is auto-created on first deploy; add the custom domain (`kuyacarlo.dev`) under Worker → Settings → Domains
- `PUBLIC_*` vars are inlined from the workflow `env` (mirror of `.env.example`) — update there if they change

---

## Running locally

```bash
pnpm install
pnpm dev -- --host 0.0.0.0 --port 4321
```

Access at `http://localhost:4321` or `http://idea:4321` from JetBrains IDE.

---

## Adding a project

1. Open `src/lib/portfolio-data.ts`
2. Add an object to `projects` (name, emoji, category, desc, tech, url, live, demo, writeup, img, screenshots, private; optional type/role/team/award/architecture)
3. Optionally add a screenshot — `public/your-file.jpg`, set `img: "/your-file.jpg"`
4. The card, tags, links, and live dot apply automatically

---

## Commit history

| Tag | Description |
|---|---|
| v0.1 | Initial scaffold — dark navy/cyan, all content placed |
| v0.2 | Greyscale redesign, fixed nav class bug, project image slot system |
| v0.3 | Final redesign — single-column editorial, stimmie/leerob/paco inspired |
| v0.4 | Notes system — KaTeX, Mermaid, build-time TikZ/CircuiTikZ SSR, `~` CLI console, click-to-confetti |
| v0.5 | Multi-page expansion — homelab, certs, resume, book routes; resume print/harvard layout; pnpm standardization + build fix |

---

## Contact

**John Carlo Santos**
santos.karlo@outlook.com
linkedin.com/in/kuyacarlo
github.com/kuyacarlo

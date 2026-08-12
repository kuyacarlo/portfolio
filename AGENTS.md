# AGENTS.md — AI Agent Guide for kuyacarlo-portfolio

This file tells AI coding agents (Claude, Gemini, Codex, etc.) everything they need to know to work on this project without asking basic questions.

## Project identity

- **Owner:** John Carlo Santos (`kuyacarlo`)
- **Site:** `kuyacarlo.dev` (target domain, not live yet)
- **Stack:** Astro 5 · Vanilla CSS · Static output · Deployed to Cloudflare Pages
- **Package manager:** pnpm (canonical — `pnpm-lock.yaml` committed, `package-lock.json` removed)

## Architecture

```
src/
  layouts/Layout.astro        # Shell — <html>, fonts, fixed nav, mobile drawer,
                              # scroll/nav JS, "~" CLI terminal overlay,
                              # click-to-confetti on the collab badge
  layouts/NoteLayout.astro    # Extends Layout for notes (KaTeX CSS, client Mermaid,
                              # build-time CircuiTikZ via rehype-tikz)
  pages/
    index.astro               # Home
    homelab.astro             # Homelab services + hardware, live status dots
    notes/index.astro         # Notes list
    notes/[slug].astro        # Single note (uses NoteLayout)
    certs.astro               # Certifications
    resume.astro              # Resume (screen + print/harvard layout)
    book.astro                # "Let's talk" — Cal.com embed + contact
  lib/
    portfolio-data.ts         # SINGLE SOURCE OF TRUTH for all content
    site.ts                   # Site links from PUBLIC_* env vars (.env / .env.example)
    cms.ts                    # getPosts() wrapper over Astro content collections (notes)
  content.config.ts           # Notes content collection schema
  content/notes/*.md          # Notes (markdown)
  plugins/rehype-tikz.ts      # Build-time TikZ/CircuiTikZ → SVG (node-tikzjax WASM)
  styles/global.css           # All CSS. Tokens + components. No Tailwind.
public/
  hero-bg.jpg                 # Used in nothing currently (kept for reference)
  resume/                     # Drop john-carlo-santos.pdf here (see README in folder)
  tikz/                       # Legacy static TikZ SVGs (kept; new notes use fences)
```

Multi-page site with routing. **A fixed nav bar is present and intentional** (see below).

### Data flow

`src/lib/portfolio-data.ts` is the single source of truth for content: `projects`, `hackathons`, `experience`, `talks`, `certifications`, `skillGroups`, `nowItems`, `socialProof`, `counts`, `TAGLINE`. It is imported by `index.astro`, `resume.astro`, and `certs.astro`. Do not add a second content source for page data — notes are the only exception (they live in `src/content/notes/` as markdown, read via `src/lib/cms.ts`).

`src/lib/site.ts` exposes `site.{bookingUrl, email, linkedinUrl, githubUrl, devtoUrl, statusUrl}` from `PUBLIC_*` env vars, inlined at build time. Set them in `.env` (see `.env.example`).

## Design system

- **Colors (tokens in `global.css`):**
  - `--bg #0d0c0b`, `--s1 #141312` (card surface), `--s2 #1d1c1a` (raised surface)
  - `--b1 #252320` (border), `--b2 #363430` (border hover)
  - `--ink #f0ede6`, `--ink-2 #a8a49e`, `--ink-3 #7a7670`
  - `--sand #c4a882` — one warm accent, used sparingly
- **Typography:** Inter (body) + JetBrains Mono (code/labels), loaded via Google Fonts `<link>` in `Layout.astro`
- **Layout:** `--max 1360px` centered single column (`.wrap`), `--gutter` clamp, `--r 6px` radius
- **Aesthetic:** warm dark greyscale, editorial/paper-like. No glassmorphism, no gradients, no neon. (Note: the nav's scrolled background does use a subtle `backdrop-filter: blur` — that's existing chrome, not a pattern to extend.)
- **No Tailwind** — all styling is in `src/styles/global.css`.

## Nav

There is a **fixed nav bar** with links: `homelab`, `notes`, `certs`, `resume`, and a "let's talk →" CTA (→ `/book`). It is part of `Layout.astro`. Details:

- On the home page the bar is hidden until you scroll to the `#work` section (`navRevealId="work"`), keeping the hero clean.
- Notes use a special nav variant (`NoteLayout` passes `noteTitle`): no kuyacarlo logo, and the note title fades into the bar after scrolling past the article heading.
- `navStickyId` (used by homelab) controls when the "scrolled" chrome kicks in.
- On mobile the links collapse into a full-screen drawer (`#mobile-nav`).
- **This is intentional. Do not remove or "fix" the nav.**

## Content

### Projects / certs / resume data — `src/lib/portfolio-data.ts`

To add a project: add an object to the `projects` array (name, emoji, category, desc, tech, url, live, demo, writeup, img, screenshots, private, optional type/role/team/award/architecture). To add a project image: put the file in `public/`, set `img: "/your-file.jpg"` on the object. Homepage displays 6 featured projects (ComplyAIgent → WorkSight → tanggol-saka → bantay → SAGE → ForgeSure); the mobile order is tuned in `index.astro` (`mobileFeatured` set) and `global.css`.

### Notes — markdown in `src/content/notes/`

Notes are plain markdown files with frontmatter (`title`, `date`, `tags`, `draft`/`hide`, optional `desc`). Slug = filename. Features: KaTeX math (remark-math + rehype-katex), Mermaid diagrams (client-side, in `NoteLayout`), and CircuiTikZ/TikZ → inline SVG at build time via `src/plugins/rehype-tikz.ts`. Full authoring guide lives in **`NOTES.md`** — read it before writing or editing notes.

### Homepage features

- **"available for collab" badge** (`#collab-status`) fires click-to-confetti (canvas-confetti, `--sand`/ink colors).
- **`~` CLI terminal overlay** is injected by `Layout.astro` — press backtick to open. Commands (`help`, `projects`, `skills`, `now`, `contact`, `homelab`, `clear`, `close`) render strings derived from `src/lib/portfolio-data.ts`, so they can't drift from the rest of the site.

## Key conventions

- Eyebrow labels use the `.sec-label` structure — `.sec-num` + uppercase `.sec-name` + `.sec-rule` divider (see CSS "Section label"). Section dividers are `.section` borders / `<hr />`.
- Tags use class `tag` — monospace, bordered, no color fills.
- Live indicator is a `live-dot` class (small green dot) — only rendered when a project has a `live` URL.
- **Reveal classes are legacy no-ops:** markup uses `.r` / `.d1`–`.d4`, but the CSS rules are empty (`.r {}`, `.d1,.d2,.d3,.d4 {}`) — elements are always visible. Do not expect or add reveal animations, and don't worry that they "don't work".
- **Agent Workflow:** Always create a feature branch (`feature/...` or `fix/...`), use `pnpm` (not npm) for install/build, run `pnpm build` and make sure it passes before finishing, then prepare a PR/merge back to `main`. Do not push directly to `main`.

## What NOT to do

- Do not add Tailwind or any CSS framework
- Do not add bright/saturated colors — ask before adding any color outside the palette above
- Do not remove the `<!-- PROJECTS -->`, `<!-- HACKATHONS -->`, `<!-- NOW -->`, `<!-- CONTACT -->` etc. HTML comments in `index.astro` — they serve as content anchors
- Do not add third data sources — everything page-related stays in `src/lib/portfolio-data.ts`
- Do not "restore" the old reveal-animation CSS or the old single-page/navless layout
- There is no RSS feed. The `rss` npm dependency is unused and must not be wired up or documented

## Owner identity (for content tasks)

| Field      | Value |
|---|---|
| Full name  | John Carlo Santos |
| Alias      | Karlo / kuyacarlo |
| University | Bulacan State University, BS Computer Engineering, Expected 2028 |
| Location   | Bulacan, Philippines |
| Email      | santos.karlo@outlook.com |
| LinkedIn   | linkedin.com/in/kuyacarlo |
| GitHub     | github.com/kuyacarlo |
| dev.to     | dev.to/kuyacarlo |
| Tagline    | "Iterate fast, think deep, ship meaning." |

## Running locally

```bash
pnpm install
pnpm dev -- --host 0.0.0.0 --port 4321
# Access at: http://localhost:4321 or http://idea:4321
```

## Deploying

Deploys to **Cloudflare Pages** via GitHub Actions (`.github/workflows/deploy.yml`) — on push to `main` it runs `pnpm build` and `wrangler pages deploy` against `dist/` (`wrangler.toml`). Manual/local:

```bash
pnpm wrangler pages deploy   # uses wrangler.toml → ./dist
```

Prerequisites (one-time):
- Cloudflare Pages project named `kuyacarlo-portfolio` (wrangler auto-creates on first deploy)
- GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- `PUBLIC_*` site links are inlined from the workflow `env` (mirror of `.env.example`)

## Changelog

| Version | Notes |
|---|---|
| v0.1    | Initial scaffold — dark navy/cyan design, all content in place |
| v0.2    | Redesign — greyscale/lean, fixed nav bug, project image slots added |
| v0.3    | Final redesign — single-column editorial layout, stimmie/leerob/paco inspired |
| v0.4    | Notes system — KaTeX math, Mermaid, build-time TikZ/CircuiTikZ SSR, `~` CLI terminal overlay, click-to-confetti |
| v0.5    | Multi-page expansion — homelab, certs, resume, book routes; resume print/harvard layout; pnpm standardization + build fix |
| v0.6    | Deploy to Cloudflare Pages (GitHub Actions + wrangler) instead of Vercel |

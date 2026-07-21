# AGENTS.md — AI Agent Guide for kuyacarlo-portfolio

This file tells AI coding agents (Claude, Gemini, Codex, etc.) everything they need to know to work on this project without asking basic questions.

## Project identity

- **Owner:** John Carlo Santos (`kuyacarlo`)
- **Site:** `kuyacarlo.dev` (target domain, not live yet)
- **Stack:** Astro 5 · Vanilla CSS · Static output · Deployed to Vercel

## Architecture

```
src/
  layouts/Layout.astro   # Shell — <html>, fonts, scripts only. No nav.
  pages/index.astro      # Single page — all content lives here as data arrays
  styles/global.css      # All CSS. Tokens + components. No Tailwind.
public/
  hero-bg.jpg            # Used in nothing currently (kept for reference)
```

Single-page portfolio. **No routing, no framework components, no build plugins.**

## Design system

- **Colors:** `--bg #111110`, `--ink #e8e6e1`, `--ink-2 #a09e99`, `--ink-3 #5a5856` — warm dark greyscale
- **Accent:** `--accent #d4cfc8` — one warm off-white, used sparingly
- **Typography:** Inter (body) + JetBrains Mono (code/labels)
- **Max-width:** `680px` centered single column — do not widen unless asked
- **No nav bar** — anchor links only in the header prose. This is intentional.
- **No glassmorphism, no gradients, no neon.** Editorial, paper-like aesthetic.

## Content lives in `index.astro`

All data is in arrays at the top of `index.astro`:
- `projects[]` — name, emoji, desc, tech, url, live, img
- `hackathons[]` — place, name, proj, win, desc
- `talks[]` / `writings[]`
- `involvement[]`
- `skills{}` — object keyed by category

To add a project photo: put the file in `public/`, set `img: "/your-file.jpg"` on the project object.

## Key conventions

- Eyebrow labels use `<h2>` with uppercase mono styling (see CSS `.section-title`)
- Section dividers are `<hr />`
- Reveal animation: add class `reveal` + optionally `d1`–`d4` for stagger
- Tags use class `tag` — monospace, bordered, no color fills
- Live indicator is a `live-dot` class (small green dot) — only on projects with a `live` URL
- **Agent Workflow:** Always create a feature branch (`feature/...`), implement changes, and prepare for a PR/merge back to `main`. Do not push directly to `main` without testing the build.

## What NOT to do

- Do not add Tailwind or any CSS framework
- Do not add a sticky top navigation bar (it was removed intentionally)
- Do not add bright/saturated colors — ask before adding any color other than the existing palette
- Do not split into multiple pages unless the owner explicitly requests it
- Do not remove the `<!-- PROJECTS -->`, `<!-- HACKATHONS -->` etc. HTML comments — they serve as content anchors

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
npm run dev -- --host 0.0.0.0 --port 4321
# Access at: http://localhost:4321 or http://idea:4321
```

## Deploying

```bash
# Vercel (one command, first time)
npx vercel --prod

# Subsequent deploys
vercel deploy --prod
```

## Changelog

| Version | Notes |
|---|---|
| v0.1    | Initial scaffold — dark navy/cyan design, all content in place |
| v0.2    | Redesign — greyscale/lean, fixed nav bug, project image slots added |
| v0.3    | Final redesign — single-column editorial layout, stimmie/leerob/paco inspired |
| v0.4    | Added RSS feed (`/rss.xml`), reading times, click-to-confetti status, and `~` CLI Console overlay |

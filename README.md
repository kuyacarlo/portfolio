# kuyacarlo-portfolio

Personal portfolio for John Carlo Santos (`kuyacarlo`) — data engineer, DevOps builder, hackathon competitor, BS Computer Engineering @ BulSU '28.

## Stack

- **Astro 5** — multi-page static output, zero client JS by default
- **Vanilla CSS** — no Tailwind, no frameworks (tokens + components in `src/styles/global.css`)
- **Cloudflare Workers (static assets)** — deployed at `kuyacarlo.dev` (target domain, not live yet)

## Quickstart (pnpm)

```bash
pnpm install
pnpm dev -- --host 0.0.0.0 --port 4321
# → http://localhost:4321  /  http://idea:4321
```

## Scripts

| Command        | What it does             |
|----------------|--------------------------|
| `pnpm dev`     | Start the dev server     |
| `pnpm build`   | Static build → `dist/`   |
| `pnpm preview` | Preview the built site   |

## Structure

```
src/
  layouts/Layout.astro      # Shell — fixed nav, mobile drawer, scroll JS, ~ CLI, confetti
  layouts/NoteLayout.astro  # Note variant — KaTeX, Mermaid, build-time TikZ
  pages/                    # Routes: /, /homelab, /notes[/:slug], /certs, /resume, /book
  lib/portfolio-data.ts     # Single source of truth for page content
  lib/site.ts               # PUBLIC_* env-backed site links
  lib/cms.ts                # getPosts() over Astro content collections (notes)
  content/notes/*.md        # Notes (markdown)
  plugins/rehype-tikz.ts    # ```tikz / ```circuitikz → SVG at build time
  styles/global.css         # All CSS
```

## Content

- **Page data** lives in `src/lib/portfolio-data.ts` (projects, hackathons, experience, talks, certifications, skills, now, tagline). Add/edit a project there; optionally drop an image in `public/` and set `img` on the object.
- **Notes** are markdown in `src/content/notes/`. Slug = URL. Supports KaTeX math, Mermaid diagrams, and CircuiTikZ. Authoring guide: [`NOTES.md`](./NOTES.md).

## Deploy

Deploys to **Cloudflare Workers (static assets)** from GitHub Actions (`.github/workflows/deploy.yml`): on push to `main`, it runs `pnpm build` then `wrangler deploy` (serves `dist/` via `[assets]` in `wrangler.toml`).

Manual/local:

```bash
pnpm wrangler deploy   # uses wrangler.toml → ./dist
```

Prerequisites (one-time):
- GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
- The `PUBLIC_*` vars from `.env.example` are inlined by the workflow `env`; override them there if they change.

## Docs

- [`AGENTS.md`](./AGENTS.md) — guide for AI agents working on this codebase
- [`HANDOFF.md`](./HANDOFF.md) — living handoff with current state and next steps
- [`NOTES.md`](./NOTES.md) — how to write notes

## License

MIT

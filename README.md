# kuyacarlo-portfolio

Personal portfolio for John Carlo Santos (`kuyacarlo`) — data engineer, DevOps builder, hackathon competitor, BS Computer Engineering @ BulSU '28.

## Stack

- **Astro** — multi-page static output, client JS only for interactions
- **Vanilla CSS** — no Tailwind, no frameworks (tokens + components in `src/styles/global.css`)
- **Cloudflare Workers (static assets)** — live at `kuyacarlo.dev`

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
  layouts/Layout.astro      # Document shell, skip link, responsive header/menu
  layouts/NoteLayout.astro  # Note support — KaTeX, Mermaid, build-time TikZ
  pages/                    # Routes: /, /homelab, /notes[/:slug], /certs, /resume, /book
  lib/site.ts               # PUBLIC_* env-backed site links
  lib/cms.ts                # getPosts() over Astro content collections (notes)
  data/*.json               # Page content and design tokens
  content/notes/*.md        # Notes (markdown)
  plugins/rehype-tikz.ts    # ```tikz / ```circuitikz → SVG at build time
  styles/global.css         # All CSS
```

## Content

- **Page data** lives in `src/data/*.json`. Projects and layer mappings are in `projects.json`; other files hold hackathons, current work, homelab, resume, certifications, and layer names. Do not replace the layer guesses without Karlo's confirmation.
- **Notes** are markdown in `src/content/notes/`. Slug = URL. Supports KaTeX math, Mermaid diagrams, and CircuiTikZ. Authoring guide: [`NOTES.md`](./NOTES.md).

## Deploy

Deploys to **Cloudflare Workers (static assets)** from GitHub Actions (`.github/workflows/deploy.yml`): on push to `main`, it runs `pnpm build` then `wrangler deploy` (serves `dist/` via `[assets]` in `wrangler.toml`).

Manual/local:

```bash
pnpm wrangler deploy --profile magallanes   # uses wrangler.toml → ./dist (magallanes-main account)
```

Prerequisites (one-time):
- GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
- The `PUBLIC_*` vars from `.env.example` are inlined by the workflow `env`; override them there if they change.

## Docs

- [`AGENTS.md`](./AGENTS.md) — guide for AI agents working on this codebase
- [`REDESIGN-SPEC.md`](./REDESIGN-SPEC.md) — supplied redesign brief and content decisions
- [`HANDOFF.md`](./HANDOFF.md) — historical project handoff
- [`INDEX.md`](./INDEX.md) — project documentation routing
- [`NOTES.md`](./NOTES.md) — how to write notes

## License

MIT

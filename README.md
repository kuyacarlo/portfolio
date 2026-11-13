# kuyacarlo-portfolio

Personal portfolio for John Carlo Santos (`kuyacarlo`) — data engineer, DevOps builder, hackathon competitor, BS Computer Engineering @ BulSU '28.

## Stack

- **Astro** — multi-page static output, client JS only for interactions
- **Vanilla CSS** — no Tailwind, no frameworks (tokens in `src/data/tokens.css`, shared primitives in `src/styles/global.css`, page rules scoped in each page)
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
| `pnpm test`    | Unit tests (Vitest)      |
| `pnpm test:e2e`| Playwright at 1440×900 and 390×844: routes, menu, toggles, filter, axe, no sideways scroll (builds first; `E2E_PORT` picks the preview port) |

First e2e run on a machine: `pnpm exec playwright install chromium`.

## Structure

```
src/
  layouts/Layout.astro      # Ruled 1440 frame: skip link, cell header, phone menu, footer
  layouts/NoteLayout.astro  # Note support — KaTeX, Mermaid, build-time TikZ
  pages/                    # Routes: /, /homelab, /notes[/:slug], /certs, /resume, /book, 404
  components/               # Mark, CoverageStrip, Footer, and page parts (Note*, ResumeEntry, CertCard)
  lib/layers.ts             # Layer names, CoverageStrip labels, note filter, phone-featured projects
  lib/site.ts               # PUBLIC_* env-backed site links
  lib/cms.ts                # getPosts() over Astro content collections (notes)
  data/*.json               # Page content; data/tokens.css holds the design tokens
  content/notes/*.md        # Notes (markdown)
  plugins/                  # remark-tikz (TikZ → SVG), remark-note-features, rehype-note-a11y
  styles/global.css         # Base, shell, and shared primitives
tests/
  unit/                     # Vitest
  e2e/                      # Playwright + axe
```tikz / ```circuitikz → SVG at build time
  styles/global.css         # All CSS
```

## Content

- **Page data** lives in `src/data/*.json`. Projects and layer mappings are in `projects.json`; other files hold hackathons, current work, homelab, resume, certifications, and layer names. Do not replace the layer guesses without Karlo's confirmation.
- **Notes** are markdown in `src/content/notes/`. Slug = URL. Supports KaTeX math, Mermaid diagrams, and CircuiTikZ. Authoring guide: [`docs/NOTES.md`](./docs/NOTES.md).

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
- [`docs/REDESIGN-SPEC.md`](./docs/REDESIGN-SPEC.md) — original redesign brief; current project rules are in `AGENTS.md`
- [`HANDOFF.md`](./HANDOFF.md) — historical project handoff
- [`INDEX.md`](./INDEX.md) — project documentation routing
- [`docs/NOTES.md`](./docs/NOTES.md) — how to write notes
- [`docs/issue-triage.md`](./docs/issue-triage.md) — review of open GitHub issues against the redesign

## License

MIT

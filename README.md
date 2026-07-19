# kuyacarlo-portfolio

Personal portfolio for John Carlo Santos — data engineer, hackathon builder, BS Computer Engineering @ BulSU.

## Stack

- **Astro 5** — static output, zero client JS by default
- **Vanilla CSS** — no Tailwind, no frameworks
- **Single page** — all content in `src/pages/index.astro`

## Dev

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4321
# → http://localhost:4321
# → http://idea:4321 (JetBrains IDE)
```

## Build

```bash
npm run build
# Output in dist/
```

## Deploy

```bash
# Vercel (recommended)
npx vercel --prod
```

## Content

All content is in data arrays at the top of `src/pages/index.astro`:
- `projects[]` — add screenshots by setting `img: "/screenshots/name.jpg"` and dropping the file in `public/screenshots/`
- `hackathons[]`, `talks[]`, `writings[]`, `involvement[]`, `skills{}`

## Docs

- [`AGENTS.md`](./AGENTS.md) — guide for AI agents working on this codebase
- [`HANDOFF.md`](./HANDOFF.md) — full project handoff with next steps

## License

MIT

# AGENTS.md — kuyacarlo-portfolio

## Project identity

- Owner: John Carlo Santos (`kuyacarlo`)
- Site: `kuyacarlo.dev`
- Stack: Astro static output, vanilla CSS, Cloudflare Workers static assets
- Package manager: pnpm (`pnpm-lock.yaml` is canonical)

## Architecture

```text
src/
  layouts/Layout.astro       # Ruled 1440 frame: skip link, cell header, phone menu, footer slot
  layouts/NoteLayout.astro   # Markdown math, Mermaid, and TikZ support
  pages/                     # /, /homelab, /notes, /notes/[slug], /certs, /resume, /book, 404
  components/                # Mark, CoverageStrip, Footer, Note*, ResumeEntry, CertCard
  data/*.json                # Handoff page content; data/tokens.css holds the tokens
  content/notes/*.md         # Notes collection
  lib/layers.ts              # Layer names, strip labels, note filter, phone-featured list
  lib/site.ts                # PUBLIC_* links and booking URL
  lib/cms.ts                 # Notes collection adapter
  plugins/                   # remark-tikz, remark-note-features (asset flags), rehype-note-a11y
  styles/global.css          # Base, shell, and shared primitives only
tests/unit, tests/e2e        # Vitest; Playwright + axe at 1440x900 and 390x844
```

Layout is one ruled frame; every region inside it is an edge-to-edge cell. Pages render `<main id="main">` with their regions and keep their own rules in a scoped `<style>`. Shared primitives (`.region`, `.region-head`, `.button-*`, `.tag`, `.status-*`, `.layer-badge`, `.coverage`, `.code-block`) live in `global.css`; add to it only what two pages share.

`src/data/*.json` is the source of truth for projects, hackathons, current work, homelab, resume, certifications, and layer names. Notes remain Markdown in `src/content/notes/`. `src/lib/site.ts` owns environment-backed external links only.

## Design contract

Follow `REDESIGN-SPEC.md` and the supplied redesign files. `HANDOFF.md` is a historical record; do not rewrite it. The site uses a strict black-and-white system: `--ink #000`, `--paper #fff`, `--surface #f2f2f2`, `--muted #666`, and `--link #00e`. Use the tokens in `src/data/tokens.css`; fonts are Red Hat Display, Red Hat Text, and Red Hat Mono. Every cell uses a 2px black rule and square corners. No shadows, gradients, blur, decorative color, pills, or animations. Emphasis is inversion; blue is reserved for links.

The staircase mark and layer numbers carry the “stack” idea. Do not explain that idea in copy, add a coverage legend, or add hostnames, ports, internal URLs, IPs, or service counts to the homelab page. Only `forge.kuyacarlo.dev` may be linked from that page.

## Routes and behavior

Keep `/`, `/homelab`, `/notes`, `/notes/[slug]`, `/certs`, `/resume`, and `/book`, plus the 404 page. The desktop header is 64px; the phone header is 56px with a push-down menu that closes on Escape and returns focus to its button. Every page has one `<main id="main">`, a skip link target, one `<h1>`, and `aria-current="page"` on its active navigation item.

The phone homepage shows only `featuredOnPhone` projects and the two podium results until expanded. Notes filter by layer and reflect the selection in `?layer=`. `/book` keeps the existing `site.bookingUrl` Cal.com embed; never invent availability or slot data. The resume PDF action may use the existing print-to-PDF fallback while no PDF file is present. Certifications without a verification URL are not rendered.

## Content rules

- Treat bracketed values in the handoff data as placeholders. Keep them visible where required; do not guess dates, resume details, certificates, booking information, project layers, or handles.
- Project layer assignments are guesses; preserve them until Karlo confirms them.
- Keep the existing GitHub account links unless the owner resolves the handle question.
- No RSS feed. Do not add one.
- Read `NOTES.md` before authoring or editing note content.

## Workflow

- Verify the repository, branch, and worktree before editing.
- Create a `feat/` or `fix/` branch. Use pnpm. Before committing, run `pnpm build`, `pnpm test`, and `pnpm test:e2e` (axe, no sideways scroll from 360 to 1280, one h1 per page). Make reviewable commits. Never push unless the user explicitly asks. Do not deploy manually; GitHub Actions deploys on merge to `main`.
- Do not add a CSS framework or unrelated third-party scripts.

## Owner details

John Carlo Santos · Bulacan State University, BS Computer Engineering, expected 2028 · Bulacan, Philippines · `santos.karlo@outlook.com` · LinkedIn `kuyacarlo` · GitHub `kuyacarlo` · dev.to `kuyacarlo` · “Iterate fast, think deep, ship meaning.”

## Changelog

| Version | Notes |
|---|---|
| v0.1–v0.6 | Original portfolio and multi-page expansion |
| v0.7 | Brutalist black-and-white redesign, JSON content layer, layer-based projects and notes |

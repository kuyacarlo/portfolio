# Handoff — certs-page

## Goal
Move certifications off the homepage into a dedicated **`/certs`** nav tab (portfolio #12 — dedicated page, not a home section).

## Branch
`feat/certs-page` from `main` @ 2026-08-01

## Status
- Done: branch + this handoff
- In progress: —
- Not started: `/certs` page, nav + mobile links, wire `certifications` from `portfolio-data`

## Constraints
- Astro 5 · vanilla CSS in `global.css` · data in `src/lib/portfolio-data.ts`
- Do **not** add a Certifications section to `index.astro`
- Keep certs on `/resume` (print/Harvard) — this page is additive
- Reuse `.cert-row` / `.cert-list` styles already in `global.css`
- pnpm only
- Do not overwrite root `HANDOFF.md` (project-level doc); branch handoffs live here

## Next (≤3 micro-steps)
1. Add `src/pages/certs.astro` listing `certifications` (name, issuer, date).
2. Add `certs` to desktop + mobile nav in `Layout.astro` (`active==='certs'`).
3. Smoke: `pnpm build`.

## Artifacts
- Issue: https://github.com/kuyacarlo/portfolio/issues/12
- Skill: `context-handoff` (`~/projects/skills/skills/context-handoff`)

## Agent notes
Owner last session: cursor  
Optional later: credential ID field — not MVP.

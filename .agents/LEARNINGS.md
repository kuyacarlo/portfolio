# 🧠 Historical Learnings & Improvement Plan

Shared memory of failure modes and constraints for this workspace. **Do not delete; append new learnings at the top.**

---

## ⚡ Active Action Plan (Next Steps)
- [ ] Add GitHub secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (repo → Settings → Secrets) — deploy job fails auth until then.
- [ ] Unlink Vercel GitHub integration (Vercel dashboard → project → Settings → Git, or repo GitHub → Settings → Applications → Vercel). Otherwise Vercel keeps deploying alongside Pages.
- [ ] Point `kuyacarlo.dev` at the Pages project (Pages → Custom domains) after first successful deploy.
- [ ] Add `site: "https://kuyacarlo.dev"` to `astro.config.mjs` once the domain is live (canonical/sitemap/OG URLs).

---

## 📝 Latest Session Logs (2026-08-13)

### 1. Failure Modes & Resolutions
- **Issue:** `astro build` crashed with `The requested module 'neotraverse' does not provide an export named 'forEach'` at `getStaticPaths` — every build red, `dist/` stale.
  - **Resolution:** Root cause was a **mixed npm + pnpm install**: a stale npm-installed `neotraverse@0.6.18` sat at the top of `node_modules` and shadowed Astro's nested `neotraverse@1.0.1` when the prerender bundle externalized its bare import. Fixed by wiping `node_modules`, deleting `package-lock.json`, adding `"packageManager": "pnpm@10.33.0"` + `pnpm.onlyBuiltDependencies: ["esbuild"]`, clean `pnpm install`. (See `src/lib/`, `package.json`.)
  - **Prevention:** One package manager per tree. Never `npm install`/`pnpm install` interchangeably in the same repo. Lock with the `packageManager` field. If a build fails on a named-export-after-bundle error, check for a shadowing top-level `node_modules/<pkg>` copy first.
- **Issue:** Docs lied about the code — AGENTS/README/HANDOFF described a single-page, navless, 680px site that had not existed for 4+ commits.
  - **Resolution:** Rewrote all three to match the real multi-page repo (7 routes, fixed nav, real tokens). (`AGENTS.md`, `README.md`, `HANDOFF.md`.)
  - **Prevention:** Update `AGENTS.md` in the same change that changes routes/architecture. Docs must describe reality or they are worse than none.
- **Issue:** Content duplicated 4× and already drifted (CLI terminal in `Layout.astro`, `profile-readme/`, HANDOFF, `portfolio-data.ts`); terminal listed a project (`pub-routes`) that no longer existed.
  - **Resolution:** Single source of truth = `src/lib/portfolio-data.ts`. The `~` CLI now derives its command strings from it via `define:vars`; homelab catalog moved into it too. (`src/layouts/Layout.astro`, `src/pages/homelab.astro`, `profile-readme/README.md`.)
  - **Prevention:** Derived output over hardcoded copies. If a string must exist in two places, derive the second from the first.
- **Issue:** `pnpm 10` silently blocked esbuild's postinstall — Vite/Astro would have failed at build.
  - **Resolution:** Declared `pnpm.onlyBuiltDependencies: ["esbuild"]` in `package.json`.
  - **Prevention:** Expect the "Ignored build scripts" warning on `pnpm install`; declare allowed builds in `package.json` (not via interactive `pnpm approve-builds` — it hangs in headless agents).
- **Issue:** Switched deploy host to Cloudflare Pages but **Vercel kept auto-deploying** — the Vercel GitHub app was still installed, producing its own CI checks.
  - **Resolution:** Documented unlink steps in the PR + this file. Deploy config alone does not disable the old host's git integration.
  - **Prevention:** When switching platforms, unlink the old host's GitHub app in the same change. Check the PR checks list for stray host checks after migrating.
- **Issue:** `git diff origin/main..origin/<branch>` failed "unknown revision" even though the branch was pushed.
  - **Resolution:** The remote's fetch refspec only tracks `main` (`+refs/heads/main:refs/remotes/origin/main`); feature branches were never fetched. Fixed with an explicit `git fetch origin +refs/heads/<branch>:refs/remotes/origin/<branch>`.
  - **Prevention:** When PR diffs "can't resolve", check `remote.origin.fetch` before assuming the remote is stale.
- **Issue:** Dead feature paid twice — reveal-animation CSS was emptied for readability (`.r`/`.d1-d4` no-ops) but the IntersectionObserver JS + markup classes stayed in every page.
  - **Resolution:** Removed the empty CSS block only; left markup/JS (out of scope). Flagged as technical debt. (`src/styles/global.css`.)
  - **Prevention:** When killing a feature's CSS, remove its JS/markup too, or annotate it as a legacy no-op so agents don't "fix" it.

### 2. Quantitative Refactor Metrics
- **LOC Delta:** global.css `-270` (1318 → 1048); docs rewritten; `package-lock.json` deleted (-5598).
- **Tests Run:** `pnpm build` — 9 pages, exit 0 (multiple runs, incl. post-merge on `main`). Dev-server smoke: all routes 200.
- **GPG Signatures Verify:** N/A — commits pushed without local signing (karlo config uses GPG signing via git-profiles; `git log --show-signature` not re-checked on this box).

### 3. Guidelines for the Next Agent
- Build/deploy is **Cloudflare Pages** (`.github/workflows/deploy.yml` + `wrangler.toml`). Static Astro → no adapter. Verify with `pnpm build`; local manual deploy: `pnpm wrangler pages deploy`.
- Always create a feature branch, use `pnpm` (never npm), run `pnpm build` before finishing, PR back to `main`. The deploy job runs on every `main` push — a merge is also a release.
- `src/lib/portfolio-data.ts` is the single source of truth for all page content — including the `~` CLI strings. Do not hardcode content elsewhere.
- The `.r`/`.d1-d4` reveal classes are legacy no-ops (always visible). Do not add reveal animations.
- `PUBLIC_*` vars are inlined at build time by the workflow `env` (mirror of `.env.example`).

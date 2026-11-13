# Open issue triage

Reviewed 2026-11-13 against the redesigned site and `src/data/`. These are
recommendations only; no GitHub issue state was changed. The open issues are
product decisions or follow-up work, not a canonical redesign backlog. Check
the linked issue before starting work because its status may have changed.

| Issue | Current fit | Triage |
|---|---|---|
| [#23 Project detail drawer](https://github.com/kuyacarlo/portfolio/issues/23) | The redesigned project list intentionally uses compact rows; project details, screenshots, and role badges are not in the current design contract. | Keep open as optional follow-up. Revisit only with available media and an approved interaction design. |
| [#22 Section footer counts](https://github.com/kuyacarlo/portfolio/issues/22) | Hackathon and podium totals are already displayed. A homelab service count is explicitly disallowed by `AGENTS.md`; other counts need a clear reader benefit. | Narrow to specific, useful counts outside homelab, or close as mostly covered. Do not implement the homelab count. |
| [#21 Curated photos](https://github.com/kuyacarlo/portfolio/issues/21) | The redesign has no photo section and no photo inventory in the content model. | Keep open only if Karlo supplies 4–6 approved, captionable photos and chooses a placement. |
| [#19 GitHub profile README](https://github.com/kuyacarlo/portfolio/issues/19) | `profile-readme/README.md` already contains positioning, featured builds, grouped skills, and portfolio/social links. | Close as implemented after confirming the source has been copied to the `kuyacarlo/kuyacarlo` profile repository. This repo file is labeled as the source of truth. |
| [#8 Project outcomes and links](https://github.com/kuyacarlo/portfolio/issues/8) | All current project rows have a source, live, or internal link; some have both. Project blurbs do not consistently state measurable outcomes. | Partially complete. Keep open for verified outcome copy only; the link criterion is covered. |
| [#6 Group tech stack by discipline](https://github.com/kuyacarlo/portfolio/issues/6) | The new resume groups skills by numbered layer, replacing the old flat tag row. | Close as superseded by the redesign, unless the owner still wants discipline headings. |
| [#5 Experience / Leadership section](https://github.com/kuyacarlo/portfolio/issues/5) | `/resume` now has a dedicated Experience section with role entries. Leadership details and talks also appear in print resume data; the issue asked for a homepage section. | Close as covered by the redesigned resume, or explicitly reopen scope if a homepage section remains desired. |

## Documentation cleanup

The original redesign brief referred to `ISSUES.md` and `reference/` files that
were never present in this checkout. Those paths are no longer presented as
available instructions. The brief is retained at `docs/REDESIGN-SPEC.md` as
historical context, and root `INDEX.md` routes readers to current guidance.

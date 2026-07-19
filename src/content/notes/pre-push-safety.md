---
title: "QC for Devs & Data Pros — Your Pre-Push Safety Net"
date: "2026-03-18"
tags: ["devops", "git", "quality"]
desc: "A checklist-driven approach to catching bugs, secrets, and broken pipelines before they hit remote."
---

Every time I pushed broken code at 2 AM I told myself I'd build a system to stop it from happening again. `bantay` and this checklist are that system.

## The problem with "I'll review it tomorrow"

By the time you review it tomorrow, the broken migration has already run on staging. The hardcoded API key is in the git history forever. The type error is blocking someone else's PR.

Pre-push hooks are the right fix. They're synchronous, they block bad pushes, and they're free.

## The checklist

### Before every push

- [ ] `ruff check .` — linting passes
- [ ] `pytest -x` — no failing tests
- [ ] `git diff --cached` — nothing you didn't intend
- [ ] No `TODO: remove before commit` in staged files
- [ ] No hardcoded secrets (`grep -r "sk-" .` etc.)

### Before a PR

- [ ] Migration is reversible (`down` is implemented)
- [ ] `.env.example` updated if you added env vars
- [ ] Dockerfile tested locally (`docker build .`)

## Automating it with bantay

`bantay` automates the secrets check with two layers: regex for known patterns (API key formats, private keys) and LLM scoring for high-entropy strings that don't match any pattern.

Medium-risk pushes trigger an Auth0 CIBA request — you approve or deny from your phone before the push completes. Fail-closed by design.

```bash
# Install in a repo
cd your-repo
bantay install
```

The rest is just `.git/hooks/pre-push` — no daemon, no server, no CI dependency.

## For data pipelines

Data teams have an extra surface area to worry about:

- [ ] Output schema matches downstream expectations
- [ ] Row counts are in expected range (add assertions)
- [ ] No PII in output CSVs
- [ ] Idempotent — running twice doesn't double-count

I've been adding `great_expectations`-style assertions inline using Pandas:

```python
assert len(df) > 0, "Empty output — upstream issue?"
assert df['amount'].between(0, 1_000_000).all(), "Suspicious amounts"
assert df['user_id'].notna().all(), "Null user IDs"
```

Cheap, readable, catches the obvious stuff.

## The real lesson

The checklist isn't the point. Building the habit of asking "what could go wrong here?" before you push is the point. The checklist just makes that habit frictionless.

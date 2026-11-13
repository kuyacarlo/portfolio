# Original brief: kuyacarlo.dev redesign

This is the original redesign brief, retained for historical design context. The implementation has since changed and the companion `ISSUES.md`, `reference/`, and supplied design files are not present in this repository. For current architecture and binding project rules, use the root `AGENTS.md`; for the current open-issue review, see `issue-triage.md`. Where this brief conflicts with current code or `AGENTS.md`, the current contract takes precedence.

Design canvas (owner access): https://claude.ai/artifact/AVh3CMAhMkF5kf7HEDjay3. It has two pages: **Brand** (identity, foundations, components) and **Website** (desktop row and phone row).

---

## 0. Before you write code

1. **State your assumptions in the PR description before building.** The rules in `~/.config/karlo/OPERATIONS.md` and `AGENTS.md` apply: pnpm only, Podman not Docker, signed commits with `git-profile use kuyacarlo` and `git-ssh use kuyacarlo`, one issue → one branch → one PR, test first.
2. **Use the existing kuyacarlo.dev repo and keep its framework.** Do not migrate frameworks. If no repo exists, stop and ask Karlo. Do not pick one yourself.
3. **Keep the routes that exist today.** They are `/`, `/homelab`, `/notes`, `/certs`, `/resume` and `/book`. Add `/notes/[slug]` and a 404. Do not rename anything.
4. **Find out how `/book` works now** (a provider, an embed, or a form) and keep that integration. The booking UI in this design is the visual layer on top of it. If you can't tell, ask.
5. **Values in brackets are placeholders**, such as `[date]` or `[Certificate name]`. Never invent them. Leave them visible and list them in your PR. See §9.

## 1. What this brand is (read this, it decides judgment calls)

- **Brutalist, black and white, one honest system.** Karlo describes himself as "real and prim". No gradients, shadows, blur, rounded corners, pills or decorative icons. Every region is a cell with a 2px black rule.
- **The idea is "the stack", and it is never spelled out.** Karlo works across six layers: 01 silicon, 02 firmware, 03 network, 04 server, 05 app, 06 people. The staircase mark, the numbered layer lists and the coverage strips carry that idea. **Never add copy that explains it** ("full stack", "six layers", a legend titled "coverage"). Subtlety is the point.
- **The voice is first person, direct and plain.** Decide, then show the work. One joke at most, never filler.
- **Emphasis means inversion**, a black block with white text. It is the only highlight. Blue (`--link`) means "this is a link" and nothing else.

## 2. Design tokens

Use the tokens in `tokens.css` (also `tokens.json`). Never hard-code the raw values in components.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#000000` | Text, rules, inverted fills |
| `--paper` | `#FFFFFF` | Page ground |
| `--surface` | `#F2F2F2` | Code blocks, active row in the phone menu |
| `--muted` | `#666666` | Metadata only: dates, captions, column headings (5.7:1 on white) |
| `--link` | `#0000EE` | Inline links only |
| `--rule` | `2px solid var(--ink)` | Every border |
| `--radius` | `0` | Everywhere |
| `--font-display` | Red Hat Display 400–900 | Headings, buttons, project names |
| `--font-text` | Red Hat Text 400–700 | Body |
| `--font-mono` | Red Hat Mono 400–700 | Labels, nav, dates, code, layer numbers |
| `--space-1…6` | 8 / 16 / 24 / 32 / 48 / 64 | All spacing. Pick from the list. |
| `--gutter` | 24px desktop, 16px phone | Side padding inside cells |
| `--container` | 1440px | Max width, with a `--rule` on the left and right |

### Type scale

| Token | Desktop | Phone (<768) | Notes |
|---|---|---|---|
| `type-page-title` | Display 900, `clamp(56px, 9vw, 136px)` / 0.85, −0.04em, caps | 56px | Notes, Certs, "andromeda" |
| `type-hero` | Display 900, `clamp(44px, 7vw, 104px)` / 0.9, −0.035em | 46px | Home hero, contact, resume name, 404 |
| `type-article-title` | Display 900, `clamp(40px, 6vw, 88px)` / 0.92 | 36px | Note page |
| `type-section` | Display 900, 40px, −0.02em, caps | 28px | "01 Selected work", "What runs" |
| `type-card` | Display 800, 22–34px | 18–20px | Project, note and incident titles |
| `type-lead` | Text 400, 19–22px / 1.5 | 16px | Intro paragraphs |
| `type-body` | Text 400, 16–17px / 1.6 | 15–16px / 1.55 | |
| `type-article` | Text 400, 18px / 1.7, max 720px wide | 16px / 1.65 | Note body |
| `type-label` | Mono 500–700, 12–13px, caps, +0.04em | 11–12px | Eyebrows, status, legends |
| `type-code` | Mono 400, 15px / 1.7 on `--surface` | 14px | `overflow-x: auto`, no wrapping |

The font stylesheet is one Google Fonts request (see `tokens.css`). Self-host the fonts if the repo already self-hosts anything.

## 3. Layout and breakpoints

| Range | Behavior |
|---|---|
| ≥1024 | Desktop layout as drawn at 1440. The container is centered, with rules on both sides. |
| 768–1023 | Desktop layout. Side-by-side regions wrap (they are built on flex-wrap with min widths). |
| <768 | **Phone patterns (§5).** Phone is its own layout, not the desktop page squeezed down. |

- **Desktop header** is 64px: mark + `kuyacarlo` | nav (homelab, notes, certs, resume) | black "LET'S TALK" button → `/book`. The current page's nav item is inverted and carries `aria-current="page"`.
- **Two-column regions** (hero + side panel, list + stats) use `flex-wrap`. The main column is `flex: 999 1 560px`, the side column `flex: 1 1 320–380px`.
- **At phone width, never show a desktop side panel stacked under its content.** Each one has its own phone treatment in §5.

## 4. Components

The original component source files are not included in this repository; use the current implementation and `AGENTS.md` for shipped behavior.

| Component | Variants / props | Behavior and notes |
|---|---|---|
| `Mark` | `size`, `missingStep?` | A six-step staircase on a 6×6 grid in `--ink`, `shape-rendering="crispEdges"`. `missingStep=4` gives the 404 version: step 4 is a dashed outline. Decorative (`aria-hidden`) except on the 404, where it is `role="img"` with a label. |
| `SiteHeader` | `current` | Desktop: 64px, as above. Phone: 56px, mark + name on the left and a MENU button (88px wide, mono caps) on the right. |
| `MobileMenu` | `open` | The panel opens below the header and pushes content down; it is not an overlay. It has 64px rows in Display 800 24px, the current row on `--surface`, and a last row in black: "LET'S TALK →". The button label reads MENU or CLOSE, with `aria-expanded`. Esc closes it and focus returns to the button. |
| `Button` | `primary` (ink fill), `secondary` (2px outline), `on-ink` (white fill / white outline) | Height 48 desktop, 48–52 phone; Display 800 caps 15px. Hover and focus: primary and secondary swap fill and text. Never rounded. |
| `TextLink` | | `--link`, always underlined. Hover: `--ink`. |
| `Tag` | | Mono 13px in a 2px box. Joined groups share borders (`border-left: 0` after the first). |
| `StatusLabel` | SHIPPED (inverted), BUILDING (outline), HACKATHON (dashed outline), ARCHIVED (muted + strikethrough) | **Status is text, never color.** |
| `LayerBadge` | `n` (01–06) | A black square with a white mono number: 56–72px desktop, 48px phone. |
| `CoverageStrip` | `layers: number[]` | Six equal cells with 2px rules between them; filled = `--ink`. 216×48 in desktop tables, full width × 14px on phone cards. **No legend or heading anywhere.** For accessibility give it `role="img"` and `aria-label="Layers: server, app"`, built from the layer names. |
| `ProjectRow` | desktop row / phone card | Desktop: name (Display 800 22) · one-line description · CoverageStrip · links (source / live / homelab). Phone: name and link on one line, description, strip along the bottom edge. |
| `ResultRow` | `podium` | Podium rows are inverted. Columns: result (mono caps) · project (Display 800) · event. |
| `StatPair` | | "8 competitions / 2 podiums". The second cell is inverted. Display 900 numerals: 120px desktop, 64px phone. |
| `SpecSheet` | | A `<dl>`. Desktop: a column of rows with a 132px mono label cell. Phone: a 2-column grid of cells. |
| `IncidentRow` | | Title · symptom → cause → fix paragraph · "read note" link. Phone: the title plus an arrow, and the whole row is a link. |
| `LayerFilter` | | A toggle-button row, `all` + 01–06, with `aria-pressed`. The selected button is inverted. Phone: a single row that scrolls sideways. |
| `NoteListItem` | | Date (mono, muted) · title + dek · CoverageStrip. The whole row is one link. |
| `CodeBlock` | | `--surface` with a 2px rule, mono 15 / 1.7, scrolls sideways. |
| `Footer` | | © line on the left; the tagline "Iterate fast, think deep, ship meaning." on the right. |

**Interaction states, everywhere:**
- **Focus:** `outline: 2px solid var(--ink); outline-offset: 2px`. On inverted surfaces, use a `--paper` outline.
- **Pressed or selected:** inverted.
- **Disabled:** `--muted` text, dashed border, `cursor: not-allowed`.
- **Touch targets:** at least 44px.
- **Motion:** none. No transitions or animations. State changes are instant (brutalist, and nothing to handle for reduced motion).

## 5. Pages

The original page reference markup is not included in this repository. Treat the following page descriptions as historical intent and follow `AGENTS.md` for current behavior.

### `/` Home
- **Hero:** an availability badge (outlined, mono caps: "Available — hackathon teams, data and DevOps roles"), the `type-hero` headline **"Solder, servers, and the people in between."**, a bio paragraph, and two buttons (See the work / Resume). The right column is the six layers as rows, each a `LayerBadge` + name. That column has no heading.
- **01 Selected work:** a table with a column-heading row (project / what it is / 01–06 / links). Rows come from `content/projects.json`.
- **02 Hackathons:** the result list with podiums first and inverted, plus a `StatPair` on the right. Rows come from `content/hackathons.json`.
- **03 Now:** four cells (Building / Learning / Exploring / Open for), from `content/now.json`.
- **04 Contact:** an inverted section with the `type-hero` line "Pick one. I'll reply.", a Book a call button (white), a Send an email button (white outline), and social links.
- **Phone:**
  - The layers become a 3×2 grid of 44px cells.
  - **Show only the projects marked `featuredOnPhone` (4) and the 2 podiums.** Under each list is a full-width toggle: "SHOW ALL 10 PROJECTS" / "SHOW ALL 8 COMPETITIONS", which switches to "SHOW FEWER" when open. Lists expand in place, with `aria-expanded` on the toggle.
  - Now becomes a 2×2 grid. Contact buttons go full width.

### `/homelab`
- **Hero:** "homelab" eyebrow, page title "ANDROMEDA", one paragraph. A `SpecSheet` on the right.
- **What runs:** one row per layer (05, 04, 03), each a `LayerBadge` followed by a grid of service cells (name + one line).
- **What broke:** `IncidentRow`s, each linking to its note.
- **Phone:** the spec sheet becomes a 2×3 grid. Each layer row becomes a badge plus a comma list of service names (no cards). Incidents are title-only link rows.
- **Never publish** hostnames, ports, internal URLs, IPs or container counts. Public links are limited to `forge.kuyacarlo.dev`.

### `/notes`
- **Hero:** page title "NOTES" and the line "Things I broke, fixed, or figured out. Written so the next person, usually me, doesn't have to start from zero."
- **Filter:** a `LayerFilter` that filters the list on the client. Mirror the selected layer in the URL (`?layer=4`) so filtered views can be shared.
- **List:** `NoteListItem`s, newest first.
- **Empty state:** "Nothing at this layer yet." in mono, in its own cell.
- The current project contract does not include an RSS feed.
- **Phone:** the filter scrolls sideways. List items drop the dek: date, title, then the strip.

### `/notes/[slug]`
- **Notes are Markdown/MDX files** with this frontmatter: `title`, `dek`, `date`, `layers: number[]`, `tags: string[]`. Reading time is computed, not written in.
- **Order:** a breadcrumb (`notes / slug`), the title, the dek as `type-lead`, then a joined `Tag` row: date · read time · layer (inverted) · tags.
- **Body:** a sticky-free "on this page" list on the left, built from the h2s; the article on the right, max 720px. Under the article: a two-cell prev/next, with next inverted. The footer has an "edit on forge" link.
- **Phone:** drop the contents list, set the article in `type-article` phone size, and stack prev/next.
- **First note:** `content/notes/disk-full-with-free-space.md` is in this folder, written from the design. Keep its facts as they are. Its date is still a placeholder.

### `/resume`
- **Hero:** name in `type-hero`, one-line positioning. The right column is an inverted "DOWNLOAD PDF" block plus links.
- **Sections:** Experience (`ResumeEntry`: org / role / dates on the left, bullets on the right), then Education and Podiums side by side, then Skills grouped by `LayerBadge` 06 down to 01.
- **Content** comes from `content/resume.json`.
- **Phone:** everything stacks in one column, Download PDF goes full width, and each experience entry shows at most 2 bullets with a "more" toggle.

### `/certs`
- **Hero:** page title "CERTS" and the line "Each one links to the issuer, so you don't have to take my word for it."
- **Grid:** auto-fill columns, min 320px wide. Each card: a top bar with layer and year, then name and issuer, then a bottom "verify" link to the issuer's verification page.
- **All six cards are placeholders.** Karlo has to supply real certs (§9). Render only the entries that have a `verifyUrl`, and show no empty slots.
- **Phone:** one column. Cards get shorter, with name, issuer and year on two lines.

### `/book`
- **Hero:** "Pick one. I'll reply." and "Three choices and your email. Times are in Manila, UTC+8."
- **Desktop:** three columns.
  1. **What about** (one choice): Hackathon team / Data or DevOps role / Collaboration / Just talk shop.
  2. **How long** (15 / 30 min), then **when**: a 3×3 grid of slots.
  3. **You:** name, email, one optional line of context, a live summary line, then the inverted "BOOK IT" button.
- **States:**
  - "Book it" is disabled until a slot is picked.
  - Show the email error inline, under the field, in mono.
  - On success the form is replaced by an inverted block: "See you then." + the summary + a "CHANGE IT" button.
  - If no slots are open: "No open times this week — email me instead." with the email link.
- **Slots come from the real booking backend** (see §0.4). Never hard-code times.
- **Phone:** the steps stack in order. Reasons are full-width rows, lengths are 2 columns, slots are 3 columns, and the button is full width and stays after the form.

### 404
- **Content:** "error 404" eyebrow, `type-hero` "This page was never committed.", the line "The link is wrong, or I moved something and didn't leave a redirect. Either way, it's on me.", and buttons for Home and Notes. The `Mark` with `missingStep=4` sits on the right.
- **Phone:** the mark drops below the text at 160px.

## 6. Content and data

The content files are in `content/`. Treat them as the source of truth and render from them; don't copy text into components.

| File | Shape |
|---|---|
| `layers.json` | `[{n, name}]` for 01–06 |
| `projects.json` | `name, description, layers[], links{source?, live?, internal?}, featuredOnPhone` |
| `hackathons.json` | `result, project, event, podium` |
| `now.json` | `building, learning, exploring, openFor` |
| `homelab.json` | `spec[]`, `services{layer: [{name, note}]}`, `incidents[{title, summary, slug}]` |
| `resume.json` | `experience[], education, skills{layer: string}` |
| `certs.json` | Empty array. Waiting on Karlo. |
| `notes/*.md` | Frontmatter as described in §5 |

**The project layer values in `projects.json` are design guesses.** Do not "correct" them on your own; they are flagged for Karlo in §9.

## 7. Accessibility checklist

- One `<h1>` per page. Headings in order, with section titles as `<h2>`.
- A skip link as the first focusable element, visible on focus, going to `<main>`.
- Nav has `aria-label="Main"`, and the current page carries `aria-current="page"`.
- Toggles (menu, filter, show-all, booking choices) are real `<button>`s with `aria-pressed` or `aria-expanded`. No clickable divs.
- `CoverageStrip` has `role="img"` and a label built from the layer names. The decorative mark is `aria-hidden`.
- Form fields have visible `<label>`s, `autocomplete` (name, email), and errors linked with `aria-describedby`.
- Contrast: ink on paper and paper on ink are both 21:1, and muted on paper is 5.7:1. Don't introduce greys lighter than `--muted` for text.
- After a filter changes, the list region is `aria-live="polite"`.

## 8. Tests (write them first)

- Unit:
  - The layer filter returns the right notes, and the empty state shows.
  - The CoverageStrip label text matches its layers.
  - The phone featured-project list shows exactly the featured items.
- End to end (Playwright, at 1440×900 and 390×844):
  - Every nav link resolves, and the 404 renders for an unknown path.
  - The phone menu opens and closes, and closes on Esc.
  - "Show all" expands and collapses.
  - Book: Book it is disabled until a slot is picked, then the confirmation renders.
  - **No horizontal page scroll at 390px** (`document.documentElement.scrollWidth === 390`).
- Accessibility: run axe on every route at both widths, with zero serious or critical violations.

## 9. Open items for Karlo (do not guess these)

1. **GitHub handle:** the live site shows `kuyacarlo`, but `kuya-carlo` is the primary account. Which goes in the social links?
2. **Certs:** the actual list (name, issuer, year, verify URL, layer).
3. **Resume:** start dates for each role. What the PyTorch chapter and CompSciety roles involve. Whether Millia Labs goes on the public resume.
4. **Tremor Pen:** add it to Selected work as the hardware entry (layers 01 + 02)? The Silicon column on Home is empty without it.
5. **Project layer values:** confirm the guesses in `projects.json`.
6. **Booking:** the provider or backend behind `/book`, the available hours, and the contact email.
7. **Note dates** for the first and later posts.

## 10. Out of scope

- Brand-only boards (identity specimen, type specimen): those are references, not pages.
- Dark mode. The brand is black on white by design.
- Any analytics or third-party script not already on the site.

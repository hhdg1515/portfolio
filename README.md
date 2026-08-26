# Clark Huang — Portfolio

**[clarkhuang.vercel.app](https://clarkhuang.vercel.app)**

Freelance product design and full-stack development. This repository is the source of the portfolio site itself.

The site is deliberately built the way it argues work should be built: a written design specification first, then a direct implementation of it. There is no build step — the HTML and CSS in this repository are the artifact that ships.

## Stack

Static HTML, CSS and vanilla JavaScript. No framework, no bundler, no build pipeline. The only dependency is Node, and only to run a local preview server and the site check — neither is required to serve the site.

- `server.mjs` — zero-dependency static preview server, Node built-ins only
- `scripts/check-site.mjs` — pre-publish validation, no external packages

## Running locally

```bash
npm run dev      # preview at http://localhost:8080
npm run check    # validate before publishing
```

`npm run check` enforces three things across every HTML file:

1. **Heading structure** — exactly one `h1`, at least one `h2`
2. **Local link integrity** — every non-external `href` and `src` resolves to a file that exists
3. **Claim guards** — specific superseded claims are blocked from reappearing in the markup

The third is the unusual one. Statements that were once on the site and have since been corrected are listed in the checker by exact string. If a rewrite reintroduces one, the check fails. Accuracy about my own work is treated as a build constraint rather than a matter of memory.

It also verifies every page's share card: that the Open Graph tags are present, that `og:image` is an absolute URL pointing at a file that actually exists, and that `og:url` and the canonical link agree.

## Share cards

Every page carries its own Open Graph card, so a link posted into LinkedIn, Slack or a message thread previews as the work rather than as a bare URL.

The cards are built from the site's own design language rather than drawn separately — same near-black ground, same bloom photograph, same type scale. Two sources generate them:

- `scripts/og-card.html` — the homepage card: name, positioning, and three project covers bleeding off the bottom edge
- `scripts/og-project-card.html` — the case study card, driven by query parameters (`?title=&eyebrow=&cover=`)

Both are rendered headlessly at 1200×630 and written to `assets/images/og/`. Regenerate them after changing the positioning copy or the projects shown on the homepage.

**When the domain changes**, the absolute URLs in all eight pages have to change with it:

```bash
grep -rl "clarkhuang.vercel.app" index.html projects/ \
  | xargs sed -i "s|clarkhuang.vercel.app|YOUR-DOMAIN|g"
npm run check
```

## Structure

```
index.html              Positioning and project discovery
projects/*.html         Seven case studies
assets/css/main.css     Design system implementation
assets/js/              Per-page behaviour, loaded only where needed
assets/images/          Covers, UI captures, diagrams
DESIGN.md               Design tokens and component specification
PRODUCT.md              Audience, purpose and operating context
```

## Design system

`assets/css/main.css` is the coded implementation of a written specification, and its section comments cite that specification by number. The constraints it holds are intentional and enforced throughout:

- The only border radius in the entire site is the `999px` pill on call-to-action buttons; everything else is square
- Zero `box-shadow` site-wide — depth comes from `text-shadow` and gradient masks
- Transitions are limited to CTAs, the work accordion, and explicitly documented loops
- The 8px offset between navigation inset (80px) and content inset (88px) is part of the specification, not a mistake
- Three near-white grey values are kept as separate tokens and never collapsed into one

Type is Jost at weight 200 with wide letter-spacing, paired with Cormorant Garamond for project titles. The palette is near-black (`#060605`) throughout; colour enters through photography rather than through the interface.

## Project status vocabulary

Case studies distinguish what was designed from what was built and from what is running. These words are used precisely and mean the same thing on every page:

| Term | Meaning |
| --- | --- |
| `exploration` / `concept` | Researched or designed; not necessarily built |
| `built` | Implemented; not necessarily delivered |
| `shipped` | Delivered to a real user environment |
| `live` / `production` | Currently accessible or operating |

Observations about a client's current product are dated, and are never used to reconstruct what that client was reasoning about at the time.

## Notes

The two UX case studies remain `noindex` until their original visual evidence has been selected. Empty screenshot placeholders are not added in the meantime — the exports go in when they are ready.

Interview preparation material and rejected cover concepts are kept locally and excluded from this repository; see `.gitignore`.

---

clarkswift1@gmail.com · [LinkedIn](https://www.linkedin.com/in/he-clark-h-b390a212a/)

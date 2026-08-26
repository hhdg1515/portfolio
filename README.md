# Clark Huang Portfolio

Static HTML/CSS portfolio. There is no build step.

## Content layers

- `index.html`: project discovery and positioning
- `projects/*.html`: public scan layer; conclusions and evidence, not interview scripts
- `content/*.md`: private story banks for interview preparation
- `../project-a.md` through `../project-d.md`: code-audit evidence dossiers
- `../design-system.md`: current visual and editorial rules plus decision history

## Project-status language

- `exploration` / `concept`: researched or designed; not necessarily built
- `built`: implemented; not necessarily delivered
- `shipped`: delivered to a real user environment
- `live` / `production`: currently accessible or operating; include a checked date when relevant

Current-product observations must be dated and must not be used to invent the client&rsquo;s earlier reasoning.

## Local review

```powershell
npm run check
npm run dev
```

The two UX case studies intentionally remain `noindex` until their original visual evidence has been selected. Do not add visible empty screenshot placeholders; add the actual exports when ready.


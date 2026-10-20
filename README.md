# ssmein.github.io

Personal portfolio for Sai Soum Mein — civil engineer working in data analytics.

React + Vite + TypeScript + Tailwind v4, deployed to GitHub Pages.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # typechecks, then builds to dist/
npm run preview  # serve the built site
```

## Where the content lives

All text, roles, projects and credentials are in `src/content.ts`. Editing that
file is how you update the site — the components read from it and nothing is
hardcoded in markup.

- `profile` — name, location, email, social links
- `intro` — the paragraphs under "Now"
- `spans` — the career plot in the hero. Years are decimal, so November 2020 is
  `2020.83`. Add a span here and it appears in the chart.
- `projects`, `roles`, `skillGroups`, `education`, `certifications`, `courses`

## Design notes

- Two typefaces: Archivo for display and anything numeric (it has tabular
  figures, used via the `.nums` class), Source Serif 4 for body text.
- The palette is in the `@theme` block in `src/index.css`: cool paper, blue-black
  ink, and two track colours — ochre for site work, survey green for data work.
  The hero chart is the only place both appear together.
- One piece of non-interactive motion only: the career plot draws itself once on
  load, and is disabled under `prefers-reduced-motion`.

## Images

Project images are imported from `src/assets/images` so Vite fingerprints them.
Export them as WebP at no more than ~1400px wide before committing — the
originals were 900KB PNGs, which dominated page weight. Any tool works; `sharp`
one-liner:

```bash
npx sharp-cli -i input.png -o output.webp resize 1400 --format webp --quality 82
```

## Certificates

PDFs in `public/certificates/` are served at `/certificates/<name>.pdf` and
linked from the `courses` entries in `src/content.ts`. The filename in
`content.ts` must match the file on disk exactly.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`.

Because this is a user site (`<username>.github.io`), GitHub does not allow
Pages to be switched off. To take the site offline, point Pages at the empty
`pages-offline` branch (Settings → Pages → Source) and the site serves a 404. To
put it back, set the source to GitHub Actions and re-enable the deploy workflow.

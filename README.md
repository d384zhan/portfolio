# dawang.tech

Personal site. Next.js (App Router), no CSS framework, one typeface
(Newsreader).

```bash
npm install
npm run dev   # http://localhost:3000
npm run build
npm run lint
```

## Where things live

- `src/content.ts` holds every word on the site: bio, roles, projects, links,
  and the photo. Edit content there, not in the components.
- `src/app/page.tsx` is the home card; `src/app/work/page.tsx` is the same card
  with every role. `src/components/Card.tsx` has the parts they share.
- `src/app/globals.css` has the design tokens at the top (color, type, space,
  motion) and the grid below them.
- `src/lib/site.ts` holds the canonical URL, the search description and the
  structured data. `src/app/opengraph-image.tsx` builds the link preview.

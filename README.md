# Nairobi Central Hardware — concept website

A responsive catalogue and email-enquiry prototype built with Vite and vanilla JavaScript. The uploaded WordPress export has been reviewed and its published catalogue imported: 478 category/product entries across 19 categories. The live website and media downloads remain inaccessible from this environment. The current design is a modern reinterpretation requested after the original-theme reconstruction: vermilion accents, warm neutral surfaces, bold typography, and locally rendered SVG hardware illustrations. Published business content and catalogue data remain intact. See `docs/design-update.md`.

## Develop

Use Node.js 22.12+ (validated on Node 24). From `/workspace/nch-website`:

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

## Validate

```sh
npm run build
npm test
```

Browser tests use Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` to your Chromium executable elsewhere. Tests cover desktop and mobile filtering, product details, persisted enquiry lists, email message preparation, downloading, and viewport overflow. They do not send email.

## Content and launch

- `src/products.json` contains the imported catalogue; `src/catalogue.js` contains contact data. These entries are product types or ranges, not individual SKUs or live stock records. Original spelling is preserved; three identical entries within the same category were deduplicated.
- The supplied Gmail address remains the enquiry destination. The old Contact page lists `sales.nchl@gmail.com` for sales; the user's supplied address takes precedence.
- Published telephone numbers and the Ruaraka address are included. WhatsApp support and opening hours are not confirmed.
- Email enquiries open the visitor's email application; there is no backend or delivery confirmation. Copy and download alternatives are available.
- The XML contains media references but not image files. `docs/media-manifest.json` records 90 references. No product photographs or original logos were downloaded. The hero illustration is decorative.
- The company history and Fortune, Titan, and Cobra brand names come from published pages in the export.
- See `docs/content-review.md` for remaining migration work. Draft policies, private pages, author metadata, plugin settings, and customer data are not imported into the application.
- To repeat catalogue extraction: `python scripts/import-wordpress.py /path/to/export.xml`. The original XML is kept outside the repository.
- The preview deliberately contains a `noindex, nofollow` robots directive. Remove it when approved for public launch.
- Typography uses system fonts. The main pages use local SVG illustrations and text brand names; they do not require WordPress images or Google Fonts.
- `npm run build` outputs a static site in `dist/`. It has not been deployed. The current WordPress website and domain are unchanged.

Use the existing checkout for future tasks; cloud tasks are already isolated and do not need a separate Git worktree unless requested.

The original Home, Products, Contact, Blog, Careers and published article paths are available. `public/_redirects` enables Netlify to serve these routes on direct navigation. Original media references are retained in the import files for future use, but the main-page design does not depend on those files.

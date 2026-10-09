# Precision Polymers — standalone portfolio

Serve or publish this directory as the website root. `index.html` is the entry point. All pages, fonts, photos, CSS and JavaScript are local. No build step, Python, FastAPI, Jinja2, database, API or environment variables are required to run the site.

## Local preview

Open `index.html` directly, or serve this directory with any static HTTP server. For example, with Node.js installed:

```powershell
cd "D:\Portfolio demo\Precision Polymers\cloudflare-site"
npx --yes serve . --listen 8080
```

Open `http://localhost:8080`. The preview command downloads the `serve` development tool; it is not a website dependency. An editor's static-server extension works too. Do not enable an SPA fallback: these are separate HTML pages.

Check the catalogue search, family/category filters, sort and reset; try an empty search result, refresh a filtered URL, open product details and related materials, use the mobile menu and Escape, and open an enquiry email draft. Without JavaScript, all products and navigation remain available; interactive filters are hidden.

## Cloudflare Pages deployment

Publish only this directory, never the repository root.

- Direct Upload: create a Pages project using static asset upload and upload the contents of `cloudflare-site/` (or a ZIP with `index.html` at its root).
- Git integration: select the repository, choose no framework, leave the build command empty and set the build output directory to `cloudflare-site` relative to the repository root. If a non-empty build command is required, use `exit 0`.
- No Functions, Worker, database bindings or secrets are needed. `_headers` sets a restrictive content policy and basic security headers on Pages.
- After publishing, open the homepage, `/products.html`, a product detail page and `/contact.html` directly. Verify fonts/images, filters, mobile navigation and email links. Pages may normalize `.html` URLs; the flat relative paths also work on ordinary static hosting and beneath a subdirectory.

Deployment is not performed by creating these files. The existing FastAPI service and its deployment configuration are unchanged.

Deployment reference: [Cloudflare's static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

## Content and contact details

The 10 products and their specifications are copied from `app/data/products.json`; packaging/minimum-order examples follow `app/cli.py`. The original project explicitly labels these as illustrative, fictional portfolio data. Those disclosures are retained. No certifications, customers, statistics, facilities or verified supplier capabilities are claimed.

Per the requested sample contact, email links use `hello@precisionpolymers.example`. This reserved example-domain address does **not** receive messages. Links open an email client; they do not submit to a server. Before using this for a real business, replace this address in **all HTML files**, update the sample-contact explanations, and verify the actual business/product information. Product email links include the material name, SKU and grade.

Edit each static product page and its matching catalogue/homepage cards to change product information. There is no automatic connection to future FastAPI or database changes. Catalogue filtering reads public card attributes; update `data-name`, `data-material`, `data-category` and `data-search` along with visible copy.

## Assets and attribution

The original navy/blue design, wordmark, self-hosted fonts and public reference photos are reused. CSS asset paths have been made relative; `site.css` and `site.js` add the static layout and interactions. Only required 800px WebP photos are copied. Image metadata comes from `app/data/image_credits.json`. `credits.html` preserves authors, original source links, licences and conversion/cropping notes. Font licences are in `assets/fonts/`. Keep these credits and licences when redistributing.

There are no admin pages, private uploads, credentials, `.env` files, database dumps or server-side form submissions in this directory. No analytics, external font requests, cookies or browser storage are used. Image/licence source links are ordinary outgoing links, not runtime dependencies.

## Validation performed

- Parsed all 15 HTML pages and checked local links, fragment targets, image paths and CSS/font references; no Jinja directives remain.
- Checked all pages in Chromium at widths of 320, 390, 768, 1024 and 1440 pixels: no horizontal overflow or broken images.
- Exercised search, family/category filters, sorting, query persistence after reload, empty results, reset, mobile menu, Escape and product email drafts.
- Verified the catalogue and mobile navigation with JavaScript disabled.
- Checked interactions with the shipped Content Security Policy applied: no browser console errors or HTTP failures.
- Visually reviewed the desktop homepage and mobile layout. JavaScript syntax validation passed.

These are local checks, not a live Cloudflare deployment test. Image attribution links were retained from the source metadata; external link availability was not exhaustively tested.

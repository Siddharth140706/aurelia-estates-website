# Aurelia Estates — Real Estate Website Concept

Portfolio Website #2 for an AI Website Studio. A fully fictional, premium residential real estate concept website built using only HTML, CSS and vanilla JavaScript.

**Important:** Aurelia Estates is a fictional brand. All residences, locations associated with individual homes, prices, copy, and visual associations are illustrative. The photos depict unrelated buildings/interiors. No property is for sale through this demo, and the inquiry form never sends, stores or emails information.

## V2 changes
- Sticky header with correct anchor offsets and active-section nav state
- Responsive `srcset`/`sizes`, width/height (no layout shift), hero image preload, working image fallback for every image including the property dialog
- Inline "Clear filters" control, extra "Up to ₹5 Cr" price band so every sample home is reachable
- Form: optional phone field, stricter email check, static `aria-describedby`, demo-mode badge, fields cleared after the demo confirmation
- Darker small-text colors, 44px touch targets, visible focus rings on light and dark sections, scrollable modal on short screens
- `_headers` (Cloudflare Pages): security headers and a Content-Security-Policy. Remove or edit it if you add new external hosts.
- Not added: `og:image` (needs an absolute deployed URL), structured data (fictional business)

## Files
- `index.html` — accessible markup, sample properties and inquiry form
- `styles.css` — responsive editorial layouts, design system, mobile states
- `script.js` — responsive menu, type/city/price filtering, property details dialog and demo form validation
- `_headers` — optional Cloudflare Pages security headers
- `assets/favicon.svg` — original custom SVG favicon
- `assets/architecture-fallback.svg` — original locally bundled architectural illustration shown if remote photographs are unavailable

## Run locally
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Open `index.html` in Chrome, or use your local Live Server extension.
4. You need internet access for the **Unsplash photographs** and optional Google fonts. The code itself works offline; without internet, the website shows a local architectural illustration in place of the external photographs.

## Features to test
- Desktop navigation and mobile menu (including Escape and outside click)
- Filters: **All / Villas / Apartments**, **city**, and **maximum price**; zero-results / reset button
- Property detail dialogs, close button, Escape key, and enquiry CTA that preselects a residence
- Demo inquiry form invalid/valid states (nothing is submitted)
- Accessibility focus and 320/375/768/1024/1440 pixel widths

## Publish on Cloudflare Pages through GitHub
1. Create a new GitHub repository named `aurelia-estates-demo`.
2. Add files to the repo root; `index.html` must be in the root.
3. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
4. Select this GitHub repository and choose **No framework**.
5. Use a build command of `exit 0` (or leave unset where supported), and output directory `.`.
6. Deploy and inspect your own `*.pages.dev` URL. It is NOT live until you deploy it yourself.

## Photos & usage
External images used from `images.unsplash.com` as editorial sample imagery. See [Unsplash License](https://unsplash.com/license). Unsplash permits broad free commercial use, but be sure to confirm any third-party rights or property releases for client projects, and replace sample images with images licensed for the actual client's website. Photographs are not photos of the named properties; the concept does not imply that they are.

Image URLs (photo IDs) used:
- `photo-1600585154340-be6161a56a0c`
- `photo-1600607687939-ce8a6c25118c`
- `photo-1600596542815-ffad4c1539a9`
- `photo-1600585152915-d208bec867a1`
- `photo-1600607688969-a5bfcd646154`
- `photo-1600566753086-00f18fb6b3ea`

## Before converting to a real customer website
Replace the fictional brand, all sample properties, amounts, text, photographs and contact details with verified client-provided information. Confirm image rights, real-estate advertising obligations (including relevant RERA requirements), legal pages, accessibility, web performance, privacy, hosting responsibility and reliable form handling. The demo form is intentionally nonfunctional for lead delivery. Do not launch it as a real sales website until those pieces are complete.

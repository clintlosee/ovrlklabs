# OVRLK Labs — landing page

Plain HTML/CSS/JS landing page for ovrlklabs.com. No build step, no dependencies.

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```bash
npx serve .
```

## Deploy to Cloudflare Pages

**Option A — Git integration (recommended)**
1. Push this folder to a GitHub repo.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git.
3. Select the repo. Build settings:
   - Framework preset: `None`
   - Build command: (leave blank)
   - Build output directory: `/`
4. Deploy. Add `ovrlklabs.com` and `www.ovrlklabs.com` as custom domains once the first deploy succeeds.

**Option B — Direct upload with Wrangler**
```bash
npm install -g wrangler
wrangler pages deploy . --project-name=ovrlklabs
```

## Structure

- `index.html` — page markup and copy
- `styles.css` — all styling, tokens defined at the top under `:root`
- `script.js` — sets the footer year, no other JS on the page

## Notes

- Contact address is `hello@ovrlklabs.com`, set as a `mailto:` link in two places (`index.html`).
- Copy is placeholder, written to be swapped out easily. Look for the `.eyebrow`, `<h1>`, and `.sub` content in `index.html`.
- As new products/subdomains come online, this page is meant to stay a lightweight index, link out rather than absorb their content.

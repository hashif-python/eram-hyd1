# ERAM Hydraulics V2

Premium React + Vite + Tailwind CSS redesign for ERAM Hydraulics.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Deploy

Upload the generated `dist/` directory to any static hosting provider. For SPA routing on Nginx/Apache/Vercel/Netlify, configure all unknown routes to return `index.html`.

## Notes

- Pages: Home, About, Products, Services, Gallery, Contact.
- Gallery uses actual image URLs from the current ERAM Hydraulics website.
- The contact form deliberately does not show a false success state. Connect `Contact.jsx` to an approved backend/API endpoint before enabling online submission.
- `/public/logos/eram-mark.svg` is a packaged fallback wordmark because the original binary logo asset was not included in the provided prompt attachment. If the official logo exists in the older project, replace this file while keeping the same filename.
- Product relationship/agency names beyond the distributors explicitly stated on the existing public website should be verified before publishing.

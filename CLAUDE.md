# CLAUDE.md

- This is an Astro site deployed to Cloudflare Workers via `@astrojs/cloudflare`.
- Deploy with `npm run deploy`. Dev server with `npm run dev`.
- Worker name is `weston-pub` (not `weston.pub`) — wrangler requires dashes, no dots.
- Pages live in `src/pages/` (file-based routing). Static assets in `public/`.
- The site is SSR by default (Cloudflare Workers). Prerender individual pages with `export const prerender = true`.

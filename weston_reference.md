# weston.pub — Project Notes

## Quick Reference

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run preview` | Build + local preview via wrangler dev |
| `npx wrangler login` | Authenticate wrangler CLI (one-time) |

## How It's Set Up

- **Framework:** Astro (minimal template, strict TypeScript)
- **Hosting:** Cloudflare Workers (not Pages — we use the `@astrojs/cloudflare` adapter)
- **Deploy method:** `npm run deploy` runs `astro build` then `wrangler deploy`
- **Repo:** github.com/westonkelliher/weston.pub, `master` branch

### Cloudflare

- **Worker name:** `weston-pub` (dots aren't allowed in worker names, hence the dash)
- **Custom domain:** `weston.pub` — configured as a custom domain on the `weston-pub` worker in the Cloudflare dashboard
- **Workers URL:** `https://weston-pub.westonkelliher.workers.dev`
- **Config file:** `wrangler.jsonc` in project root
- **Bindings (auto-added by @astrojs/cloudflare):**
  - `SESSION` — KV namespace (for Astro sessions)
  - `IMAGES` — Cloudflare Images
  - `ASSETS` — static assets from `dist/client`
- **Build on push:** Cloudflare can auto-build on push, but the deploy command from `package.json` (`npx wrangler deploy`) is what it runs. You can also deploy manually from your machine with `npm run deploy`.

### Astro

- **Config:** `astro.config.mjs` — just sets the Cloudflare adapter
- **Pages:** `src/pages/` — file-based routing. `index.astro` is the homepage.
- **Layouts:** Create `src/layouts/` when you need shared page shells
- **Components:** Create `src/components/` for reusable UI
- **Static files:** `public/` — served as-is (currently has favicon files)
- **Output mode:** Server (SSR via Cloudflare Workers), but pages can be prerendered with `export const prerender = true` in frontmatter
- **TypeScript:** Strict mode (`tsconfig.json` extends `astro/tsconfigs/strict`)
- **Add integrations:** `npx astro add <name>` (e.g. `npx astro add tailwind`)

## File Structure

```
weston.pub/
├── src/
│   └── pages/
│       └── index.astro        # Homepage ("coming soon" placeholder)
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── astro.config.mjs           # Astro config (Cloudflare adapter)
├── wrangler.jsonc              # Cloudflare Workers config
├── package.json
└── tsconfig.json
```

## Gotchas

- The `package.json` name is `weston-pub` (not `weston.pub`) because wrangler requires alphanumeric + dashes only.
- First deploy from a new machine requires `npx wrangler login`.
- DNS propagation for custom domains can take a few minutes after setup.

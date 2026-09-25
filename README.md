# URVEO Website

Production website for [urveo.sk](https://urveo.sk), built with React, Vite, and Cloudflare Workers + Assets.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

The production build is written to `dist/`.

## Project structure

- `src/` — React website and the interactive D•ART showcase
- `public/` — static assets, fonts, SEO files, and security headers
- `worker/` — Cloudflare Worker, contact form API, Turnstile verification, rate limiting, and email delivery
- `wrangler.jsonc` — Cloudflare deployment configuration
- `concept-01.html` and `src/concepts/concept-01/` — separate VAYREN concept; do not change unless explicitly requested
- `URVEO_KONTEXT_PRE_LOKALNY_CODEX_2026-09-25.md` — operational context and rules for Codex

## Deployment safety

The production branch is `repair/production-candidate-20260903`.

Do not assume that a commit or push is deployed. Always treat these as separate states:

1. local repository,
2. GitHub branch,
3. live Cloudflare production.

Do not commit, push, or deploy without explicit approval. Before any change, check the current branch, `HEAD`, and working tree. After a code change, review the diff and run lint and the production build.

Secrets must remain outside Git. `.env.production`, `.dev.vars`, `.wrangler/`, `node_modules/`, and `dist/` are ignored.

# Andrew Oakeson

Public one-page site for hiring managers. Static HTML built with Astro.

## Commands

```sh
npm install
npm run dev
npm run build
npm run deploy
```

`npm run dev` starts the local site. `npm run build` writes static HTML to `dist/`. `npm run deploy` builds, then deploys with Wrangler.

The custom domain andrewoakeson.com is attached in Cloudflare.

`/api/ask` is a Worker route. The Claude key is a Worker secret named `ANTHROPIC_API_KEY`, set with `npx wrangler secret put ANTHROPIC_API_KEY`. Do not put that key in wrangler.jsonc or in git.

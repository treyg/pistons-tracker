## Stons Center

Detroit Pistons web app for news, roster, stats and live scores.
Live at [stonscenter.com](https://stonscenter.com).

One Cloudflare Worker serves the whole thing:

- `client/` — Vite + React + Tailwind SPA, served as static assets.
- `worker/` — the API and an hourly cron. The cron pulls Pistons news from
  Google News RSS and ESPN's team feed (merged; Google throttles Cloudflare
  some hours), the roster from nba.com (ESPN as fallback), attaches per-game
  stats from ESPN, and stores two JSON blobs in KV.
  `/api/news` and `/api/roster` read them back. Schedules and live scores
  come from ESPN straight from the browser.

Everything runs on the Cloudflare free tier.

### Develop

```
npm install
npm --prefix client install
npm run build          # builds client/dist
npm run dev            # Worker + static assets on http://localhost:8787
```

`npm run dev` runs with `--test-scheduled`, so you can fire the cron by hand:

```
curl 'http://localhost:8787/__scheduled?cron=0+*+*+*+*'
curl http://localhost:8787/api/status
```

For hot reload on the client, run `npm run dev` in `client/` in a second
terminal. Vite proxies `/api` to the Worker on 8787.

### Deploy

Pushes to `master` deploy through Workers Builds (Cloudflare's Git
integration). Build command `npm run build`, deploy command
`npx wrangler deploy`. To deploy by hand:

```
npm run deploy
```

### Check it is healthy

```
curl https://stonscenter.com/api/status
```

Shows the last cron run and whether each job succeeded.

### Run the cron by hand

```
curl -X POST -H "Authorization: Bearer $REFRESH_TOKEN" https://stonscenter.com/api/refresh
```

`REFRESH_TOKEN` is a Worker secret (`wrangler secret put REFRESH_TOKEN`).
For local dev put it in `.dev.vars`.

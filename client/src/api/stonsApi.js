// Reads the hourly snapshots the Worker cron stores in KV.
// Same origin in production; in `vite` dev the /api proxy in vite.config.js
// forwards to `wrangler dev` on 8787.

const getJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.json();
};

/** { articles: [...], fetchedAt } */
export const getStonsNews = () => getJson("/api/news");

/** { players: [...], source, season, fetchedAt } */
export const getStonsRoster = () => getJson("/api/roster");

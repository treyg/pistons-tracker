import { fetchNews, type NewsPayload } from "./news";
import { fetchRoster } from "./roster";

// KV keys. Each holds one JSON blob.
const KEY_NEWS = "news";
const KEY_ROSTER = "roster";
const KEY_STATUS = "status";

interface JobResult {
  ok: boolean;
  error?: string;
  finishedAt: string;
}

interface Status {
  lastRun: string;
  news: JobResult;
  roster: JobResult;
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300",
};

function json(body: unknown, status = 200, headers: Record<string, string> = JSON_HEADERS): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

function log(event: string, fields: Record<string, unknown> = {}): void {
  console.log(JSON.stringify({ event, ...fields }));
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    // POST /api/refresh runs the cron job now. Needs the REFRESH_TOKEN secret
    // as a bearer token. Handy after a deploy or when checking a feed.
    if (url.pathname === "/api/refresh") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { ...JSON_HEADERS, Allow: "POST" });
      if (!(await isAuthorized(request, env))) return json({ error: "Unauthorized" }, 401, { ...JSON_HEADERS, "Cache-Control": "no-store" });
      const status = await refreshAll(env, "manual");
      return json(status, 200, { ...JSON_HEADERS, "Cache-Control": "no-store" });
    }

    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405, { ...JSON_HEADERS, Allow: "GET" });
    }

    switch (url.pathname) {
      case "/api/news":
      case "/api/roster": {
        const key = url.pathname === "/api/news" ? KEY_NEWS : KEY_ROSTER;
        const body = await env.PISTONS_KV.get(key, "text");
        if (body === null) return json({ error: "No data yet" }, 503, { ...JSON_HEADERS, "Cache-Control": "no-store" });
        return new Response(body, { headers: JSON_HEADERS });
      }
      case "/api/status": {
        const body = await env.PISTONS_KV.get(KEY_STATUS, "text");
        return new Response(body ?? "null", { headers: { ...JSON_HEADERS, "Cache-Control": "no-store" } });
      }
      case "/api/health":
        return json({ status: "ok", timestamp: new Date().toISOString() }, 200, { ...JSON_HEADERS, "Cache-Control": "no-store" });
      default:
        return json({ error: "Not found" }, 404);
    }
  },

  async scheduled(controller, env, ctx): Promise<void> {
    ctx.waitUntil(refreshAll(env, controller.cron));
  },
} satisfies ExportedHandler<Env>;

async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  const expected = env.REFRESH_TOKEN;
  const given = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || !given) return false;
  const enc = new TextEncoder();
  const a = enc.encode(expected);
  const b = enc.encode(given);
  if (a.byteLength !== b.byteLength) return false;
  return crypto.subtle.timingSafeEqual(a, b);
}

/** Refresh news and roster in parallel. One failing does not block the other. */
async function refreshAll(env: Env, trigger: string): Promise<Status> {
  const started = Date.now();
  const previousNews = await env.PISTONS_KV.get<NewsPayload>(KEY_NEWS, "json");
  const [news, roster] = await Promise.all([
    runJob("news", () => fetchNews(previousNews?.articles ?? []), (v) => env.PISTONS_KV.put(KEY_NEWS, JSON.stringify(v))),
    runJob("roster", () => fetchRoster(), (v) => env.PISTONS_KV.put(KEY_ROSTER, JSON.stringify(v))),
  ]);
  const status: Status = { lastRun: new Date().toISOString(), news, roster };
  await env.PISTONS_KV.put(KEY_STATUS, JSON.stringify(status));
  log("refresh.done", { trigger, ms: Date.now() - started, news: news.ok, roster: roster.ok });
  return status;
}

async function runJob<T>(name: string, produce: () => Promise<T>, store: (value: T) => Promise<void>): Promise<JobResult> {
  const started = Date.now();
  try {
    const value = await produce();
    await store(value);
    log(`${name}.ok`, { ms: Date.now() - started });
    return { ok: true, finishedAt: new Date().toISOString() };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(JSON.stringify({ event: `${name}.failed`, error, ms: Date.now() - started }));
    return { ok: false, error, finishedAt: new Date().toISOString() };
  }
}

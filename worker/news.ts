import { fetchJson, fetchText, stripTags, tagText } from "./text";

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
  description: string;
  image: string | null;
}

export interface NewsPayload {
  articles: Article[];
  /** Which feeds answered this run. */
  sources: string[];
  fetchedAt: string;
}

const MAX_ARTICLES = 12;

// Google News aggregates every outlet but throttles Cloudflare's shared
// egress IPs, so it answers 503 some hours. ESPN's team feed always answers
// and carries images, but has fewer items. We pull both and merge; the run
// fails only if both do.
const GOOGLE_RSS_URL = "https://news.google.com/rss/search?q=detroit+pistons&hl=en-US&gl=US&ceid=US:en";
const ESPN_NEWS_URL = "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/news?team=8&limit=25";

/**
 * `previous` is the last stored article list. It is merged in so that when
 * one feed fails this hour, its articles from last hour stay until newer
 * ones push them out.
 */
export async function fetchNews(previous: Article[] = []): Promise<NewsPayload> {
  const feeds: { name: string; run: () => Promise<Article[]> }[] = [
    { name: "google", run: fetchGoogleNews },
    { name: "espn", run: fetchEspnNews },
  ];
  const results = await Promise.allSettled(feeds.map((f) => f.run()));

  const sources: string[] = [];
  const merged = new Map<string, Article>();
  results.forEach((r, i) => {
    const name = feeds[i].name;
    if (r.status === "rejected") {
      console.warn(JSON.stringify({ event: "news.feed_failed", feed: name, error: String(r.reason) }));
      return;
    }
    sources.push(name);
    for (const a of r.value) if (!merged.has(a.url)) merged.set(a.url, a);
  });

  if (sources.length === 0) {
    const errors = results.map((r) => (r.status === "rejected" ? String(r.reason) : "")).filter(Boolean);
    throw new Error(`All news feeds failed: ${errors.join(" | ")}`);
  }
  for (const a of previous) if (!merged.has(a.url)) merged.set(a.url, a);

  const articles = [...merged.values()]
    .sort((a, b) => Date.parse(b.publishedAt ?? "") - Date.parse(a.publishedAt ?? ""))
    .slice(0, MAX_ARTICLES);

  return { articles, sources, fetchedAt: new Date().toISOString() };
}

// --- Google News RSS ------------------------------------------------------

async function fetchGoogleNews(): Promise<Article[]> {
  const xml = await fetchText(GOOGLE_RSS_URL);
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const articles = items.map(parseRssItem).filter((a): a is Article => a !== null);
  if (articles.length === 0) throw new Error("Google News RSS returned no items");
  return articles;
}

function parseRssItem(item: string): Article | null {
  const url = tagText(item, "link") ?? "";
  if (!url) return null;

  const source = tagText(item, "source") ?? "Unknown";
  // Google appends " - Source" to every headline. The card already shows the
  // source on its own line, so drop the suffix.
  let title = tagText(item, "title") ?? "Untitled";
  if (title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3)).trim();

  const pubDate = tagText(item, "pubDate");
  const publishedAt = pubDate && !Number.isNaN(Date.parse(pubDate)) ? new Date(pubDate).toISOString() : null;

  // Google's description is HTML: "<a>title</a>&nbsp;&nbsp;source". It may
  // also embed an <img>. Keep the image, and drop text that only repeats
  // the title and source.
  const rawDesc = tagText(item, "description") ?? "";
  const image = /<img[^>]+src=["']([^"']+)["']/i.exec(rawDesc)?.[1] ?? null;
  let description = stripTags(rawDesc);
  if (description.startsWith(title)) description = description.slice(title.length).trim();
  if (description.endsWith(source)) description = description.slice(0, -source.length).trim();
  if (description === source) description = "";

  return { id: url, title, url, source, publishedAt, description, image };
}

// --- ESPN team news ---------------------------------------------------------

interface EspnArticle {
  id?: number | string;
  headline?: string;
  description?: string;
  published?: string;
  premium?: boolean;
  byline?: string;
  images?: { url?: string }[];
  links?: { web?: { href?: string } };
}

async function fetchEspnNews(): Promise<Article[]> {
  const data = await fetchJson<{ articles?: EspnArticle[] }>(ESPN_NEWS_URL);
  const articles = (data.articles ?? [])
    .filter((a) => !a.premium && a.links?.web?.href && a.headline)
    .map((a): Article => {
      const url = a.links!.web!.href!;
      return {
        id: url,
        title: a.headline!,
        url,
        source: a.byline ? `ESPN · ${a.byline}` : "ESPN",
        publishedAt: a.published && !Number.isNaN(Date.parse(a.published)) ? new Date(a.published).toISOString() : null,
        description: a.description ?? "",
        image: a.images?.[0]?.url ?? null,
      };
    });
  if (articles.length === 0) throw new Error("ESPN news returned no articles");
  return articles;
}

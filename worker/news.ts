import { fetchText, stripTags, tagText } from "./text";

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
  fetchedAt: string;
}

const RSS_URL = "https://news.google.com/rss/search?q=detroit+pistons&hl=en-US&gl=US&ceid=US:en";
const MAX_ARTICLES = 10;

/** Fetch the Google News RSS feed and return the ten newest articles. */
export async function fetchNews(): Promise<NewsPayload> {
  const xml = await fetchText(RSS_URL);
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  if (items.length === 0) throw new Error("Google News RSS returned no items");

  const articles = items
    .map(parseItem)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => Date.parse(b.publishedAt ?? "") - Date.parse(a.publishedAt ?? ""))
    .slice(0, MAX_ARTICLES);

  if (articles.length === 0) throw new Error("No valid articles after parsing");
  return { articles, fetchedAt: new Date().toISOString() };
}

function parseItem(item: string): Article | null {
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

// Small text helpers. No DOM parser exists in Workers, and the two feeds we
// read are simple enough that regex plus entity decoding is all we need.

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/** Decode the HTML/XML entities that show up in RSS text. */
export function decodeEntities(input: string): string {
  return input.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, body: string) => {
    if (body[0] === "#") {
      const code =
        body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match;
  });
}

/** Turn an HTML fragment into plain text: drop tags, decode entities, collapse whitespace. */
export function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ""))
    .replace(/[\s\u00a0]+/g, " ")
    .trim();
}

/** Return the text inside the first `<tag>…</tag>` in `xml`, or null. */
export function tagText(xml: string, tag: string): string | null {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
  const m = re.exec(xml);
  if (!m) return null;
  let body = m[1].trim();
  const cdata = /^<!\[CDATA\[([\s\S]*?)\]\]>$/.exec(body);
  if (cdata) body = cdata[1];
  return decodeEntities(body);
}

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/** Fetch with a browser User-Agent and a timeout. Throws on non-2xx. */
export async function fetchText(url: string, timeoutMs = 15000, extraHeaders: Record<string, string> = {}): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": BROWSER_UA, ...extraHeaders },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.text();
}

export async function fetchJson<T>(url: string, timeoutMs = 15000): Promise<T> {
  const text = await fetchText(url, timeoutMs, { Accept: "application/json" });
  return JSON.parse(text) as T;
}

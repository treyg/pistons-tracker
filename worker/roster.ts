import { fetchJson, fetchText } from "./text";

export interface PlayerStats {
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  fg_pct: number; // 0..1
  fg3_pct: number; // 0..1
  ft_pct: number; // 0..1
  fg3m: number;
}

export interface Player {
  name: string;
  number: string;
  position: string;
  height: string;
  weight: string;
  age: number | null;
  experience: string;
  country: string;
  headshot: string;
  stats: PlayerStats;
}

export interface RosterPayload {
  players: Player[];
  source: "nba.com" | "espn";
  season: number;
  fetchedAt: string;
}

const NBA_ROSTER_URL = "https://www.nba.com/pistons/roster";
const ESPN_ROSTER_URL = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/8/roster";
const ESPN_TEAM_ID = "8";

const EMPTY_STATS: PlayerStats = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fg_pct: 0, fg3_pct: 0, ft_pct: 0, fg3m: 0 };

/**
 * ESPN labels a season by the year it starts: 2025 means 2025-26.
 * The regular season starts in October, so before that we still want the
 * season that just ended.
 */
export function currentSeason(now = new Date()): number {
  const year = now.getUTCFullYear();
  return now.getUTCMonth() >= 9 ? year : year - 1;
}

/** Fetch the roster, with ESPN as a fallback when nba.com fails, then attach per-game stats. */
export async function fetchRoster(): Promise<RosterPayload> {
  const season = currentSeason();
  let players: Omit<Player, "stats">[];
  let source: RosterPayload["source"];
  try {
    players = await rosterFromNba();
    source = "nba.com";
  } catch (err) {
    console.warn(JSON.stringify({ event: "roster.nba_failed", error: String(err) }));
    players = await rosterFromEspn();
    source = "espn";
  }

  let stats = new Map<string, PlayerStats>();
  try {
    stats = await statsFromEspn(season);
  } catch (err) {
    console.warn(JSON.stringify({ event: "roster.stats_failed", error: String(err) }));
  }

  return {
    players: players.map((p) => ({ ...p, stats: stats.get(normalizeName(p.name)) ?? EMPTY_STATS })),
    source,
    season,
    fetchedAt: new Date().toISOString(),
  };
}

// --- nba.com -------------------------------------------------------------

interface NbaPlayer {
  id: number;
  name: string;
  number?: string;
  position?: string;
  height?: string;
  weight?: string;
  age?: number;
  experience?: string;
  country?: string;
}

async function rosterFromNba(): Promise<Omit<Player, "stats">[]> {
  const html = await fetchText(NBA_ROSTER_URL, 15000, {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
  });
  const m = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/.exec(html);
  if (!m) throw new Error("nba.com: no __NEXT_DATA__ script");

  const data = JSON.parse(m[1]) as { props?: { pageProps?: { rosterData?: { roster?: NbaPlayer[] } } } };
  const roster = data.props?.pageProps?.rosterData?.roster;
  if (!Array.isArray(roster) || roster.length === 0) throw new Error("nba.com: roster missing from __NEXT_DATA__");

  return roster.map((p) => ({
    name: p.name,
    number: p.number ?? "",
    position: p.position ?? "",
    height: p.height ?? "",
    weight: p.weight ?? "",
    age: p.age ?? null,
    experience: p.experience ?? "",
    country: p.country ?? "",
    headshot: `https://cdn.nba.com/headshots/nba/latest/1040x760/${p.id}.png`,
  }));
}

// --- ESPN roster (fallback) ----------------------------------------------

interface EspnAthlete {
  displayName: string;
  jersey?: string;
  position?: { abbreviation?: string; displayName?: string };
  displayHeight?: string;
  displayWeight?: string;
  age?: number;
  experience?: { years?: number };
  birthPlace?: { country?: string };
  headshot?: { href?: string };
}

async function rosterFromEspn(): Promise<Omit<Player, "stats">[]> {
  const data = await fetchJson<{ athletes?: EspnAthlete[] }>(ESPN_ROSTER_URL);
  const athletes = data.athletes;
  if (!Array.isArray(athletes) || athletes.length === 0) throw new Error("espn: roster empty");

  return athletes.map((a) => ({
    name: a.displayName,
    number: a.jersey ?? "",
    position: a.position?.displayName ?? a.position?.abbreviation ?? "",
    height: a.displayHeight ?? "",
    weight: (a.displayWeight ?? "").replace(/\s*lbs$/, ""),
    age: a.age ?? null,
    experience: a.experience?.years != null ? String(a.experience.years) : "",
    country: a.birthPlace?.country ?? "",
    headshot: a.headshot?.href ?? "",
  }));
}

// --- ESPN per-game stats ---------------------------------------------------

interface EspnStatsResponse {
  categories?: { name: string; names: string[] }[];
  athletes?: {
    athlete: { displayName: string; teamId?: string };
    categories?: { name: string; totals: string[] }[];
  }[];
  pagination?: { pages?: number };
}

function statsUrl(season: number, page: number): string {
  const q = new URLSearchParams({
    region: "us",
    lang: "en",
    contentorigin: "espn",
    isqualified: "false",
    limit: "1000",
    page: String(page),
    season: String(season),
    seasontype: "2",
  });
  return `https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?${q}`;
}

/**
 * Returns a map of normalized player name to per-game stats for every
 * player in the league. We match by name rather than team so a player who
 * signed this offseason still shows last season's numbers. If two rows
 * share a name, the Pistons row wins. Values are looked up by column name,
 * because ESPN's column order has bitten this project before.
 */
async function statsFromEspn(season: number): Promise<Map<string, PlayerStats>> {
  const out = new Map<string, PlayerStats>();
  let page = 1;
  let pages = 1;
  do {
    const data = await fetchJson<EspnStatsResponse>(statsUrl(season, page));
    const columns = new Map((data.categories ?? []).map((c) => [c.name, c.names]));
    pages = data.pagination?.pages ?? 1;

    for (const row of data.athletes ?? []) {
      const key = normalizeName(row.athlete.displayName);
      const isPistons = row.athlete.teamId === ESPN_TEAM_ID;
      if (out.has(key) && !isPistons) continue;
      const get = (category: string, stat: string, scale = 1): number => {
        const idx = columns.get(category)?.indexOf(stat) ?? -1;
        const totals = row.categories?.find((c) => c.name === category)?.totals;
        const v = idx >= 0 && totals ? parseFloat(totals[idx]) : NaN;
        return Number.isFinite(v) ? Math.round(v * scale * 1000) / 1000 : 0;
      };
      out.set(key, {
        pts: get("offensive", "avgPoints"),
        reb: get("general", "avgRebounds"),
        ast: get("offensive", "avgAssists"),
        stl: get("defensive", "avgSteals"),
        blk: get("defensive", "avgBlocks"),
        fg_pct: get("offensive", "fieldGoalPct", 0.01),
        fg3_pct: get("offensive", "threePointFieldGoalPct", 0.01),
        ft_pct: get("offensive", "freeThrowPct", 0.01),
        fg3m: get("offensive", "avgThreePointFieldGoalsMade"),
      });
    }
    page += 1;
  } while (page <= pages);
  return out;
}

/** nba.com and ESPN spell a few names differently (accents, suffixes, periods). */
function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/\s+(jr|sr|ii|iii|iv)$/i, "")
    .trim();
}

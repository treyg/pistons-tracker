// Full Pistons schedule from ESPN, shaped for LastFive.
// The Worker used to proxy this; the browser can call ESPN directly, as the
// other api/ modules already do.

const SCHEDULE_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/det/schedule";

const shortName = (team) => team.displayName.replace("Detroit Pistons", "Pistons");

const getStonsGames = async () => {
  try {
    const response = await fetch(SCHEDULE_URL);
    if (!response.ok) throw new Error(`ESPN returned ${response.status}`);
    const espn = await response.json();
    if (!espn?.events) throw new Error("ESPN schedule has no events");

    const games = espn.events.map((event) => {
      const competition = event.competitions[0];
      const home = competition.competitors.find((c) => c.homeAway === "home");
      const away = competition.competitors.find((c) => c.homeAway === "away");
      return {
        id: event.id,
        date: event.date,
        status: competition.status.type.description,
        home_team: { id: home.id, name: shortName(home.team) },
        visitor_team: { id: away.id, name: shortName(away.team) },
        home_team_score: parseInt(home.score?.value || 0),
        visitor_team_score: parseInt(away.score?.value || 0),
      };
    });

    return { data: games };
  } catch (error) {
    console.error("Failed to fetch Pistons games:", error);
    return null;
  }
};

export default getStonsGames;

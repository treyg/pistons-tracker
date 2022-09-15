
const getLeagueGames = async () => {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`);
    const data = await response.json();
    return data;
}

export default getLeagueGames;

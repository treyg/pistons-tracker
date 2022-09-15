
const getStonsData = async () => {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/8`);
    const data = await response.json();
    return data;
}

export default getStonsData;
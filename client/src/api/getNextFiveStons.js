

const getNextFiveStons = async () => {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/08/schedule`);
    const data = await response.json();
    return data;
}

export default getNextFiveStons;

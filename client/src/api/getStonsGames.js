// if its before jan 1st the current year is the current year, if its after jan 1st the current year the current year - 1
const currentSeason = new Date().getMonth() < 0 ? new Date().getFullYear() : new Date().getFullYear() - 1;

const getStonsGames = async () => {
    const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=9&per_page=82`);
    const data = await response.json();
    return data;
}

export default getStonsGames;


const currentSeason = () => {
    if (new Date().getMonth() <= 9 || new Date().getMonth() >= 9 && new Date().getMonth() < 12) {
        return new Date().getFullYear() - 1;
    }
    return new Date().getFullYear();
}



const getStonsGames = async () => {
    const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=${currentSeason}&team_ids[]=9&per_page=82`);
    const data = await response.json();
    return data;
}

export default getStonsGames;

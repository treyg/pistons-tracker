const currentSeason = () => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  if (
    //nba starts in october and ends in june
    currentDate >= new Date(`${currentYear}-10-14`) &&
    currentDate <= new Date(`${currentYear + 1}-06-14`)
  ) {
    return currentYear;
  } else {
    return currentYear - 1;
  }
};

const getStonsGames = async () => {
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/games?seasons[]=${currentSeason()}&team_ids[]=9&per_page=82`
  );
  const data = await response.json();
  return data;
};

export default getStonsGames;

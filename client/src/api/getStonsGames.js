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
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/games?seasons[]=${currentSeason()}&team_ids[]=9&per_page=82`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export default getStonsGames;

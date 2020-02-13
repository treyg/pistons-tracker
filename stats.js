const PISTONS_STATS = 'https://www.balldontlie.io/api/v1/stats?seasons=[]2019&player_ids[]=19&per_page=100'
//'https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=10&player_ids[]=20'
//'https://www.balldontlie.io/api/v1/players?year=[]2019?per_page=100'


  fetch(PISTONS_STATS)
  .then((response) => {
    return response.json();
  })
  .then((statsJSON) => {
    //Set the JSON data for games to a variable
    const stats = statsJSON
    console.log(stats)

//     const sortedStats = stats.sort((a, b) =>
//     a.team.city > b.team.city ? 1 : -1
//   );

//   console.log(sortedStats)
 
//   const filteredStats = sortedStats.filter(players => {
//     return players.team.city.includes('Detroit')
//   })
// console.table(filteredStats)

  })
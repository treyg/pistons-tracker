const PISTONS_STATS = 'https://www.balldontlie.io/api/v1/players?search=trey'

//'https://www.balldontlie.io/api/v1/stats?seasons=[]2019&player_ids[]=1&per_page=100'

  fetch(PISTONS_STATS)
  .then((response) => {
    return response.json();
  })
  .then((statsJSON) => {
    //Set the JSON data for games to a variable
    const stats = statsJSON.data
    console.log(stats)

    const pistonsStats = stats.filter(all => all.team.id === 9)
        console.log(pistonsStats)
  });
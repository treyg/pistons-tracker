const currentSeason = () => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  if (
    currentDate >= new Date(`${currentYear}-10-14`) &&
    currentDate <= new Date(`${currentYear + 1}-06-14`)
  ) {
    return currentYear + 1;
  } else {
    return currentYear;
  }
};

console.log('Current season:', currentSeason());

fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/det/schedule?season=${currentSeason()}`)
  .then(res => res.json())
  .then(data => {
    console.log('ESPN Response:', data);
    console.log('Events count:', data.events?.length);
    
    const games = data.events.map(event => {
      const competition = event.competitions[0];
      const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
      const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
      
      return {
        id: event.id,
        date: event.date,
        status: competition.status.type.description,
        home_team: {
          id: homeTeam.id,
          name: homeTeam.team.displayName.replace('Detroit Pistons', 'Pistons'),
        },
        visitor_team: {
          id: awayTeam.id,
          name: awayTeam.team.displayName.replace('Detroit Pistons', 'Pistons'),
        },
        home_team_score: parseInt(homeTeam.score?.value || 0),
        visitor_team_score: parseInt(awayTeam.score?.value || 0),
      };
    });
    
    console.log('Transformed games:', games);
    const finishedGames = games.filter(game => game.status === 'Final');
    console.log('Finished games:', finishedGames.length);
    console.log('First 5 finished:', finishedGames.slice(0, 5));
  })
  .catch(err => console.error('Error:', err));

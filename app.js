

  const PISTONS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/8'

  fetch(PISTONS_URL)
  .then((response) => {
    return response.json();
  })
  .then((pistonsJSON) => {
    //Set the JSON data for games to a variable
    const pistonsData = pistonsJSON.team
    
    
    const nextGame = pistonsData.nextEvent
    const competitors = nextGame[0].competitions[0].competitors 
   
    // Run function to check for a live game and hide the game preview if the game is live or completed
    const checkForLiveGame = () => {
      if (nextGame[0].competitions[0].status.type.description === 'Final') {
        let preview = document.getElementById('preview')
            preview.style.display = 'none'
      }
    }
    checkForLiveGame()

    //create function to show upcoming or current game
    const showNextGameData = () => {
      //let startTime = document.getElementById('startTime')
      let startDate = document.getElementById('startDate')
          startDate.textContent = dayjs(nextGame[0].competitions[0].date).format('dddd h:mm')
      
      //Set home team div to display home team name
      let homeTeamDiv = document.getElementById('homeTeamDiv')
          homeTeamDiv.textContent = competitors[0].team.shortDisplayName
      //create img element using home teams logo and append to home team div
      let homeTeamLogo = document.getElementById('homeTeamLogo')
          homeTeamLogo.src = competitors[0].team.logos[0].href
      //Set home team score
      let homeTeamScore = document.getElementById('homeTeamScore')
          homeTeamScore.textContent = nextGame[0].competitions[0].boxscoreAvailable
          if (homeTeamScore.textContent = 'false') {
              homeTeamScore.textContent = '00'
          }
           
      //Set quarter and clock
      let quarter = document.getElementById('quarter')
          quarter.textContent = nextGame[0].competitions[0].status.period
      let remainingTime = document.getElementById('remainingTime')
          remainingTime.textContent = nextGame[0].competitions[0].status.displayClock

      //Hide time remaining if game hasn't started yet
        if (quarter.textContent = '0') {
          quarter.textContent = ""
        }
                   
      //Set visitor team div to display visitor team name
      let visitorTeamDiv = document.getElementById('visitorTeamDiv')
          visitorTeamDiv.textContent = competitors[1].team.shortDisplayName
      let visitorTeamLogo = document.getElementById('visitorTeamLogo')
          visitorTeamLogo.src = `${competitors[1].team.logos[0].href}`

      //Set visitor score
      let visitorTeamScore = document.getElementById('visitorTeamScore')
          visitorTeamScore.textContent = nextGame[0].competitions[0].boxscoreAvailable
          if (visitorTeamScore.textContent = 'false') {
            visitorTeamScore.textContent = '00'
          } 

          if (nextGame[0].competitions[0].status.type.description) {
              let preview = document.getElementById('preview')
              preview.style.display = 'none'
          }
        
    }

    showNextGameData()
    

  });
  




  const PISTONS_GAMES_URL = 'https://www.balldontlie.io/api/v1/games?seasons[]=2019&team_ids[]=9&per_page=82'

  fetch(PISTONS_GAMES_URL)
  .then((response) => {
    return response.json();
  })
  .then((stonsGamesJSON) => {
    //Set the JSON data for games to a variable
    const stonsGamesData = stonsGamesJSON.data

    //Sort pistons games to be in  order starting at beginning of the season
    const sortedStonsGames = stonsGamesData.sort((a,b) => a.id > b.id ? 1 : -1)
    //console.log(sortedStonsGames)

    //Show pistons game that have already been played and reverse the order to show the most recent game first
    const completedTenStonsGames = sortedStonsGames.reverse().filter(games => games.status == 'Final')
    //console.log(completedTenStonsGames)

    const latestGame = () => {
      let homeTeamSection = document.getElementById('homeTeamSection')
          homeTeamSection.textContent = `${completedTenStonsGames[0].home_team.name} ${completedTenStonsGames[0].home_team_score}`
    }

    latestGame()

  });




  const SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'

  fetch(SCOREBOARD_URL)
  .then((response) => {
    return response.json();
  })
  .then((scoreboardJSON) => {
    //Set the JSON data for games to a variable
    const scoreboardData = scoreboardJSON
    const livePistonsGame = scoreboardData.events.filter(games => games.shortName.includes('DET'))
    console.log(livePistonsGame)

    //get live score and time for current game
    const showCurrentGame = () => {

      let todaysGameStatus = document.getElementById('todaysGameStatus')

      //Check if game is live or finished 
        if(livePistonsGame[0].status.type.name === 'STATUS_IN_PROGRESS') {
            todaysGameStatus.textContent = 'LIVE NOW'
            todaysGameStatus.classList.add = 'text-red-600'
        } else if (livePistonsGame[0].status.type.completed === true) {
            todaysGameStatus.textContent = 'FINAL'
         } 

      let liveHomeTeamLogo = document.getElementById('liveHomeTeamLogo')
          liveHomeTeamLogo.src = livePistonsGame[0].competitions[0].competitors[0].team.logo
      let liveHomeTeamDiv = document.getElementById('liveHomeTeamDiv')
          liveHomeTeamDiv.textContent = livePistonsGame[0].competitions[0].competitors[0].team.name
      let liveHomeTeamScore = document.getElementById('liveHomeTeamScore')
          liveHomeTeamScore.textContent = `${livePistonsGame[0].competitions[0].competitors[0].score}`

        //Set quarter and clock
      let liveQuarter = document.getElementById('liveQuarter')
          liveQuarter.textContent = livePistonsGame[0].status.period
      let liveRemainingTime = document.getElementById('liveRemainingTime')
          liveRemainingTime.textContent = livePistonsGame[0].status.displayClock

      let liveVisitorTeamLogo = document.getElementById('liveVisitorTeamLogo')
          liveVisitorTeamLogo.src = livePistonsGame[0].competitions[0].competitors[1].team.logo
      let liveVisitorTeamDiv = document.getElementById('liveVisitorTeamDiv')
          liveVisitorTeamDiv.textContent = livePistonsGame[0].competitions[0].competitors[1].team.name
      let liveVisitorTeamScore = document.getElementById('liveVisitorTeamScore')
          liveVisitorTeamScore.textContent = `${livePistonsGame[0].competitions[0].competitors[1].score}`




   
    }

    showCurrentGame()

    
  });
  








  
const NEWS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news'

  fetch(NEWS_URL)
  .then((response) => {
    return response.json();
  })
  .then((newsJSON) => {
    //Set the JSON data for games to a variable
    const newsData = newsJSON.articles
    


    const stonsNews = newsData.filter( el => {
      return el.categories.find(c => c.teamId == 1);
  })
    //console.log(stonsNews)

  });
  
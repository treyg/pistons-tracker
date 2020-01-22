

  //Javascript to toggle the menu
  document.getElementById('nav-toggle').onclick = function(){
    document.getElementById("nav-content").classList.toggle("hidden");
  }
  
  //Get data for info about detroit pistons
  const PISTONS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/8'

  fetch(PISTONS_URL)
  .then((response) => {
    return response.json();
  })
  .then((pistonsJSON) => {
    //Set the JSON data for games to a variable
    const pistonsData = pistonsJSON.team
    //Set variable for next game data
    const nextGame = pistonsData.nextEvent
    const competitors = nextGame[0].competitions[0].competitors 
     console.log(nextGame)
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
        
    }

    showNextGameData()
    

  });
  



// Set data for showing last 10 pistons games
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

    //Show pistons game that have already been played and reverse the order to show the most recent game first
    const completedStonsGames = sortedStonsGames.reverse().filter(games => games.status == 'Final')
  

    const latestGames = () => {
      let gameSections = document.getElementById('gameSections')
  
      for (let i = 0; i < 10; i++) {
        
        let homeTeamSection = document.createElement('div')
            gameSections.appendChild(homeTeamSection)
        let homeName = document.createElement('div')
            homeName.textContent = `${completedStonsGames[i].home_team.name}`
            homeTeamSection.appendChild(homeName)
        let homeScore = document.createElement('span')
            homeScore.textContent = ` ${completedStonsGames[i].home_team_score}`
            homeScore.classList.add('float-right')
            homeName.appendChild(homeScore);
            
            

          let visitorTeamSection = document.createElement('div')
              homeTeamSection.appendChild(visitorTeamSection)
          let visitorName = document.createElement('div')
              visitorName.textContent = `${completedStonsGames[i].visitor_team.name}`
              visitorTeamSection.appendChild(visitorName)
          let visitorScore = document.createElement('span')
              visitorScore.textContent = ` ${completedStonsGames[i].visitor_team_score}`
              //visitorScore.classList.add('inline-flex', 'justify-between', 'border', 'border-2', 'border-black')
              visitorName.appendChild(visitorScore);
              visitorScore.classList.add('float-right')
              visitorTeamSection.classList.add('border-b','border-gray-400', 'pb-2','mb-2')
              //visitorScore.classList.add('inline-flex', )

      }
  }

    latestGames()

  });



// Get data for all NBA scores for the day, then filter to only include pistons games
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

 
    //Check to see if live game array is populated. If so, run function to collect and print data, if not hide currentEventContainer
    if(livePistonsGame.length > 0) {
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

    } else {
        let currentEventContainer = document.getElementById('currentEventContainer')
          currentEventContainer.style.display = 'none'
    }

    
    
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
      return el.categories.find(c => c.teamId == 6);
    })
    console.log(stonsNews)

    const showStonsNews = () => {
      let stonsNewsImage = document.getElementById('stonsNewsImage')
          stonsNewsImage.src = stonsNews[0].images[0].url
      let stonsNewsTitle = document.getElementById('stonsNewsTitle')
          stonsNewsTitle.textContent = stonsNews[0].headline
      let stonsNewsDescription = document.getElementById('stonsNewsDescription')
          stonsNewsDescription.textContent = stonsNews[0].description
      
        }
     showStonsNews()


  });
  


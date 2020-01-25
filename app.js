

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
      if (nextGame[0].competitions[0].status.type.description === 'Final' || nextGame[0].competitions[0].status.type.state == 'in') {
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
    if(livePistonsGame.legth !=0 ) {
      //get live score and time for current game
    const showCurrentGame = () => {

      let currentEventContainer = document.getElementById('currentEventContainer')

      //Check if game is live or finished 
        if(livePistonsGame[0].status.type.name === 'STATUS_IN_PROGRESS') {
            todaysGameStatus.textContent = 'LIVE NOW'
            todaysGameStatus.classList.add = 'text-red-600'
        } else if (livePistonsGame[0].status.type.completed === true) {
            todaysGameStatus.textContent = 'FINAL'
         } else if (livePistonsGame[0].status.type.name === "STATUS_SCHEDULED") {
           currentEventContainer.style.display = 'none'
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



  //news for pistons  - only shows one story and is usually unpopulated
  
// const PISTONS_STATS = 'https://www.balldontlie.io/api/v1/stats?seasons=[]2019&per_page=100'

//   fetch(PISTONS_STATS)
//   .then((response) => {
//     return response.json();
//   })
//   .then((statsJSON) => {
//     //Set the JSON data for games to a variable
//     const stats = statsJSON.data
//     console.table(stats)

  

//   });
  




  // Set data for showing last 5 pistons games
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
  
      for (let i = 0; i < 5; i++) {
        
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
            visitorName.appendChild(visitorScore);
            visitorScore.classList.add('float-right')
            visitorTeamSection.classList.add('border-b','border-gray-400', 'pb-2','mb-2')
            

      }
  }

    latestGames()

  });

  




//news for pistons  - only shows one story and is usually unpopulated
  
// const NEWS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news'

//   fetch(NEWS_URL)
//   .then((response) => {
//     return response.json();
//   })
//   .then((newsJSON) => {
//     //Set the JSON data for games to a variable
//     const newsData = newsJSON.articles
//     console.log(newsData)


//     const stonsNews = newsData.filter(el => {
//        return el.categories.find(c => c.teamId == 8);
//     })

//     console.log(stonsNews)
    

//     const showStonsNews = () => {
    

//           let stonsNewsImage = document.getElementById('stonsNewsImage')
//               stonsNewsImage.src = stonsNews[0].images[0].url
//           let stonsNewsTitle = document.getElementById('stonsNewsTitle')
//               stonsNewsTitle.textContent = stonsNews[0].headline
//           let stonsNewsDescription = document.getElementById('stonsNewsDescription')
//               stonsNewsDescription.textContent = stonsNews[0].description
        
      
//         }

//      showStonsNews()


//   });
  


//const NEWS_URL = 'https://gnews.io/api/v3/search?q=detroit pistons&token=e62be0b1d96ef0fbe18f8039ad5d0a82'

//const api = `21b177ecd55041b2b5174de15bafc241`

const api = '21b177ecd55041b2b5174de15bafc241';
const requestOptions = {
    headers: {
      'Ocp-Apim-Subscription-Key': api,
    },
};

const NEWS_URL = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=pistons'

  fetch(NEWS_URL, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((newsJSON) => {
    //Set the JSON data for games to a variable
    const stonsNews = newsJSON.value
    console.log(stonsNews)

    const showStonsNews = () => {
      let pistonsNewsSection = document.getElementById('pistonsNewsSection')
      
      for (let i = 0; i < 10; i++) {
        
        let imgContainer = document.createElement('div')
        pistonsNewsSection.appendChild(imgContainer)
          imgContainer.classList.add('flex', 'flex-col', 'align-text-middle', 'py-2', 'overflow-hidden', 'mb-6', 'border-2', 'border-gray-200', 'rounded')

          let stonsNewsImage = document.createElement('img')
          stonsNewsImage.src = `${stonsNews[i].image.thumbnail.contentUrl}`
          stonsNewsImage.classList.add('ml-3', 'w-16', 'h-16')
          imgContainer.appendChild(stonsNewsImage)

          let stonsNewsTitle = document.createElement('span')
          stonsNewsTitle.textContent = `${stonsNews[i].name}`
          stonsNewsTitle.classList.add('inline','mx-3', 'font-md', 'text-xl')
          imgContainer.appendChild(stonsNewsTitle)

          let stonsNewsProvider = document.createElement('p')
          stonsNewsProvider.textContent = `${stonsNews[i].provider[0].name} | ${dayjs(stonsNews[i].datePublished).format('dddd MMM DD')}`
          stonsNewsProvider.classList.add('text-xs', 'mx-3', 'text-gray-800', 'pt-1')
          imgContainer.appendChild(stonsNewsProvider)

        //   let stonsNewsDescription = document.createElement('p')
        //   stonsNewsDescription.textContent = `${stonsNews[i].description}`
        //   stonsNewsDescription.classList.add('my-1', 'mx-3', 'text-base') 
        // imgContainer.appendChild(stonsNewsDescription)  
        
          }
  
    }

  showStonsNews()




  });
  



  
  // const showLeagueNews = () => {
    
  //   for (let i = 0; i < 9; i++) {
  //        let stonsNewsImage = document.getElementById('stonsNewsImage')
  //            stonsNewsImage.src = stonsNews[i].images[i].url
  //        let stonsNewsTitle = document.getElementById('stonsNewsTitle')
  //            stonsNewsTitle.textContent = stonsNews[i].headline
  //        let stonsNewsDescription = document.getElementById('stonsNewsDescription')
  //            stonsNewsDescription.textContent = stonsNews[i].description
  //        }
     
  //      }

  //   showLeagueNews()

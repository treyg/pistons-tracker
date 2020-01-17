



// const games = document.getElementById('games')
// const PISTONS_GAMES_URL = 'https://www.balldontlie.io/api/v1/games?seasons[]=2019&dates=[]&team_ids[]=9&per_page=82'
// const nextGameContainer = document.getElementById('nextGameContainer')
// fetch(PISTONS_GAMES_URL)
//   .then((response) => {
//     return response.json();
//   })
//   .then((gamesJSON) => {
//     //Set the JSON data for games to a variable
//     const gameData = gamesJSON.data
//     // console.log(gameData)
//     //Sort games by date so they're in order of game number (starting with 0; game 82 being last of season)
//     const gamesSortedByDate = gameData.sort(function(a, b) {
//       if (a.date > b.date) {
//         return 1
//       } else {
//         return -1
//       }
//     })

//     //filter games to show games that are finsished
//     const finishedGames = gamesSortedByDate.filter(game => game.status.includes("Final"))

//     //filter games to show games that haven't been played(index 0 being the next game)
//     const unfinishedGames = gamesSortedByDate.filter(game => {
//       return !game.status.includes('Final')
//     })

//     //Reverse the unfished games order, the pop() the last to show the next upcoming game
//     const nextGame = unfinishedGames.reverse().pop()

//     //function to create div for home and away team and show each
//     const showNextGame = () => {
//       let hometeamDiv = document.getElementById('homeTeamDiv')
//           hometeamDiv.textContent = `${nextGame.home_team.name}`

//       let startTime = document.getElementById('startTime')
//       let startDate = document.getElementById('startDate')
//           //Format the day and date for next game using dayjs
//           startDate.textContent = dayjs(nextGame.date).add(1, 'day').format('dddd M/DD')
//           startTime.textContent = `${nextGame.status}`
          
//       let visitorteamDiv = document.getElementById('visitorTeamDiv')
//           visitorteamDiv.textContent = `${nextGame.visitor_team.name}`
     
//     }
//     showNextGame()
   
//     // console.table(nextGame)

//   });
 

  const PISTONS_URL = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/8'

  fetch(PISTONS_URL)
  .then((response) => {
    return response.json();
  })
  .then((pistonsJSON) => {
    //Set the JSON data for games to a variable
    const pistonsData = pistonsJSON.team
    console.log(pistonsData)
    
    const nextGame = pistonsData.nextEvent
    console.log(nextGame)

    //create function to show upcoming or current game
    const showNextGameData = () => {
      //let startTime = document.getElementById('startTime')
      let startDate = document.getElementById('startDate')
          startDate.textContent = nextGame[0].competitions[0].status.type.shortDetail
      
      //Set home team div to display home team name
      let homeTeamDiv = document.getElementById('homeTeamDiv')
          homeTeamDiv.textContent = nextGame[0].competitions[0].competitors[0].team.shortDisplayName
      //create img element using home teams logo and append to home team div
      let homeTeamLogo = document.getElementById('homeTeamLogo')
          homeTeamLogo.src = nextGame[0].competitions[0].competitors[0].team.logos[0].href
      
      //Set quarter and clock
      let quarter = document.getElementById('quarter')
          quarter.textContent = nextGame[0].competitions[0].status.period
      let remainingTime = document.getElementById('remainingTime')
          remainingTime.textContent = nextGame[0].competitions[0].status.displayClock

      //Hide time remaining if game hasn't started yet
      let timeLeft = document.getElementById('timeLeft')
        if (quarter.textContent = '0') {
          timeLeft.style.display = 'none'
        } else {

        }
        console.log(quarter.textContent)
        

                    
      //Set visitor team div to display visitor team name
      let visitorTeamDiv = document.getElementById('visitorTeamDiv')
          visitorTeamDiv.textContent = `${nextGame[0].competitions[0].competitors[1].team.shortDisplayName}`
      let visitorTeamLogo = document.getElementById('visitorTeamLogo')
          visitorTeamLogo.src = nextGame[0].competitions[0].competitors[1].team.logos[0].href
    }

    showNextGameData()
    

  });
  






  
// const SCORES_URL = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'

//   fetch(SCORES_URL)
//   .then((response) => {
//     return response.json();
//   })
//   .then((scoresJSON) => {
    //Set the JSON data for games to a variable
    // const scoreData = scoresJSON
    // console.log(scoreData)

    //filter score data for current day to return games that include DET
    // const todaysStonGame = scoreData.events.filter(game => {
    //   return game.shortName.includes('DET')
    // })

    // console.table(todaysStonGame)


    // const todaysGame = () => {
    // let hometeamDiv2 = document.getElementById('homeTeamDiv2')
    //     hometeamDiv2.textContent = `${todaysStonGame}`

    //   let startTime2 = document.getElementById('startTime2')
    //   let startDate2 = document.getElementById('startDate2')
    //       startDate2.textContent = dayjs(nextGame.date).format('MM/DD')
    //       startTime2.textContent = `${nextGame.status}`
          
    //   let visitorteamDiv2 = document.getElementById('visitorTeamDiv')
    //       visitorteamDiv2.textContent = `${nextGame.visitor_team.name}`
    // }


  // });
  
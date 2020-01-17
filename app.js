

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
    console.log(nextGame)

    //create function to show upcoming or current game
    const showNextGameData = () => {
      //let startTime = document.getElementById('startTime')
      let startDate = document.getElementById('startDate')
          startDate.textContent = dayjs(nextGame[0].competitions[0].date).format('dddd h:m')
      
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
      let timeLeft = document.getElementById('timeLeft')
        if (quarter.textContent = '0') {
          quarter.textContent = ""
        }
                   
      //Set visitor team div to display visitor team name
      let visitorTeamDiv = document.getElementById('visitorTeamDiv')
          visitorTeamDiv.textContent = competitors[1].team.shortDisplayName
      let visitorTeamLogo = document.getElementById('visitorTeamLogo')
          visitorTeamLogo.src = competitors[1].team.logos[0].href

      //Set visitor score
      let visitorTeamScore = document.getElementById('visitorTeamScore')
          visitorTeamScore.textContent = nextGame[0].competitions[0].boxscoreAvailable
          if (visitorTeamScore.textContent = 'false') {
            visitorTeamScore.textContent = '00'
          } 
        
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
  
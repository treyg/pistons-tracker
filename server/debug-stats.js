import axios from 'axios'

const TEAM_ID = '1610612765'
const SEASON = '2025-26'

async function debugStats() {
  try {
    const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${SEASON}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=${TEAM_ID}&TwoWay=0&VsConference=&VsDivision=&Weight=`
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json'
      },
      timeout: 10000
    })
    
    const headers = response.data.resultSets[0].headers
    const players = response.data.resultSets[0].rowSet
    
    console.log('\n=== Players from NBA Stats API ===\n')
    players.forEach(player => {
      const name = player[headers.indexOf('PLAYER_NAME')]
      const pts = player[headers.indexOf('PTS')]
      const fg3m = player[headers.indexOf('FG3M')]
      const fg3_pct = player[headers.indexOf('FG3_PCT')]
      console.log(`${name}: ${pts} PTS, ${fg3m} 3PM, ${(fg3_pct * 100).toFixed(1)}% 3P%`)
    })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

debugStats()

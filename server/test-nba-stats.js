import axios from 'axios'

const TEAM_ID = '1610612765' // Detroit Pistons
const SEASON = '2025-26'

async function testNBAStatsAPI() {
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
    
    console.log('Available stat fields:', headers.join(', '))
    console.log('\nSample player (Cade Cunningham):')
    const cade = players.find(p => p[1] === 'Cade Cunningham')
    if (cade) {
      console.log('PTS:', cade[headers.indexOf('PTS')])
      console.log('REB:', cade[headers.indexOf('REB')])
      console.log('AST:', cade[headers.indexOf('AST')])
      console.log('STL:', cade[headers.indexOf('STL')])
      console.log('BLK:', cade[headers.indexOf('BLK')])
      console.log('FG_PCT:', cade[headers.indexOf('FG_PCT')])
      console.log('FG3_PCT:', cade[headers.indexOf('FG3_PCT')])
      console.log('FT_PCT:', cade[headers.indexOf('FT_PCT')])
      console.log('FG3M:', cade[headers.indexOf('FG3M')])
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testNBAStatsAPI()

import axios from 'axios'

async function testESPN() {
  try {
    const url = 'https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=3&sort=offensive.avgPoints:desc&season=2025&seasontype=2'
    
    const response = await axios.get(url)
    const athlete = response.data?.athletes?.[0]
    
    console.log('Full athlete structure:')
    console.log(JSON.stringify(athlete, null, 2).substring(0, 2000))
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testESPN()

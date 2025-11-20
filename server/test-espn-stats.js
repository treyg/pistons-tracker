import axios from 'axios'

async function testESPNStats() {
  try {
    const url = 'https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=10&sort=offensive.avgPoints:desc&season=2025&seasontype=2'
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const athlete = response.data?.athletes?.[0]
    console.log('\n=== Sample Player Data ===')
    console.log('Name:', athlete.athlete?.displayName)
    console.log('\nRaw stats array:', athlete.categories?.[0]?.totals)
    console.log('\nStat labels:', athlete.categories?.[0]?.labels)
    console.log('\nIndex 9 (FG%):', athlete.categories?.[0]?.totals[9])
    console.log('Index 12 (3P%):', athlete.categories?.[0]?.totals[12])
    console.log('Index 15 (FT%):', athlete.categories?.[0]?.totals[15])
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testESPNStats()

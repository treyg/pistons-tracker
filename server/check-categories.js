import axios from 'axios'

async function checkCategories() {
  try {
    const url = 'https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=2&sort=offensive.avgPoints:desc&season=2025&seasontype=2'
    
    const response = await axios.get(url)
    const athlete = response.data?.athletes?.[0]
    
    console.log('\n=== Categories Structure ===')
    console.log(JSON.stringify(athlete.categories, null, 2))
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkCategories()

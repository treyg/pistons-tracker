import axios from 'axios'
import jsdom from 'jsdom'

const { JSDOM } = jsdom

const NBA_ROSTER_URL = 'https://www.nba.com/pistons/roster'
const TEAM_ID = '1610612765' // Detroit Pistons
const SEASON = '2025-26'

async function getDetailedStats() {
  try {
    console.log('Fetching detailed stats from ESPN...')
    const url = 'https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=400&sort=offensive.avgPoints:desc&season=2025&seasontype=2'
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    })
    
    const athletes = response.data?.athletes || []
    
    // Create a map of player name to stats
    const statsMap = {}
    athletes.forEach(athlete => {
      const name = athlete.athlete?.displayName
      const categories = athlete.categories || []
      
      // Find offensive and defensive categories
      const offensive = categories.find(cat => cat.name === 'offensive')
      const defensive = categories.find(cat => cat.name === 'defensive')
      
      if (name && offensive) {
        const offStats = offensive.totals || []
        const defStats = defensive?.totals || []
        
        statsMap[name] = {
          pts: parseFloat(offStats[0]) || 0,     // Points per game
          reb: parseFloat(offStats[10]) || 0,    // Rebounds per game
          ast: parseFloat(offStats[11]) || 0,    // Assists per game
          stl: parseFloat(defStats[0]) || 0,     // Steals per game
          blk: parseFloat(defStats[1]) || 0,     // Blocks per game
          fg_pct: parseFloat(offStats[3]) / 100 || 0,   // FG% (convert to decimal)
          fg3_pct: parseFloat(offStats[6]) / 100 || 0,  // 3P% (convert to decimal)
          ft_pct: parseFloat(offStats[9]) / 100 || 0,   // FT% (convert to decimal)
          fg3m: parseFloat(offStats[4]) || 0     // 3-pointers made per game
        }
      }
    })
    
    console.log(`Fetched detailed stats for ${athletes.length} players`)
    return statsMap
  } catch (error) {
    console.error('Error fetching detailed stats:', error.message)
    return null
  }
}

async function scrapeNBARoster() {
  try {
    console.log('Fetching roster from NBA.com...')
    const response = await axios.get(NBA_ROSTER_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 10000
    })

    const dom = new JSDOM(response.data)
    const doc = dom.window.document

    // Find the __NEXT_DATA__ script tag
    const nextDataScript = doc.querySelector('script#__NEXT_DATA__')
    if (!nextDataScript) {
      console.error('Could not find __NEXT_DATA__ script tag')
      return null
    }

    // Parse the JSON data
    const nextData = JSON.parse(nextDataScript.textContent)
    const rosterData = nextData?.props?.pageProps?.rosterData?.roster

    if (!rosterData || !Array.isArray(rosterData)) {
      console.error('Could not find roster data in __NEXT_DATA__')
      return null
    }

    console.log(`Found ${rosterData.length} players in roster data`)

    // Get detailed stats from NBA Stats API
    const detailedStats = await getDetailedStats()

    // Transform the data to our format
    const playerData = {}
    
    rosterData.forEach((player) => {
      const sanitizedKey = player.name.replace(/[.#$\/\[\]]/g, '')
      
      // Build headshot URL from NBA CDN (standard pattern)
      const headshot = `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`
      
      // Get detailed stats if available, otherwise use basic stats
      const stats = detailedStats?.[player.name] || {
        pts: player.stats?.season?.ppg || 0,
        reb: player.stats?.season?.rpg || 0,
        ast: player.stats?.season?.apg || 0,
        stl: player.stats?.season?.spg || 0,
        blk: 0,
        ft_pct: 0,
        fg_pct: 0,
        fg3_pct: 0,
        fg3m: 0
      }
      
      playerData[sanitizedKey] = {
        name: player.name,
        number: player.number,
        position: player.position,
        height: player.height,
        weight: player.weight,
        age: player.age,
        experience: player.experience,
        country: player.country,
        headshot: headshot,
        stats: stats
      }
      
      console.log(`Processed: ${player.name} - #${player.number} - ${player.position}`)
    })

    console.log(`Successfully processed ${Object.keys(playerData).length} players`)
    return playerData
  } catch (err) {
    console.error('Error scraping NBA roster:', err.message)
    return null
  }
}

export { scrapeNBARoster }

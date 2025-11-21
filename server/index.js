import { scrapeNBARoster } from './scrape.js'
import { updateRoster, playerData, getNews, scheduleNewsRefresh } from './firebase.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

try {
  dotenv.config({ path: './.env' })
  console.log('Environment loaded')

  const app = express()
  
  // Configure CORS for production
  const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions))
  
  const fakeport = process.env.PORT || 4000

  app.get('/runIndex', async (req, res) => {
    try {
      await runIndex()
      await getNews()
      res.status(200).send('Roster updated successfully')
    } catch (error) {
      console.error('Error in /runIndex:', error)
      res.status(500).send('An error occurred while updating the roster')
    }
  })

  // API endpoint to get Pistons games (proxy to avoid CORS)
  app.get('/api/games', async (req, res) => {
    try {
      console.log('GET /api/games - Request received')
      const axios = (await import('axios')).default
      console.log('Fetching from ESPN API...')
      
      const response = await axios.get(
        'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/det/schedule',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 10000
        }
      )
      
      console.log('ESPN API response received')
      const espnData = response.data
      
      if (!espnData || !espnData.events) {
        console.error('Invalid ESPN data structure:', espnData)
        return res.status(500).json({ error: 'Invalid data from ESPN' })
      }
      
      // Transform ESPN data to match the old Ball Don't Lie format
      const games = espnData.events.map(event => {
        const competition = event.competitions[0]
        const homeTeam = competition.competitors.find(c => c.homeAway === 'home')
        const awayTeam = competition.competitors.find(c => c.homeAway === 'away')
        
        return {
          id: event.id,
          date: event.date,
          status: competition.status.type.description,
          home_team: {
            id: homeTeam.id,
            name: homeTeam.team.displayName.replace('Detroit Pistons', 'Pistons'),
          },
          visitor_team: {
            id: awayTeam.id,
            name: awayTeam.team.displayName.replace('Detroit Pistons', 'Pistons'),
          },
          home_team_score: parseInt(homeTeam.score?.value || 0),
          visitor_team_score: parseInt(awayTeam.score?.value || 0),
        }
      })
      
      console.log(`Returning ${games.length} games`)
      res.json({ data: games })
    } catch (error) {
      console.error('Error fetching games:', error.message)
      console.error('Full error:', error)
      res.status(500).json({ error: 'Failed to fetch games', details: error.message })
    }
  })

  async function runIndex() {
    try {
      console.log('Starting runIndex')
      console.log('Fetching roster from NBA.com')
      const rosterData = await scrapeNBARoster()

      if (!rosterData) {
        console.log('Failed to fetch roster from NBA.com')
        return
      }

      console.log('Updating roster in Firebase')
      await updateRoster(rosterData)
      console.log('Roster update complete!')
    } catch (error) {
      console.error('Error in runIndex:', error)
      throw error
    }
  }

  // Start the Express server FIRST
  app.listen(fakeport, () => {
    console.log(`Server running on port ${fakeport}`)
    console.log('Server is ready to accept requests')
    
    // THEN run initialization in background after server is listening
    console.log('Starting background initialization tasks...')
    runIndex().catch(err => console.error('Initial runIndex failed:', err))
    getNews().catch(err => console.error('Initial getNews failed:', err))
    scheduleNewsRefresh()
  })
} catch (error) {
  console.error('Top level error:', error)
}

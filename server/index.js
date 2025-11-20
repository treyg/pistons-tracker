import { scrapeNBARoster } from './scrape.js'
import { updateRoster, playerData, getNews, scheduleNewsRefresh } from './firebase.js'
import express from 'express'
import dotenv from 'dotenv'

try {
  dotenv.config({ path: './.env' })
  console.log('Environment loaded')
  console.log('API Key:', process.env.BALL_DONT_LIE_KEY ? 'Present' : 'Missing')

  const app = express()
  const fakeport = process.env.PORT || 4000

  app.get('/runIndex', async (req, res) => {
    try {
      await runIndex()
      getNews()
      res.status(200).send('Roster updated successfully')
    } catch (error) {
      console.error('Error in /runIndex:', error)
      res.status(500).send('An error occurred while updating the roster')
    }
  })

  // Start the Express server
  app.listen(fakeport, () => {
    console.log(`Server running on port ${fakeport}`)
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

  console.log('Starting initial run')
  runIndex()
  scheduleNewsRefresh()
} catch (error) {
  console.error('Top level error:', error)
}

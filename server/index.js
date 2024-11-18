import axios from 'axios'
import { scrapeRoster } from './scrape.js'
import { updateRoster, playerData, getNews } from './firebase.js'
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

  function sanitizeKey(key) {
    return key.replace(/[.#$\/\[\]]/g, '')
  }

  async function sanitizeNames(rosterObj) {
    const sanitizedRosterObj = {}
    Object.entries(rosterObj).forEach(([key, value]) => {
      const sanitizedName = value?.name.replace(/\s/g, '%20')
      const sanitizedKey = sanitizeKey(key)
      sanitizedRosterObj[sanitizedKey] = { ...value, name: sanitizedName }
    })
    return sanitizedRosterObj
  }

  async function runIndex() {
    try {
      console.log('Starting runIndex')
      console.log('Scraping Roster')
      const scrapedRoster = await scrapeRoster()

      if (!scrapedRoster) {
        console.log('Failed to scrape roster')
        return
      }

      console.log('Updating Roster')
      const sanitizedRosterObj = await sanitizeNames(scrapedRoster)
      await getPlayerInfo(sanitizedRosterObj)
      await updateRoster(sanitizedRosterObj)
    } catch (error) {
      console.error('Error in runIndex:', error)
      throw error
    }
  }

  async function getPlayerInfo(rosterObj) {
    const playerNames = Object.keys(rosterObj)

    console.log('Fetching player information...')

    for (let i = 0; i < playerNames.length; i++) {
      const playerName = rosterObj[playerNames[i]].name
      console.log(`Fetching info for player: ${playerName}`)

      try {
        const searchName = playerName.replace(/%20/g, ' ').split(' ').pop()
        console.log(`Searching for player with name: ${searchName}`)

        const response = await axios.get(
          `https://api.balldontlie.io/v1/players?search=${searchName}`,
          {
            headers: {
              Authorization: process.env.BALL_DONT_LIE_KEY
            }
          }
        )

        const data = response.data
        console.log(
          `API Response for ${searchName}:`,
          data.data.length ? 'Found matches' : 'No matches'
        )

        if (data.data.length > 0) {
          const playerData = data.data[0]
          rosterObj[playerNames[i]].id = playerData.id
          rosterObj[playerNames[i]].position = playerData.position || 'N/A'
          rosterObj[playerNames[i]].weight = playerData.weight_pounds || 'N/A'
          rosterObj[playerNames[i]].height = `${playerData.height_feet || ''}${
            playerData.height_inches ? `'${playerData.height_inches}"` : 'N/A'
          }`
          console.log(`Updated info for ${playerName}`)
        } else {
          console.log(`No data found for ${playerName}`)
        }

        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(
          `Error fetching player info for ${playerName}:`,
          error.message
        )
        // Set default values if the API call fails
        rosterObj[playerNames[i]].id = 0
        rosterObj[playerNames[i]].position = 'N/A'
        rosterObj[playerNames[i]].weight = 'N/A'
        rosterObj[playerNames[i]].height = 'N/A'
      }
    }

    console.log('Finished updating player information')
  }

  console.log('Starting initial run')
  runIndex()
} catch (error) {
  console.error('Top level error:', error)
}

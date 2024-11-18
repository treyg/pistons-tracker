import got from 'got'
import jsdom from 'jsdom'
import { updateRoster } from './firebase.js'

const { JSDOM } = jsdom

const ROSTER_URL =
  'https://www.espn.com/nba/team/roster/_/name/det/detroit-pistons'

async function scrapeRoster() {
  try {
    const response = await got(ROSTER_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    })

    const dom = new JSDOM(response.body)
    const doc = dom.window.document

    const playerData = {}
    const rows = Array.from(doc.querySelectorAll('.Table__TBODY .Table__TR'))

    console.log(`Found ${rows.length} player rows`)

    rows.forEach((row, index) => {
      // Get the name from the title attribute of the img element
      const imgElement = row.querySelector('img')
      if (!imgElement) {
        console.log(`No image element found for row ${index}`)
        return
      }

      const name = imgElement.getAttribute('title')
      const headshotUrl = imgElement.getAttribute('alt') // The actual image URL is in the alt attribute

      if (name && headshotUrl) {
        console.log(`Processing player: ${name}`)
        const sanitizedKey = name.replace(/[.#$\/\[\]]/g, '')
        playerData[sanitizedKey] = {
          name,
          headshot: headshotUrl
        }
      } else {
        console.log(`Missing name or headshot for row ${index}`)
      }
    })

    const playerCount = Object.keys(playerData).length
    if (playerCount === 0) {
      console.log('No players found in the roster')
      return null
    }

    console.log(`Successfully scraped ${playerCount} players`)
    return playerData
  } catch (err) {
    console.error('Error scraping roster:', err)
    return null
  }
}

export { scrapeRoster }

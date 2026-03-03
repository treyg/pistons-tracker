// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getDatabase, ref, set, get } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics";
import fetch from 'node-fetch'
import schedule from 'node-schedule'
import axios from 'axios'
import jsdom from 'jsdom'

const { JSDOM } = jsdom

import * as dotenv from 'dotenv'
dotenv.config()


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDz-XuB2IrPKc8FzYzrw8NWdJt9UokVcu0',
  authDomain: 'stons-center-26695.firebaseapp.com',
  databaseURL: 'https://stons-center-26695.firebaseio.com',
  projectId: 'stons-center-26695',
  storageBucket: 'stons-center-26695.appspot.com',
  messagingSenderId: '718892526120',
  appId: '1:718892526120:web:c260b1190ba3093745a31d',
  measurementId: 'G-ZHF7DPDMXH'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const database = getDatabase()

function updateRoster(name) {
  set(ref(database, 'roster'), {
    players: name
  })
}

const playerData = get(ref(database, 'roster')).then(snapshot => {
  const data = snapshot.val()
  return data.players
})

const NEWS_RSS_URL =
  'https://news.google.com/rss/search?q=detroit+pistons&hl=en-US&gl=US&ceid=US:en'

const getNews = async () => {
  try {
    console.log('Fetching Pistons news via Google News RSS')
    const response = await axios.get(NEWS_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    })

    const dom = new JSDOM(response.data, { contentType: 'text/xml' })
    const items = dom.window.document.querySelectorAll('item')

    if (!items || items.length === 0) {
      console.error('Google News RSS returned no items')
      return
    }

    const parsed = Array.from(items)
      .map(item => {
        const title = item.querySelector('title')?.textContent || 'Untitled'
        const url = item.querySelector('link')?.textContent || ''
        const pubDate = item.querySelector('pubDate')?.textContent || null
        const source = item.querySelector('source')?.textContent || 'Unknown'
        const description = item.querySelector('description')?.textContent || ''

        // Extract image from description HTML (Google News often embeds an <img>)
        const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/)
        const image = imgMatch ? imgMatch[1] : null

        // Strip HTML tags from description
        const cleanDesc = description.replace(/<[^>]*>/g, '').trim()

        return {
          id: url || title,
          title,
          url,
          source,
          publishedAt: pubDate,
          description: cleanDesc,
          image
        }
      })
      .filter(article => Boolean(article.url))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 10)

    if (parsed.length === 0) {
      console.error('No valid articles after parsing')
      return
    }

    await set(ref(database, 'news'), {
      articles: parsed,
      fetchedAt: new Date().toISOString()
    })
    console.log(`Stored ${parsed.length} Pistons news articles`)
  } catch (error) {
    console.error('Error fetching Pistons news:', error.message || error)
  }
}

const scheduleNewsRefresh = () => {
  schedule.scheduleJob('0 * * * *', () => {
    console.log('Cron: refreshing Pistons news feed')
    getNews()
  })
}

export { updateRoster, playerData, getNews, scheduleNewsRefresh }

// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getDatabase, ref, set, get } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics";
import fetch from 'node-fetch'
import schedule from 'node-schedule'
import Firecrawl from '@mendable/firecrawl-js'

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

const firecrawlClient = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
  baseUrl: process.env.FIRECRAWL_BASE_URL || undefined
})
const NEWS_URL =
  'https://duckduckgo.com/?origin=funnel_home_website&t=h_&q=detroit%20pistons&ia=news&iar=news'

const getNews = async () => {
  try {
    console.log('Fetching Pistons news via Firecrawl')
    const response = await firecrawlClient.scrape(NEWS_URL, {
      formats: [
        {
          type: 'json',
          prompt:
            'Return an array "articles" with objects {title, url, source, publishedAt, description, image} for each Detroit Pistons news card on the page.'
        }
      ],
      maxAge: 0,
      timeout: 20000
    })

    const articles = response?.data?.json?.articles
    if (!Array.isArray(articles)) {
      console.error('Firecrawl returned no articles')
      return
    }

    const parsed = articles
      .map(article => ({
        id: article.id || article.url || article.title,
        title: article.title || 'Untitled',
        url: article.url,
        source: article.source || article.provider || 'Unknown',
        publishedAt: article.publishedAt || article.time || null,
        description: article.description || article.summary || '',
        image: article.image || article.imageUrl || null
      }))
      .filter(article => Boolean(article.url))

    await set(ref(database, 'news'), {
      articles: parsed,
      fetchedAt: new Date().toISOString()
    })
    console.log(`Stored ${parsed.length} Pistons news articles`)
  } catch (error) {
    console.error('Error fetching Pistons news:', error)
  }
}

const scheduleNewsRefresh = () => {
  schedule.scheduleJob('0 * * * *', () => {
    console.log('Cron: refreshing Pistons news feed')
    getNews()
  })
}

export { updateRoster, playerData, getNews, scheduleNewsRefresh }

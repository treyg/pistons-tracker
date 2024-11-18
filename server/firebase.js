// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getDatabase, ref, set, get } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics";
import fetch from 'node-fetch'

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

//Function to fetch news from azure and save to firebase
const endpoint = process.env.BING_SEARCH_V7_ENDPOINT
const query = 'Detroit Pistons'
const api_key = process.env.BING_SEARCH_V7_API_KEY

const requestOptions = {
  headers: {
    'Ocp-Apim-Subscription-Key': api_key
  }
}

const getNews = () => {
  const url = `${endpoint}?q=${encodeURIComponent(
    query
  )}&count=10&freshness=Day&textFormat=Raw`
  console.log(`Requesting: ${url}`)

  fetch(url, requestOptions)
    .then(res => {
      console.log(`Response status: ${res.status}`)
      console.log(`Response headers: ${JSON.stringify([...res.headers])}`)
      return res.json()
    })
    .then(data => {
      console.log('Got news from Azure')
      set(ref(database, 'news'), { articles: data })
    })
    .catch(err => {
      console.log(err)
    })
}

export { updateRoster, playerData, getNews }

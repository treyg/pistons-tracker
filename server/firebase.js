
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDatabase, ref, set, get } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
import fetch from 'node-fetch';

import * as dotenv from "dotenv";
dotenv.config();


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz-XuB2IrPKc8FzYzrw8NWdJt9UokVcu0",
    authDomain: "stons-center-26695.firebaseapp.com",
    databaseURL: "https://stons-center-26695.firebaseio.com",
    projectId: "stons-center-26695",
    storageBucket: "stons-center-26695.appspot.com",
    messagingSenderId: "718892526120",
    appId: "1:718892526120:web:c260b1190ba3093745a31d",
    measurementId: "G-ZHF7DPDMXH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = getDatabase();

function updateRoster(name) {
    set(ref(database, 'roster'), {
        players: name
    })
}

const playerData = get(ref(database, 'roster')).then(snapshot => {
    const data = snapshot.val();
    return data.players;
})

//Function to fetch news from azure and save to firebase
const api_url =
    "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=detroit+pistons";

const api_key = process.env.API_KEY;
const requestOptions = {
    headers: {
        "Ocp-Apim-Subscription-Key": api_key,
    },
};


const getNews = () => {
    fetch(api_url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log('Got news from Azure')
            const news = data.value;
            set(ref(database, 'news'), {
                articles: news
            })
        })
        .catch((err) => {
            console.log(err);
        });
};




export { updateRoster, playerData, getNews };
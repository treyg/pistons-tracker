// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDatabase, ref, set, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export { updateRoster, playerData };
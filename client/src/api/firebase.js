// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
//Require express framework
const express = require("express");
//Set express to app variable
const app = express();
const path = require("path");
const fetch = require("node-fetch");

console.log(process.env.API_KEY)

var sslRedirect = require('heroku-ssl-redirect');
app.use(sslRedirect());

var CronJob = require("cron").CronJob;

const compression = require("compression");

app.use(compression());

//Set express to app variable
const PORT = process.env.PORT || 3000;

//Listen on port 3000 for server
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

//Tell app which folder to use to show static on local server
app.use(express.static("public"));

//Tell app which folder to use to show static on local server
app.use(express.static(path.join(__dirname, "public")));

//////////////////////////////////////////

const admin = require("firebase-admin");
const serviceAccount = require("./documents/stons-center-26695-firebase-adminsdk-e0kpa-b68e508f64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stons-center-26695.firebaseio.com",
});

//const db = admin.firestore()

var database = admin.database();
//console.log(database)


const api = process.env.API_KEY;
const requestOptions = {
  headers: {
    "Ocp-Apim-Subscription-Key": api,
  },
};

const api_url =
  "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=detroit+pistons";

// 



setInterval(() => {
  fetch(api_url, requestOptions)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((currentNewsData) =>
      database.ref("currentNews").update(currentNewsData)
    )
    .catch((err) => console.log(err));
}, 1000 * 60 * 3);

// const getData = () => {
//   fetch(api_url, requestOptions)
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((currentNewsData) =>
//     database.ref("currentNews").update(currentNewsData)
//   )
//   .catch((err) => console.log(err));
// }

// let job = new CronJob('0 * * * *', getData())
// job.start()

//Require express framework
const express = require("express");
//Set express to app variable
const app = express();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
var CronJob = require("cron").CronJob;

const compression = require("compression");
require("dotenv").config();

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

var ref = database.ref("currentNews");
var actualData = ref.on("value", function (snapshot) {
  //console.log(snapshot.val())
});

const api = process.env.API_KEY;
const requestOptions = {
  headers: {
    "Ocp-Apim-Subscription-Key": api,
  },
};

const api_url =
  "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=detroit+pistons";

const getData = () => {
  fetch(api_url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let currentNewsData = data;
      return database.ref("currentNews").update(currentNewsData);
    });
};

getData();

// const getData = () => {
//   fetch(api_url, requestOptions)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       let newsData = data;
//       //console.log(newsData);

//       const dataFile = path.join(__dirname, "public", "data.json");

//       fs.writeFileSync(dataFile, JSON.stringify(newsData), function (err) {
//         if(err) throw err
//         return newsData
//       })

//     });
// };

//setInterval(() => getData(), 1000*60*60);

// let job = new CronJob('0 * * * *', getData())
// job.start()

// const {cacheGet,cacheReset} = (function() {
//   const dataFile = 'public/data.json';
//   let data = false;
//   async function getFreshData() {
//     const data = await (await fetch(api_url, requestOptions)).json();
//     fs.writeFileSync(dataFile, JSON.stringify(data));
//     return data;
//   }
//   function getOldData() {
//     let oldData;
//     try {
//       oldData = JSON.parse(fs.readFileSync(dataFile).toString());
//     } catch(e) {
//       oldData = false;
//     }
//     return oldData;
//   }
//   async function cacheGet() {
//     if (data) return data;
//     const old = getOldData();
//     if (old) {
//       data = old;
//       return data;
//     }
//     const fresh = await getFreshData();
//     data = fresh;
//     return data;
//   };
//   function cacheReset() {
//     fs.unlinkSync(dataFile);
//     data = false;
//   }
//   return {
//     cacheGet,
//     cacheReset,

//   };

// })();

// setInterval(()=>(cacheReset(),cacheGet()), 1000*60*60);

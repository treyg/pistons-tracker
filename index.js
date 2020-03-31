//Require express framework
const express = require("express");
//Set express to app variable
const app = express();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
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

const api = "21b177ecd55041b2b5174de15bafc241";
const requestOptions = {
  headers: {
    "Ocp-Apim-Subscription-Key": api
  }
};

const api_url =
  "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=detroit+pistons";

  const {cacheGet,cacheReset} = (function() {
    const dataFile = 'public/data.json';
    let data = false;
    async function getFreshData() {
      //const api_url = `https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=detroit+pistons`;
      const data = await (await fetch(api_url, requestOptions)).json();
      fs.writeFileSync(dataFile, JSON.stringify(data));
      return data;
    }
    function getOldData() {
      let oldData;
      try {
        oldData = JSON.parse(fs.readFileSync(dataFile).toString());
      } catch(e) {
        oldData = false;
      }
      return oldData;
    }
    async function cacheGet() {
      if (data) return data;
      const old = getOldData();
      if (old) {
        data = old;
        return data;
      }
      const fresh = await getFreshData();
      data = fresh;
      return data;
    };
    function cacheReset() {
      fs.unlinkSync(dataFile);
      data = false;
    }
    return {
      cacheGet,
      cacheReset,
      
    };
  
    
  })();
  
  
  
  setInterval(()=>(cacheGet()), 1000*60*60);
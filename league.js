
//Javascript to toggle the menu
document.getElementById("nav-toggle").onclick = function() {
  document.getElementById("nav-content").classList.toggle("hidden");
};

//League News

const LEAGUE_NEWS_URL = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news";

fetch(LEAGUE_NEWS_URL)
  .then(response => {
    return response.json();
  })
  .then(leagueNewsJSON => {
    //Set the JSON data for games to a variable
    const leagueNews = leagueNewsJSON.articles;
    console.log(leagueNews)

    const showLeagueNews = () => {
      let leagueNewsSection = document.getElementById("leagueNewsSection");
      //Loop through leagueNews JSON data and create sections for each story
      for (let i = 0; i < 6; i++) {
        let leagueImgContainer = document.createElement("div");
        leagueNewsSection.appendChild(leagueImgContainer);
        leagueImgContainer.classList.add(
          "flex",
          "flex-col",
          "py-2",
          "overflow-hidden",
          "mb-6",
          "border-2",
          "border-gray-200",
          "rounded",
          "cursor-pointer"
        );

        let leagueNewsImage = document.createElement("img");
        leagueNewsImage.src = `${leagueNews[i].images[0].url}`;
        leagueNewsImage.classList.add("mx-3", "rounded-sm");
        leagueImgContainer.appendChild(leagueNewsImage);
        //If no image is given for story, leave image blank and continue loop
        if (leagueNews[i].images[0].url == undefined) {
          leagueNewsImage.src = ``
        }

        let leagueNewsTitle = document.createElement("div");
        leagueNewsTitle.textContent = `${leagueNews[i].headline}`;
        leagueNewsTitle.classList.add(
          "mx-3",
          "text-base",
          "mt-2",
          "font-medium"
        );
        leagueImgContainer.appendChild(leagueNewsTitle);

        let leagueNewsDescription = document.createElement("div");
        leagueNewsDescription.textContent = `${leagueNews[i].description}`;
        leagueNewsDescription.classList.add("text-sm", "mx-3", "mt-2");
        leagueImgContainer.appendChild(leagueNewsDescription);

        let leagueNewsProvider = document.createElement("p");
        leagueNewsProvider.textContent = `${leagueNews[i].images[0].credit}`;
        leagueNewsProvider.classList.add("text-xs", "text-gray-800", "pt-1");
        leagueNewsDescription.appendChild(leagueNewsProvider);
  
        //Default league news source to espn if no credit is given
        if (leagueNews[i].images[0].credit == undefined) {
          leagueNewsProvider.innerHTML = `ESPN`
        }
    

        leagueImgContainer.addEventListener("click", () => {
          window.open(leagueNews[i].links.web.short.href);
        });
      }
    };

    showLeagueNews();
  });


//   const test =
//   "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

// fetch(test)
//   .then(response => {
//     return response.json();
//   })
//   .then(testJSON => {
//     //Set the JSON data for games to a variable
//     const test = testJSON
//     console.log(test);


//   });

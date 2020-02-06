//Javascript to toggle the menu
document.getElementById("nav-toggle").onclick = function() {
  document.getElementById("nav-content").classList.toggle("hidden");
};


// Games Today 
  const LEAGUE_GAMES_TODAY =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

  fetch(LEAGUE_GAMES_TODAY)
    .then(response => {
      return response.json();
    })
    .then(gamesTodayJSON => {
      //Set the JSON data for games to a variable
      const gamesToday = gamesTodayJSON
      //Set variable for just games today
      const eventsToday = gamesToday.events
      console.log(eventsToday);
      console.log(eventsToday[1].competitions[0].competitors[0].team.logo)

      for (let i = 0; i < eventsToday.length; i++) {

        let gamesToday = document.getElementById('gamesToday')
        let singleGameArea = document.createElement('div')
            singleGameArea.classList.add("border-2", "border-gray-200", 'px-2', 'py-2', 'my-4', 'flex', 'flex-row', 'justify-between')

        let teamsArea = document.createElement('div')

        let statusArea = document.createElement('div')
            statusArea.classList.add('border-l')
        
        let gameTime = document.createElement('div')
            gameTime.innerHTML = `Today <br> ${dayjs(eventsToday[i].competitions[0].date).format('h:mm a')}`
            gameTime.classList.add('text-sm', 'text-center', 'mx-8')
            statusArea.appendChild(gameTime)

        let homeTeamDiv = document.createElement('div')
            homeTeamDiv.classList.add('flex', 'flex-row')
        let homeTeamName = document.createElement('span')
            homeTeamName.textContent = eventsToday[i].competitions[0].competitors[0].team.shortDisplayName
        let homeTeamLogo = document.createElement('img')
            homeTeamLogo.src = eventsToday[i].competitions[0].competitors[0].team.logo
            homeTeamLogo.classList.add('w-6', 'h-6', 'mr-2')

      
        let awayTeamDiv = document.createElement('div')
            awayTeamDiv.classList.add('flex', 'flex-row')
        let awayTeamName = document.createElement('span')
            awayTeamName.textContent = eventsToday[i].competitions[0].competitors[1].team.shortDisplayName
        let awayTeamLogo = document.createElement('img')
            awayTeamLogo.src = eventsToday[i].competitions[0].competitors[1].team.logo
            awayTeamLogo.classList.add('w-6', 'h-6', 'mr-2')

      

          gamesToday.appendChild(singleGameArea)
          singleGameArea.appendChild(teamsArea)
          teamsArea.appendChild(homeTeamDiv)
          homeTeamDiv.appendChild(homeTeamLogo)
          homeTeamDiv.appendChild(homeTeamName)
          
          
          teamsArea.appendChild(awayTeamDiv)
          awayTeamDiv.appendChild(awayTeamLogo)
          awayTeamDiv.appendChild(awayTeamName)
          
          singleGameArea.appendChild(statusArea)
      
      
        }



  });


//League News

const LEAGUE_NEWS_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news";

fetch(LEAGUE_NEWS_URL)
  .then(response => {
    return response.json();
  })
  .then(leagueNewsJSON => {
    //Set the JSON data for games to a variable
    const leagueNews = leagueNewsJSON.articles;
    // console.log(leagueNews);

    //Sort league news to show newest stories first
    const sortedLeagueNews = leagueNews.sort((a, b) =>
      dayjs(a.categories[0].createDate).format("H:MM") >
      dayjs(b.categories[0].createDate).format("H:MM")
        ? 1
        : -1
    );

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
        leagueNewsImage.src = `${sortedLeagueNews[i].images[0].url}`;
        leagueNewsImage.classList.add("mx-3", "rounded-sm");
        leagueImgContainer.appendChild(leagueNewsImage);
        //If no image is given for story, leave image blank and continue loop
        if (leagueNews[i].images[0].url == undefined) {
          leagueNewsImage.src = ``;
        }

        let leagueNewsTitle = document.createElement("div");
        leagueNewsTitle.textContent = `${sortedLeagueNews[i].headline}`;
        leagueNewsTitle.classList.add(
          "mx-3",
          "text-base",
          "mt-2",
          "font-medium"
        );
        leagueImgContainer.appendChild(leagueNewsTitle);

        let leagueNewsDescription = document.createElement("div");
        leagueNewsDescription.textContent = `${sortedLeagueNews[i].description}`;
        leagueNewsDescription.classList.add("text-sm", "mx-3", "mt-2");
        leagueImgContainer.appendChild(leagueNewsDescription);

        let leagueNewsProvider = document.createElement("p");
        leagueNewsProvider.textContent = `${sortedLeagueNews[i].images[0].credit}`;
        leagueNewsProvider.classList.add("text-xs", "text-gray-800", "pt-1");
        leagueNewsDescription.appendChild(leagueNewsProvider);

        //Default league news source to espn if no credit is given
        if (leagueNews[i].images[0].credit == undefined) {
          leagueNewsProvider.innerHTML = `ESPN`;
        }

        leagueImgContainer.addEventListener("click", () => {
          window.open(leagueNews[i].links.web.short.href);
        });
      }
    };

    showLeagueNews();
  });


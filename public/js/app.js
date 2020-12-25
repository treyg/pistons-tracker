//Javascript to toggle the menu
document.getElementById("nav-toggle").onclick = function () {
  document.getElementById("nav-content").classList.toggle("hidden");
};

//Get scroll button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Get data for info about detroit pistons
const PISTONS_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/8";

fetch(PISTONS_URL)
  .then((response) => {
    return response.json();
  })
  .then((pistonsJSON) => {
    //Set the JSON data for games to a variable
    const pistonsData = pistonsJSON.team;
    //Set variable for next game data
    const nextGame = pistonsData.nextEvent;
    const competitors = nextGame[0].competitions[0].competitors;
    //console.log(nextGame);

    // Run function to check for a live game and hide the game preview if the game is live or completed
    const checkForLiveGame = () => {
      if (
        nextGame[0].competitions[0].status.type.description === "Final" ||
        nextGame[0].competitions[0].status.type.state == "in"
      ) {
        let preview = document.getElementById("preview");
        preview.className = "hidden";
      }
    };
    checkForLiveGame();

    //create function to show upcoming or current game
    const showNextGameData = () => {
      //let startTime = document.getElementById('startTime')
      let startDate = document.getElementById("startDate");
      startDate.textContent = moment(nextGame[0].competitions[0].date).format(
        "dddd h:mm"
      );
      //If game is today, make display say today rather than day of the week
      if (
        moment(nextGame[0].competitions[0].date).format("dddd") ==
        moment().format("dddd")
      ) {
        startDate.innerHTML = `Today at ${moment(
          nextGame[0].competitions[0].date
        ).format("h:mm")}`;
      }

      //Set home team div to display home team name
      let homeTeamDiv = document.getElementById("homeTeamDiv");
      homeTeamDiv.textContent = competitors[0].team.shortDisplayName;
      //create img element using home teams logo and append to home team div
      let homeTeamLogo = document.getElementById("homeTeamLogo");
      homeTeamLogo.src = competitors[0].team.logos[0].href;
      //Set home team score
      let homeTeamScore = document.getElementById("homeTeamScore");
      homeTeamScore.textContent = nextGame[0].competitions[0].boxscoreAvailable;
      if ((homeTeamScore.textContent = "false")) {
        homeTeamScore.textContent = "";
      }

      //Set quarter and clock
      let quarter = document.getElementById("quarter");
      quarter.innerHTML = `Quarter: ${nextGame[0].competitions[0].status.period}`;
      let remainingTime = document.getElementById("remainingTime");
      remainingTime.textContent =
        nextGame[0].competitions[0].status.displayClock;

      //Hide time remaining if game hasn't started yet
      if (nextGame[0].competitions[0].status.period === 0) {
        let timeLeft = document.getElementById("timeLeft");
        timeLeft.classList.add("mb-5", "justify-around");
        quarter.textContent = nextGame[0].competitions[0].venue.fullName;
        quarter.classList.add("text-base");
        remainingTime.innerHTML = `<span class="text-white text-base border rounded p-2 bg-green-500 hover:bg-green-600 cursor-pointer ">Get Tickets</span>`;
        remainingTime.addEventListener("click", () => {
          window.open(nextGame[0].competitions[0].tickets[0].links[0].href);
        });
      }

      //Set visitor team div to display visitor team name
      let visitorTeamDiv = document.getElementById("visitorTeamDiv");
      visitorTeamDiv.textContent = competitors[1].team.shortDisplayName;
      let visitorTeamLogo = document.getElementById("visitorTeamLogo");
      visitorTeamLogo.src = `${competitors[1].team.logos[0].href}`;

      //Set visitor score
      let visitorTeamScore = document.getElementById("visitorTeamScore");
      visitorTeamScore.textContent =
        nextGame[0].competitions[0].boxscoreAvailable;
      if ((visitorTeamScore.textContent = "false")) {
        visitorTeamScore.textContent = "";
      }
    };

    showNextGameData();
  });

// Get data for all NBA scores for the day, then filter to only include pistons games
const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

fetch(SCOREBOARD_URL)
  .then((response) => {
    return response.json();
  })
  .then((scoreboardJSON) => {
    //Set the JSON data for games to a variable
    const scoreboardData = scoreboardJSON;
    const livePistonsGame = scoreboardData.events.filter((games) =>
      games.shortName.includes("DET")
    );

    //console.log(livePistonsGame);
    //Check to see if live game array is populated. If so, run function to collect and print data, if not hide currentEventContainer

    //get live score and time for current game
    const showCurrentGame = () => {
      //Check if game is live or finished
      if (livePistonsGame[0].status.type.name === "STATUS_IN_PROGRESS") {
        todaysGameStatus.textContent = "LIVE NOW";
        todaysGameStatus.classList.add("text-red-600");
      } else if (livePistonsGame[0].status.type.completed === true) {
        todaysGameStatus.textContent = "FINAL";
      }

      let liveHomeTeamLogo = document.getElementById("liveHomeTeamLogo");
      liveHomeTeamLogo.src =
        livePistonsGame[0].competitions[0].competitors[0].team.logo;
      let liveHomeTeamDiv = document.getElementById("liveHomeTeamDiv");
      liveHomeTeamDiv.textContent =
        livePistonsGame[0].competitions[0].competitors[0].team.name;
      let liveHomeTeamScore = document.getElementById("liveHomeTeamScore");
      liveHomeTeamScore.textContent = `${livePistonsGame[0].competitions[0].competitors[0].score}`;

      //Set quarter and clock
      let liveQuarter = document.getElementById("liveQuarter");
      liveQuarter.textContent = livePistonsGame[0].status.period;
      let liveRemainingTime = document.getElementById("liveRemainingTime");
      liveRemainingTime.textContent = livePistonsGame[0].status.displayClock;

      if (livePistonsGame[0].status.period == 5) {
        liveQuarter.textContent = "OT";
      }

      let liveVisitorTeamLogo = document.getElementById("liveVisitorTeamLogo");
      liveVisitorTeamLogo.src =
        livePistonsGame[0].competitions[0].competitors[1].team.logo;
      let liveVisitorTeamDiv = document.getElementById("liveVisitorTeamDiv");
      liveVisitorTeamDiv.textContent =
        livePistonsGame[0].competitions[0].competitors[1].team.name;
      let liveVisitorTeamScore = document.getElementById(
        "liveVisitorTeamScore"
      );
      liveVisitorTeamScore.textContent = `${livePistonsGame[0].competitions[0].competitors[1].score}`;
    };

    if (livePistonsGame.length > 0 && livePistonsGame[0].status.period > 0) {
      showCurrentGame();
    } else {
      currentEventContainer.className = "hidden";
    }
  });

// Set data for showing last 5 pistons games
const PISTONS_GAMES_URL =
  "https://www.balldontlie.io/api/v1/games?seasons[]=2020&team_ids[]=9&per_page=82";

fetch(PISTONS_GAMES_URL)
  .then((response) => {
    return response.json();
  })
  .then((stonsGamesJSON) => {
    //Set the JSON data for games to a variable
    const stonsGamesData = stonsGamesJSON.data;
    //Sort pistons games to be in  order starting at beginning of the season
    const sortedStonsGames = stonsGamesData.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    //Show pistons game that have already been played and reverse the order to show the most recent game first
    const completedStonsGames = sortedStonsGames
      .reverse()
      .filter((games) => games.status == "Final");

    const latestGames = () => {
      let gameSections = document.getElementById("gameSections");

      for (let i = 0; i.length && i < 5; i++) {
        let homeTeamSection = document.createElement("div");
        gameSections.appendChild(homeTeamSection);
        let homeName = document.createElement("div");
        homeName.textContent = `${completedStonsGames[i].home_team.name}`;

        homeTeamSection.appendChild(homeName);
        let homeScore = document.createElement("span");
        homeScore.textContent = ` ${completedStonsGames[i].home_team_score}`;
        homeScore.classList.add("float-right");
        homeName.appendChild(homeScore);

        let visitorTeamSection = document.createElement("div");
        homeTeamSection.appendChild(visitorTeamSection);
        let visitorName = document.createElement("div");
        visitorName.textContent = `${completedStonsGames[i].visitor_team.name}`;
        visitorTeamSection.appendChild(visitorName);
        let visitorScore = document.createElement("span");
        visitorScore.textContent = `${completedStonsGames[i].visitor_team_score}`;
        visitorName.appendChild(visitorScore);
        visitorScore.classList.add("float-right");
        visitorTeamSection.classList.add(
          "border-b",
          "border-gray-400",
          "pb-2",
          "mb-2"
        );
        //Gray out losing team name and score
        if (
          completedStonsGames[i].home_team_score >
          completedStonsGames[i].visitor_team_score
        ) {
          homeScore.innerHTML = `
          ${completedStonsGames[i].home_team_score}<span class="text-black-500 font-medium "></span>`;
          visitorName.classList.add("text-gray-600");
        } else if (
          completedStonsGames[i].home_team_score <
          completedStonsGames[i].visitor_team_score
        ) {
          visitorScore.innerHTML = `${completedStonsGames[i].visitor_team_score}<span class="text-black-500 font-medium"></span> `;
          homeName.classList.add("text-gray-600");
        }
      }
    };

    latestGames();

    ///Add Next Five Game Sections Here
    const upcomingGames = sortedStonsGames.reverse();
    // .filter(
    //   (games) =>
    //     games.status !== "Final" && moment(games.date).$d > moment().$d
    // );
    console.log(upcomingGames);

    nextFiveGames = () => {
      let upcomingGamesSection = document.getElementById(
        "upcomingGamesSection"
      );

      for (let i = 1; i.length || i < 5; i++) {
        let futureGameSection = document.createElement("div");
        futureGameSection.classList.add(
          "border-b",
          "border-gray-400",
          "pb-2",
          "mb-2",
          "flex",
          "flex-row",
          "justify-between",
          "items-end"
        );

        let upcomingHomeTeamSection = document.createElement("div");
        //console.log(upcomingGames[i].home_team.name)
        upcomingHomeTeamSection.textContent = `${upcomingGames[i].home_team.name}`;

        let gameTimeSection = document.createElement("div");
        gameTimeSection.innerHTML = `
            <span class="text-xs font-semibold m-auto">${
              upcomingGames[i].status
            }</span>
            <br>${moment(upcomingGames[i].date).format("ddd, MMMM D")}
          `;
        gameTimeSection.classList.add(
          "flex",
          "flex-col",
          "content-center",
          "text-sm"
        );

        let upcomingAwayTeamSection = document.createElement("div");
        upcomingAwayTeamSection.textContent = `${upcomingGames[i].visitor_team.name}`;

        upcomingGamesSection.appendChild(futureGameSection);
        futureGameSection.appendChild(upcomingHomeTeamSection);
        futureGameSection.appendChild(gameTimeSection);
        futureGameSection.appendChild(upcomingAwayTeamSection);
      }
    };

    nextFiveGames();
  });

//Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDz-XuB2IrPKc8FzYzrw8NWdJt9UokVcu0",
  authDomain: "stons-center-26695.firebaseapp.com",
  databaseURL: "https://stons-center-26695.firebaseio.com",
  projectId: "stons-center-26695",
  storageBucket: "stons-center-26695.appspot.com",
  messagingSenderId: "718892526120",
  appId: "1:718892526120:web:c260b1190ba3093745a31d",
  measurementId: "G-ZHF7DPDMXH",
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
//console.log(firebase)
firebase.analytics();

const database = firebase.database();
//console.log(database)

const databaseRef = database.ref("currentNews");

//console.log(databaseRef)

databaseRef.once("value", getNewsData, errData);

function getNewsData(data) {
  let stories = data.val();
  //console.log(stories)

  const stonsNews = stories.value.sort((a, b) =>
    a.datePublished < b.datePublished ? 1 : -1
  );

  const showStonsNews = () => {
    let pistonsNewsSection = document.getElementById("pistonsNewsSection");

    for (let i = 0; i < stonsNews.length; i++) {
      let imgContainer = document.createElement("div");
      pistonsNewsSection.appendChild(imgContainer);
      imgContainer.classList.add(
        "flex",
        "flex-row",
        "py-2",
        "overflow-hidden",
        "mb-6",
        "border-2",
        "border-gray-200",
        "rounded",
        "cursor-pointer"
      );

      let stonsNewsImage = document.createElement("img");
      stonsNewsImage.src = `${stonsNews[i].image.thumbnail.contentUrl}`;
      stonsNewsImage.classList.add("ml-3", "w-16", "h-16", "rounded-sm");
      imgContainer.appendChild(stonsNewsImage);

      let stonsNewsTitle = document.createElement("div");
      stonsNewsTitle.textContent = `${stonsNews[i].name}`;
      stonsNewsTitle.classList.add("mx-3", "text-base");
      imgContainer.appendChild(stonsNewsTitle);

      let stonsNewsProvider = document.createElement("p");
      stonsNewsProvider.textContent = `${
        stonsNews[i].provider[0].name
      } | ${moment(stonsNews[i].datePublished).fromNow("ss")} ago`;
      stonsNewsProvider.classList.add("text-xs", "text-gray-800", "pt-1");
      stonsNewsTitle.appendChild(stonsNewsProvider);

      imgContainer.addEventListener("click", () => {
        window.open(stonsNews[i].url);
      });
    }
  };

  showStonsNews();
}

function errData(err) {
  console.log("error");
  console.log(err);
}

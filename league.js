
  //Javascript to toggle the menu
  document.getElementById('nav-toggle').onclick = function(){
    document.getElementById("nav-content").classList.toggle("hidden");
  }



//League News

const LEAGUE_NEWS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news'

fetch(LEAGUE_NEWS_URL)
.then((response) => {
  return response.json();
})
.then((leagueNewsJSON) => {
  //Set the JSON data for games to a variable
  const leagueNews = leagueNewsJSON.articles
  console.log(leagueNews)


  // const stonsNews = newsData.filter(el => {
  //    return el.categories.find(c => c.teamId == 8);
  // })
  

  const showLeagueNews = () => {
      let leagueNewsSection = document.getElementById('leagueNewsSection')
      
      for (let i = 0; i < 10; i++) {
      
      let imgContainer = document.createElement('div')
        leaguesNewsSection.appendChild(imgContainer)
        imgContainer.classList.add('flex', 'flex-row', 'py-2', 'overflow-hidden', 'mb-6', 'border-2', 'border-gray-200', 'rounded')

        let leagueNewsImage = document.createElement('img')
        leagueNewsImage.src = `${leagueNews[i].images[0].url}`
        leagueNewsImage.classList.add('ml-3', 'w-16', 'h-16', 'rounded-sm' )
        imgContainer.appendChild(leagueNewsImage)

        let leagueNewsTitle = document.createElement('div')
        leagueNewsTitle.textContent = `${leagueNews[i].headline}`
        leagueNewsTitle.classList.add('mx-3', 'text-base')
        imgContainer.appendChild(leagueNewsTitle)

        let leagueNewsProvider = document.createElement('p')
        leagueNewsProvider.textContent = `${leagueNews[i].images[0].credit}`
        leagueNewsProvider.classList.add('text-xs', 'text-gray-800', 'pt-1')
        leagueNewsTitle.appendChild(leagueNewsProvider)

        // imgContainer.addEventListener('click', () => {
        //     window.open(leagueNews[i].ampUrl)
        // })
      
        }

  }

  showLeagueNews()


});

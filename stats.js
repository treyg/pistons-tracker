const PISTONS_STATS =
  "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=254&player_ids[]=401&player_ids[]=189&player_ids[]=486&player_ids[]=666543&player_ids[]=189&player_ids[]=338&player_ids[]=69&player_ids[]=295&player_ids[]=329&player_ids[]=168&player_ids[]=258&player_ids[]=426&player_ids[]=666698&player_ids[]=666454&player_ids[]=441&player_ids[]=205";

//'https://www.balldontlie.io/api/v1/stats?seasons=[]2019&per_page=100'
//'https://www.balldontlie.io/api/v1/players?year=[]2019?per_page=100'
//https://www.balldontlie.io/api/v1/stats?seasons=[]2019&player_ids[]=19&per_page=100

fetch(PISTONS_STATS)
  .then(response => {
    return response.json();
  })
  .then(statsJSON => {
    //Set the JSON data for games to a variable
    const stats = statsJSON.data;
    console.log(stats);

    const lukeKennard = stats.find(e => e.player_id == 254);
    lukeKennard.name = "Luke Kennard";

    const derrickRose = stats.find(e => e.player_id == 401);
    derrickRose.name = "Derrick Rose";
    derrickRose.imgOne = "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/201565.png"
    derrickRose.imgTwo = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201565.png"

    const blakeGriffin = stats.find(e => e.player_id == 189);
    blakeGriffin.name = "Blake Griffin";

    const christianWood = stats.find(e => e.player_id == 486);
    christianWood.name = "Christian Wood";

    const sekouDoumbouya = stats.find(e => e.player_id == 666543);
    sekouDoumbouya.name = "Sekou Doumbouya";

    const sviMykhailiuk = stats.find(e => e.player_id == 338);
    sviMykhailiuk.name = "Svi Mykhailiuk";

    const bruceBrown = stats.find(e => e.player_id == 69);
    bruceBrown.name = "Bruce Brown";

    const thonMaker = stats.find(e => e.player_id == 295);
    thonMaker.name = "Thon Maker";

    const markieffMorris = stats.find(e => e.player_id == 329);
    markieffMorris.name = "Markieff Morris";

    const langstonGalloway = stats.find(e => e.player_id == 168);
    langstonGalloway.name = "Langston Galloway";

    const brandonKnight = stats.find(e => e.player_id == 258);
    brandonKnight.name = "Brandon Knight";

    const tonySnell = stats.find(e => e.player_id == 426);
    tonySnell.name = "Tony Snell";

    const louisKing = stats.find(e => e.player_id == 666698);
    louisKing.name = "Louis King";

    const jordanBone = stats.find(e => e.player_id == 666454);
    jordanBone.name = "Jordan Bone";

    const khyriThomas = stats.find(e => e.player_id == 441);
    khyriThomas.name = "Khyri Thomas";

    const johnHenson = stats.find(e => e.player_id == 205);
    johnHenson.name = "John Henson";

    

   

    //const sortedByAssists = stats.sort((a, b) => (a.ast < b.ast ? 1 : -1));

    //const sortedByRebounds = stats.sort((a, b) => (a.reb < b.reb ? 1 : -1));



    const showPoints = () => {
      const sortedByPoints = stats.sort((a, b) => a.pts < b.pts ? 1 : -1);

      const leadersSection = document.getElementById('leadersSection');

      let pointsLeaderSection = document.createElement('div')
      pointsLeaderInfo = document.createElement('div')
      pointsLeaderImg = document.createElement('img')
      pointsLeaderImg.classList.add('border')
      
      pointsLeaderImg.src = sortedByPoints[0].imgOne

      pointsLeaderSection.classList.add('flex', 'flex-row', 'justify-between', 'px-4')
         pointsLeaderInfo.innerHTML = `
         <span>${sortedByPoints[0].pts} PPG</span>
            <p>${sortedByPoints[0].name}</P>
            `
      leadersSection.appendChild(pointsLeaderSection)
      pointsLeaderSection.appendChild(pointsLeaderInfo)
      pointsLeaderSection.appendChild(pointsLeaderImg)
      console.log(sortedByPoints)
    };

    showPoints()

  });

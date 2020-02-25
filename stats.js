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
    lukeKennard.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1628379.png";
    lukeKennard.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628379.png";

    const derrickRose = stats.find(e => e.player_id == 401);
    derrickRose.name = "Derrick Rose";
    derrickRose.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/201565.png";
    derrickRose.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201565.png";

    const blakeGriffin = stats.find(e => e.player_id == 189);
    blakeGriffin.name = "Blake Griffin";
    blakeGriffin.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/201933.png";
    blakeGriffin.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201933.png";

    const christianWood = stats.find(e => e.player_id == 486);
    christianWood.name = "Christian Wood";
    christianWood.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1626174.png";
    christianWood.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/1626174.png";

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
      const sortedByPoints = stats.sort((a, b) => (a.pts < b.pts ? 1 : -1));

      const leadersSection = document.getElementById("leadersSection");

      const pointsLeaderSection = document.createElement("div");
      pointsLeaderSection.classList.add("pb-4");
      const pointsLeaderInfo = document.createElement("div");
      pointsLeaderInfo.classList.add("mt-6");
      const pointsLeaderImg = document.createElement("img");
      pointsLeaderImg.classList.add("w-48");
      pointsLeaderImg.src = sortedByPoints[0].imgOne;

      leadersSection.appendChild(pointsLeaderSection);
      pointsLeaderSection.appendChild(pointsLeaderInfo);
      pointsLeaderSection.appendChild(pointsLeaderImg);

      pointsLeaderSection.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "px-4"
      );

      pointsLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByPoints[0].pts.toFixed()}</span>
        <p>${sortedByPoints[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add(
        "px-4",
        "py-4",
        "flex",
        "justify-between"
      );

      leadersSection.appendChild(runnersUpSection);

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByPoints[i].imgTwo;

        console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByPoints[i].name}</span>
          <br>
            <span class="font-semibold">${sortedByPoints[i].pts.toFixed(1)}<img src=${sortedByPoints[i].imgTwo} class="w-16 h-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
       
      }

   
      console.log(sortedByPoints);
    };

    showPoints();
  });

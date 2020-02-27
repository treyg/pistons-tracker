const PISTONS_STATS =
  "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=254&player_ids[]=401&player_ids[]=189&player_ids[]=486&player_ids[]=666543&player_ids[]=189&player_ids[]=338&player_ids[]=69&player_ids[]=295&player_ids[]=329&player_ids[]=168&player_ids[]=258&player_ids[]=426&player_ids[]=666698&player_ids[]=666454&player_ids[]=441&player_ids[]=205&player_ids[]=666611&player_ids[]=2208";

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
    sekouDoumbouya.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629635.png";

    const sviMykhailiuk = stats.find(e => e.player_id == 338);
    sviMykhailiuk.name = "Svi Mykhailiuk";
    sviMykhailiuk.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1629004.png";
    sviMykhailiuk.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629004.png";

    const bruceBrown = stats.find(e => e.player_id == 69);
    bruceBrown.name = "Bruce Brown";
    bruceBrown.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1628971.png";
    bruceBrown.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628971.png";

    const thonMaker = stats.find(e => e.player_id == 295);
    thonMaker.name = "Thon Maker";
    thonMaker.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1627748.png";
    thonMaker.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627748.png";

    const langstonGalloway = stats.find(e => e.player_id == 168);
    langstonGalloway.name = "L. Galloway";
    langstonGalloway.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/204038.png";
    langstonGalloway.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/204038.png";

    const brandonKnight = stats.find(e => e.player_id == 258);
    brandonKnight.name = "Brandon Knight";
    brandonKnight.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202688.png";

    const tonySnell = stats.find(e => e.player_id == 426);
    tonySnell.name = "Tony Snell";
    tonySnell.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/203503.png";
    tonySnell.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203503.png";

    const louisKing = stats.find(e => e.player_id == 666698);
    louisKing.name = "Louis King";
    louisKing.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629663.png";

    const jordanBone = stats.find(e => e.player_id == 666454);
    jordanBone.name = "Jordan Bone";
    jordanBone.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629648.png";

    const khyriThomas = stats.find(e => e.player_id == 441);
    khyriThomas.name = "Khyri Thomas";
    khyriThomas.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629017.png";

    const johnHenson = stats.find(e => e.player_id == 205);
    johnHenson.name = "John Henson";
    johnHenson.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/203089.png";
    johnHenson.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203089.png ";

    const dontaHall = stats.find(e => e.player_id == 666611);
    dontaHall.name = "Donta Hall";
    dontaHall.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629743.png";

    const derrickWaltonJr = stats.find(e => e.player_id == 2208);
    derrickWaltonJr.name = "D. Walton Jr.";
    derrickWaltonJr.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629743.png";

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
      pointsLeaderImg.classList.add("w-8/12", "h-auto");
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
      <span class="text-4xl font-semibold">${sortedByPoints[0].pts.toFixed(1)}</span>
        <p>${sortedByPoints[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      leadersSection.appendChild(runnersUpSection);

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByPoints[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByPoints[i].name}</span>
          <br>
            <span class="font-semibold">${sortedByPoints[i].pts.toFixed(
              1
            )}<img src=${
          sortedByPoints[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      // console.log(sortedByPoints);
    };

    showPoints();

    /////////////////////////////////////////////////

    const showassists = () => {
      const sortedByassists = stats.sort((a, b) => (a.ast < b.ast ? 1 : -1));

      const leadersSectionTwo = document.getElementById("leadersSectionTwo");

      const assistsLeaderSection = document.createElement("div");
      assistsLeaderSection.classList.add("pb-4");
      const assistsLeaderInfo = document.createElement("div");
      assistsLeaderInfo.classList.add("mt-6");
      const assistsLeaderImg = document.createElement("img");
      assistsLeaderImg.classList.add("w-8/12", "h-auto");
      assistsLeaderImg.src = sortedByassists[0].imgOne;

      leadersSectionTwo.appendChild(assistsLeaderSection);
      assistsLeaderSection.appendChild(assistsLeaderInfo);
      assistsLeaderSection.appendChild(assistsLeaderImg);

      assistsLeaderSection.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "px-4"
      );

      assistsLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByassists[0].ast.toFixed(1)}</span>
        <p>${sortedByassists[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      leadersSectionTwo.appendChild(runnersUpSection);

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByassists[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByassists[i].name}</span>
          <br>
            <span class="font-semibold">${sortedByassists[i].ast.toFixed(
              1
            )}<img src=${
          sortedByassists[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      // console.log(sortedByassists);
    };

    showassists();

    //Section for showing  rebound leaders

    const showRebounds = () => {
      const sortedByrebounds = stats.sort((a, b) => (a.reb < b.reb ? 1 : -1));

      const leadersSectionThree = document.getElementById(
        "leadersSectionThree"
      );

      const reboundsLeaderSection = document.createElement("div");
      reboundsLeaderSection.classList.add("pb-4");
      const reboundsLeaderInfo = document.createElement("div");
      reboundsLeaderInfo.classList.add("mt-6");
      const reboundsLeaderImg = document.createElement("img");
      reboundsLeaderImg.classList.add("w-8/12", "h-auto");
      reboundsLeaderImg.src = sortedByrebounds[0].imgOne;

      leadersSectionThree.appendChild(reboundsLeaderSection);
      reboundsLeaderSection.appendChild(reboundsLeaderInfo);
      reboundsLeaderSection.appendChild(reboundsLeaderImg);

      reboundsLeaderSection.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "px-4"
      );

      reboundsLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByrebounds[0].reb.toFixed(1)}</span>
        <p>${sortedByrebounds[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      leadersSectionThree.appendChild(runnersUpSection);

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByrebounds[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByrebounds[i].name}</span>
          <br>
            <span class="font-semibold">${sortedByrebounds[i].reb.toFixed(
              1
            )}<img src=${
          sortedByrebounds[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      // console.log(sortedByrebounds);
    };

    showRebounds();

    //Section for showing FG percentage

    const showFGP = () => {
      const sortedByFGP = stats.sort((a, b) => (a.fg_pct < b.fg_pct ? 1 : -1));

      const leadersSectionFour = document.getElementById("leadersSectionFour");

      const FGPLeaderSection = document.createElement("div");
      FGPLeaderSection.classList.add("pb-4");
      const FGPLeaderInfo = document.createElement("div");
      FGPLeaderInfo.classList.add("mt-6");
      const FGPLeaderImg = document.createElement("img");
      FGPLeaderImg.classList.add("w-8/12", "h-auto");
      FGPLeaderImg.src = sortedByFGP[0].imgOne;

      leadersSectionFour.appendChild(FGPLeaderSection);
      FGPLeaderSection.appendChild(FGPLeaderInfo);
      FGPLeaderSection.appendChild(FGPLeaderImg);

      FGPLeaderSection.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "px-4"
      );

      FGPLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${(
        sortedByFGP[0].fg_pct * 100
      ).toFixed(1)}</span>
        <p>${sortedByFGP[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      leadersSectionFour.appendChild(runnersUpSection);

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByFGP[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByFGP[i].name}</span>
          <br>
            <span class="font-semibold">${(sortedByFGP[i].fg_pct * 100).toFixed(
              1
            )}<img src=${
          sortedByFGP[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      // console.log(sortedByFGP);
    };

    showFGP();

    //Three point percentage section

    const showTPP = () => {
      const sortedByTPP = stats.sort((a, b) => (a.fg3_pct < b.fg3_pct ? 1 : -1));

      const leadersSectionFive = document.getElementById("leadersSectionFive");

      const TPPLeaderSection = document.createElement("div");
      TPPLeaderSection.classList.add("pb-4");
      const TPPLeaderInfo = document.createElement("div");
      TPPLeaderInfo.classList.add("mt-6");
      const TPPLeaderImg = document.createElement("img");
      TPPLeaderImg.classList.add("w-8/12", "h-auto");
      TPPLeaderImg.src = sortedByTPP[0].imgOne;

      leadersSectionFive.appendChild(TPPLeaderSection);
      TPPLeaderSection.appendChild(TPPLeaderInfo);
      TPPLeaderSection.appendChild(TPPLeaderImg);

      TPPLeaderSection.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "px-4"
      );

      TPPLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${(
        sortedByTPP[0].fg_pct * 100
      ).toFixed(1)}</span>
        <p>${sortedByTPP[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      leadersSectionFive.appendChild(runnersUpSection);

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByTPP[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByTPP[i].name}</span>
          <br>
            <span class="font-semibold">${(sortedByTPP[i].fg_pct * 100).toFixed(
              1
            )}<img src=${
          sortedByTPP[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      // console.log(sortedByTPP);
    };

    showTPP();
  });

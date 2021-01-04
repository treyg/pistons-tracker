//Javascript to toggle the menu
document.getElementById("nav-toggle").onclick = function () {
  document.getElementById("nav-content").classList.toggle("hidden");
};

const PISTONS_STATS =
  "https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=3547256&player_ids[]=401&player_ids[]=189&player_ids[]=144&player_ids[]=666543&player_ids[]=189&player_ids[]=338&player_ids[]=182&player_ids[]=3547241&player_ids[]=329&player_ids[]=234&player_ids[]=3547298&player_ids[]=307&player_ids[]=354&player_ids[]=371&player_ids[]=441&player_ids[]=666899&player_ids[]=3547267&player_ids[]=487";

//'https://www.balldontlie.io/api/v1/stats?seasons=[]2019&per_page=100'
//'https://www.balldontlie.io/api/v1/players?year=[]2019?per_page=100'
//https://www.balldontlie.io/api/v1/stats?seasons=[]2019&player_ids[]=19&per_page=100

fetch(PISTONS_STATS)
  .then((response) => {
    return response.json();
  })
  .then((statsJSON) => {
    //Set the JSON data for games to a variable
    const stats = statsJSON.data;
    console.log(stats);

    const saddiqBey = stats.find((e) => e.player_id == 3547256);
    saddiqBey.name = "Saddiq Bey";
    saddiqBey.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1630180.png";
    saddiqBey.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630180.png";

    const derrickRose = stats.find((e) => e.player_id == 401);
    derrickRose.name = "Derrick Rose";
    derrickRose.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/201565.png";
    derrickRose.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201565.png";

    const blakeGriffin = stats.find((e) => e.player_id == 189);
    blakeGriffin.name = "Blake Griffin";
    blakeGriffin.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/201933.png";
    blakeGriffin.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201933.png";

    const wayneEllington = stats.find((e) => e.player_id == 144);
    wayneEllington.name = "Wayne Ellington";
    wayneEllington.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/201961.png";
    wayneEllington.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/201961.png";

    const sekouDoumbouya = stats.find((e) => e.player_id == 666543);
    sekouDoumbouya.name = "Sekou Doumbouya";
    sekouDoumbouya.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629635.png";

    const sviMykhailiuk = stats.find((e) => e.player_id == 338);
    sviMykhailiuk.name = "Svi Mykhailiuk";
    sviMykhailiuk.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1629004.png";
    sviMykhailiuk.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629004.png";

    const jermiGrant = stats.find((e) => e.player_id == 182);
    jermiGrant.name = "Jermai Grant";
    jermiGrant.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/203924.png";
    jermiGrant.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203924.png";

    const killianHayes = stats.find((e) => e.player_id == 3547241);
    killianHayes.name = "Killian Hayes";
    killianHayes.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1630165.png";
    killianHayes.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630165.png";

    const joshJackson = stats.find((e) => e.player_id == 234);
    joshJackson.name = "Josh Jackson";
    joshJackson.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1628367.png";
    joshJackson.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628367.png";

    const sabenLee = stats.find((e) => e.player_id == 3547298);
    sabenLee.name = "Saben Lee";
    sabenLee.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1630240.png";
    sabenLee.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630240.png";

    const rodneyMcgruder = stats.find((e) => e.player_id == 307);
    rodneyMcgruder.name = "Rodney McGruder";
    rodneyMcgruder.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/203585.png";
    rodneyMcgruder.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203585.png";

    const jahlilOkafor = stats.find((e) => e.player_id == 354);
    jahlilOkafor.name = "Jahlil Okafor";
    jahlilOkafor.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1626143.png";
    jahlilOkafor.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626143.png";

    const masonPlumlee = stats.find((e) => e.player_id == 371);
    masonPlumlee.name = "Mason Plumlee";
    masonPlumlee.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/203486.png";
    masonPlumlee.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203486.png";

    const deividasSirvydis = stats.find((e) => e.player_id == 666899);
    deividasSirvydis.name = "Deividas Sirvydis";
    deividasSirvydis.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1629686.png";
    deividasSirvydis.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629686.png";

    const isaiahStewart = stats.find((e) => e.player_id == 3547267);
    isaiahStewart.name = "Isaiah Stewart";
    isaiahStewart.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1630191.png";
    isaiahStewart.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1630191.png ";

    const delonWright = stats.find((e) => e.player_id == 487);
    delonWright.name = "Delon Wright";
    delonWright.imgOne =
      "https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/1626153.png";
    delonWright.imgTwo =
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626153.png";

    const showPoints = () => {
      const sortedByPoints = stats.sort((a, b) => (a.pts < b.pts ? 1 : -1));

      const leadersSection = document.getElementById("leadersSection");

      const pointsLeaderSection = document.createElement("div");
      pointsLeaderSection.classList.add("pb-4");
      const pointsLeaderInfo = document.createElement("div");
      pointsLeaderInfo.classList.add("mt-6");
      pointsLeaderImgContainer = document.createElement("div");
      const pointsLeaderImg = document.createElement("img");
      pointsLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      pointsLeaderImg.src = sortedByPoints[0].imgOne;

      pointsLeaderSection.classList.add("flex", "flex-col", "px-4");

      pointsLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByPoints[0].pts.toFixed(
        1
      )}</span>
        <p>${sortedByPoints[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

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

      leadersSection.appendChild(pointsLeaderSection);
      pointsLeaderSection.appendChild(pointsLeaderInfo);
      pointsLeaderSection.appendChild(pointsLeaderImgContainer);
      pointsLeaderImgContainer.appendChild(pointsLeaderImg);
      leadersSection.appendChild(runnersUpSection);

      // console.log(sortedByPoints);
    };

    showPoints();

    /////////////////////////////////////////////////

    //Refactor to use one function for each stat leader

    const showassists = () => {
      const sortedByassists = stats.sort((a, b) => (a.ast < b.ast ? 1 : -1));

      const leadersSectionTwo = document.getElementById("leadersSectionTwo");

      const assistsLeaderSection = document.createElement("div");
      assistsLeaderSection.classList.add("pb-4");
      const assistsLeaderInfo = document.createElement("div");
      assistsLeaderInfo.classList.add("mt-6");
      const assistsLeaderImgContainer = document.createElement("div");
      const assistsLeaderImg = document.createElement("img");
      assistsLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      assistsLeaderImg.src = sortedByassists[0].imgOne;

      assistsLeaderSection.classList.add("flex", "flex-col", "px-4");

      assistsLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByassists[0].ast.toFixed(
        1
      )}</span>
        <p>${sortedByassists[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

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

      leadersSectionTwo.appendChild(assistsLeaderSection);
      assistsLeaderSection.appendChild(assistsLeaderInfo);
      assistsLeaderSection.appendChild(assistsLeaderImgContainer);
      assistsLeaderImgContainer.appendChild(assistsLeaderImg);
      leadersSectionTwo.appendChild(runnersUpSection);

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
      const reboundsLeaderImgContainer = document.createElement("div");
      const reboundsLeaderImg = document.createElement("img");
      reboundsLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      reboundsLeaderImg.src = sortedByrebounds[0].imgOne;

      reboundsLeaderSection.classList.add("flex", "flex-col", "px-4");

      reboundsLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByrebounds[0].reb.toFixed(
        1
      )}</span>
        <p>${sortedByrebounds[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

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

      leadersSectionThree.appendChild(reboundsLeaderSection);
      reboundsLeaderSection.appendChild(reboundsLeaderInfo);
      reboundsLeaderSection.appendChild(reboundsLeaderImgContainer);
      reboundsLeaderImgContainer.appendChild(reboundsLeaderImg);
      leadersSectionThree.appendChild(runnersUpSection);

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
      const FGPLeaderImgContainer = document.createElement("div");
      const FGPLeaderImg = document.createElement("img");
      FGPLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      FGPLeaderImg.src = sortedByFGP[0].imgOne;

      FGPLeaderSection.classList.add("flex", "flex-col", "px-4");

      FGPLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${(
        sortedByFGP[0].fg_pct * 100
      ).toFixed(1)}%</span>
        <p>${sortedByFGP[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

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
            )}%<img src=${
          sortedByFGP[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      leadersSectionFour.appendChild(FGPLeaderSection);
      FGPLeaderSection.appendChild(FGPLeaderInfo);
      FGPLeaderSection.appendChild(FGPLeaderImgContainer);
      FGPLeaderImgContainer.appendChild(FGPLeaderImg);
      leadersSectionFour.appendChild(runnersUpSection);
    };

    showFGP();

    //Three point percentage section

    const showTPP = () => {
      const sortedByTPP = stats.sort((a, b) =>
        a.fg3_pct < b.fg3_pct ? 1 : -1
      );

      const leadersSectionFive = document.getElementById("leadersSectionFive");

      const TPPLeaderSection = document.createElement("div");
      TPPLeaderSection.classList.add("pb-4");
      const TPPLeaderInfo = document.createElement("div");
      TPPLeaderInfo.classList.add("mt-6");
      const TPPLeaderImgContainer = document.createElement("div");
      const TPPLeaderImg = document.createElement("img");
      TPPLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      TPPLeaderImg.src = sortedByTPP[0].imgOne;

      TPPLeaderSection.classList.add("flex", "flex-col", "px-4");

      TPPLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${(
        sortedByTPP[0].fg_pct * 100
      ).toFixed(1)}%</span>
        <p>${sortedByTPP[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

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
            )}%<img src=${
          sortedByTPP[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      leadersSectionFive.appendChild(TPPLeaderSection);
      TPPLeaderSection.appendChild(TPPLeaderInfo);
      TPPLeaderSection.appendChild(TPPLeaderImgContainer);
      TPPLeaderImgContainer.appendChild(TPPLeaderImg);
      leadersSectionFive.appendChild(runnersUpSection);
    };

    showTPP();

    //Free Throw Percentage

    const showFreeThrowPercentage = () => {
      const sortedByFreeThrowPercentage = stats.sort((a, b) =>
        a.ft_pct < b.ft_pct ? 1 : -1
      );

      const leadersSectionEight = document.getElementById(
        "leadersSectionEight"
      );

      const freeThrowPercentageLeaderSection = document.createElement("div");
      freeThrowPercentageLeaderSection.classList.add("pb-4");
      const freeThrowPercentageLeaderInfo = document.createElement("div");
      freeThrowPercentageLeaderInfo.classList.add("mt-6");
      const freeThrowPercentageLeaderImgContainer = document.createElement(
        "div"
      );
      const freeThrowPercentageLeaderImg = document.createElement("img");
      freeThrowPercentageLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      freeThrowPercentageLeaderImg.src = sortedByFreeThrowPercentage[0].imgOne;

      freeThrowPercentageLeaderSection.classList.add(
        "flex",
        "flex-col",
        "px-4"
      );

      freeThrowPercentageLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${(
        sortedByFreeThrowPercentage[0].ft_pct * 100
      ).toFixed(1)}%</span>
        <p>${sortedByFreeThrowPercentage[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByFreeThrowPercentage[i].imgTwo;

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByFreeThrowPercentage[i].name}</span>
          <br>
            <span class="font-semibold">${(
              sortedByFreeThrowPercentage[i].ft_pct * 100
            ).toFixed(1)}%<img src=${
          sortedByFreeThrowPercentage[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      leadersSectionEight.appendChild(freeThrowPercentageLeaderSection);
      freeThrowPercentageLeaderSection.appendChild(
        freeThrowPercentageLeaderInfo
      );
      freeThrowPercentageLeaderSection.appendChild(
        freeThrowPercentageLeaderImgContainer
      );
      freeThrowPercentageLeaderImgContainer.appendChild(
        freeThrowPercentageLeaderImg
      );
      leadersSectionEight.appendChild(runnersUpSection);
    };

    showFreeThrowPercentage();

    //Steals Per Game section

    const showStealsPG = () => {
      const sortedByStealsPG = stats.sort((a, b) => (a.stl < b.stl ? 1 : -1));

      const leadersSectionSix = document.getElementById("leadersSectionSix");

      const stealsPGLeaderSection = document.createElement("div");
      stealsPGLeaderSection.classList.add("pb-4");
      const stealsPGLeaderInfo = document.createElement("div");
      stealsPGLeaderInfo.classList.add("mt-6");
      const stealsPGLeaderImgContainer = document.createElement("div");
      const stealsPGLeaderImg = document.createElement("img");
      stealsPGLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      stealsPGLeaderImg.src = sortedByStealsPG[0].imgOne;

      stealsPGLeaderSection.classList.add("flex", "flex-col", "px-4");

      stealsPGLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByStealsPG[0].stl.toFixed(
        1
      )}</span>
        <p>${sortedByStealsPG[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByStealsPG[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByStealsPG[i].name}</span>
          <br>
            <span class="font-semibold">${sortedByStealsPG[i].stl.toFixed(
              1
            )}<img src=${
          sortedByStealsPG[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      leadersSectionSix.appendChild(stealsPGLeaderSection);
      stealsPGLeaderSection.appendChild(stealsPGLeaderInfo);
      stealsPGLeaderSection.appendChild(stealsPGLeaderImgContainer);
      stealsPGLeaderImgContainer.appendChild(stealsPGLeaderImg);
      leadersSectionSix.appendChild(runnersUpSection);
    };

    showStealsPG();

    /////Show Blocks per game

    const showBlocksPG = () => {
      const sortedByBlocksPG = stats.sort((a, b) => (a.blk < b.blk ? 1 : -1));

      const leadersSectionSeven = document.getElementById(
        "leadersSectionSeven"
      );

      const blocksPGLeaderSection = document.createElement("div");
      blocksPGLeaderSection.classList.add("pb-4");
      const blocksPGLeaderInfo = document.createElement("div");
      blocksPGLeaderInfo.classList.add("mt-6");
      const blocksPGLeaderImgContainer = document.createElement("div");
      const blocksPGLeaderImg = document.createElement("img");
      blocksPGLeaderImgContainer.classList.add(
        "overflow-hidden",
        "-mt-24",
        "w-5/6",
        "ml-auto"
      );
      blocksPGLeaderImg.src = sortedByBlocksPG[0].imgOne;

      blocksPGLeaderSection.classList.add("flex", "flex-col", "px-4");

      blocksPGLeaderInfo.innerHTML = `
      <span class="text-4xl font-semibold">${sortedByBlocksPG[0].blk.toFixed(
        1
      )}</span>
        <p>${sortedByBlocksPG[0].name}</P>
        `;

      const runnersUpSection = document.createElement("div");
      runnersUpSection.classList.add("px-4", "py-4", "flex", "justify-between");

      for (let i = 1; i < 4; i++) {
        const runnersUp = document.createElement("div");
        runnersUp.classList.add("w-4/12");
        const runnersUpImg = document.createElement("img");
        runnersUpImg.src = sortedByBlocksPG[i].imgTwo;

        //console.log(runnersUpImg);

        runnersUp.innerHTML = `
        <span class = "text-sm">${sortedByBlocksPG[i].name}</span>
          <br>
            <span class="font-semibold">${sortedByBlocksPG[i].blk.toFixed(
              1
            )}<img src=${
          sortedByBlocksPG[i].imgTwo
        } class="w-16 ml-auto -mt-4"></img></span>
        `;

        runnersUpSection.appendChild(runnersUp);
      }

      leadersSectionSeven.appendChild(blocksPGLeaderSection);
      blocksPGLeaderSection.appendChild(blocksPGLeaderInfo);
      blocksPGLeaderSection.appendChild(blocksPGLeaderImgContainer);
      blocksPGLeaderImgContainer.appendChild(blocksPGLeaderImg);
      leadersSectionSeven.appendChild(runnersUpSection);
    };

    showBlocksPG();
  });

import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import NextStonsGame from "./NextStonsGame";
import LastFive from "./LastFive";
import NextFive from "./NextFive";
import StonsNews from "./StonsNews";
import getStonsGames from "../api/getStonsGames";
import getNextFiveStons from "../api/getNextFiveStons";

const Home = () => {
  const {
    data: nextFive,
    isLoading: nextFiveLoading,
    isError: nextFiveError,
  } = useQuery(["nextFiveStons"], getNextFiveStons);

  const {
    data: stonsGames,
    isLoading: stonsGamesLoading,
    isError: stonsGamesError,
  } = useQuery(["stonsGames"], getStonsGames);

  if (stonsGamesLoading || nextFiveLoading) {
    return <Loader />;
  }

  if (stonsGames && nextFiveError) {
    const gameData = stonsGames.data;
    const prevFive = gameData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    return (
      <>
        <NextStonsGame />
        <LastFive lastFive={prevFive} />
        {/* <NextFive nextFive={nextFive} /> */}
        <StonsNews />
      </>
    );
  }

  if (nextFive && stonsGamesError) {
    return (
      <>
        <NextStonsGame />
        {/* <LastFive lastFive={prevFive} /> */}
        <NextFive nextFive={nextFive} />
        <StonsNews />
      </>
    );
  }

  if (stonsGames && nextFive) {
    const gameData = stonsGames.data;
    const prevFive = gameData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    return (
      <div className="flex flex-col md:flex-row">
        <div className="left-cont md:w-1/2">
          <NextStonsGame />
          <LastFive lastFive={prevFive} />
          <NextFive nextFive={nextFive} />
        </div>
        <div className="right-cont md:w-1/2">
          <StonsNews />
        </div>
      </div>
    );
  }
};

export default Home;

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
  } = useQuery(["nextFiveStons"], () => getNextFiveStons());

  const {
    data: stonsGames,
    isLoading: stonsGamesLoading,
    isError: stonsGamesError,
  } = useQuery(["stonsGames"], () => getStonsGames());

  if (stonsGamesLoading || nextFiveLoading) {
    return <Loader />;
  }

  if (stonsGamesError || nextFiveError) {
    return <div>There was an error fetching the data.</div>;
  }

  const gameData = stonsGames?.data ?? [];
  const prevFive = () => {
    const finishedGames = gameData.filter((game) => game.status === "Final");
    const sortedGames = finishedGames.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return sortedGames.slice(0, 5);
  };

  return (
    <div className="flex flex-col dark:text-gray-300 md:flex-row">
      <div className="left-cont md:w-1/2">
        <NextStonsGame />
        <LastFive lastFive={prevFive()} />
        <NextFive nextFive={nextFive} />
      </div>
      <div className="right-cont md:w-1/2">
        <StonsNews />
      </div>
    </div>
  );
};

export default Home;

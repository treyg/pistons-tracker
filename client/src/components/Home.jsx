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
      <>
        <NextStonsGame />
        <LastFive lastFive={prevFive} />
        <NextFive nextFive={nextFive} />
        <StonsNews />
      </>
    );
  }

  //   const { data, isLoading, error } = useQuery(["stonsGames"], getStonsGames);
  //   if (isLoading) return <Loader />;
  //   if (error) return <p>`An error has occurred: ${error.message}`</p>;
  //   if (data) {
  //     const gameData = data.data;
  //     const prevFive = gameData
  //       .sort((a, b) => new Date(b.date) - new Date(a.date))
  //       .slice(0, 5);
  //     const upcomingFive = gameData
  //       .sort((a, b) => new Date(a.date) - new Date(b.date))
  //       .slice(0, 5);
  //     return (
  //       <>
  //         <NextStonsGame />
  //         <LastFive lastFive={prevFive} />
  //         <NextFive nextFive={upcomingFive} />
  //         <StonsNews />
  //       </>
  //     );
  //   }
};

export default Home;

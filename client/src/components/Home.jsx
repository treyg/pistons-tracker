import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import NextStonsGame from "./NextStonsGame";
import LastFive from "./LastFive";
import NextFive from "./NextFive";
import StonsNews from "./StonsNews";
import getStonsGames from "../api/getStonsGames";

const Home = () => {
  const { data, isLoading, error } = useQuery(["stonsGames"], getStonsGames);
  if (isLoading) return <Loader />;
  if (error) return <p>`An error has occurred: ${error.message}`</p>;
  if (data) {
    const gameData = data.data;
    const prevFive = gameData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    const upcomingFive = gameData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
    return (
      <>
        <NextStonsGame />
        <LastFive lastFive={prevFive} />
        <NextFive nextFive={upcomingFive} />
        <StonsNews />
      </>
    );
  }
};

export default Home;

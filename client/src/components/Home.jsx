import React from "react";
import StonsGames from "./StonsGames";
import NextFive from "./NextFive";
import LastFive from "./LastFive";
import StonsNews from "./StonsNews";
const Home = () => {
  return (
    <div>
      <StonsGames />
      <NextFive />
      <LastFive />
      <StonsNews />
    </div>
  );
};

export default Home;

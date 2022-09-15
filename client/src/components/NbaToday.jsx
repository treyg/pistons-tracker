import React from "react";
import NbaNews from "./NbaNews";
import NbaGames from "./NbaGames";

const NbaToday = () => {
  return (
    <div>
      <NbaGames />
      <NbaNews />
    </div>
  );
};

export default NbaToday;

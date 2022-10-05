import React from "react";
import NbaNews from "./NbaNews";
import NbaGames from "./NbaGames";

const NbaToday = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      <NbaGames />
      <NbaNews />
    </div>
  );
};

export default NbaToday;

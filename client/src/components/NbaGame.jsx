import React, { useState, useEffect } from "react";

const Game = (props) => {
  const [computedStatus, updateStatus] = useState("");

  const game = props.competitions[0];
  const homeTeam = game.competitors[0];
  const awayTeam = game.competitors[1];

  const toLocalTime = (date) => {
    const dateObj = new Date(date);
    const localTime = dateObj.toLocaleString();
    return localTime;
  };

  const getStatus = () => {
    if (game.status.type.state === "final") {
      updateStatus(game.status.type.shortDetail);
    }
    if (game.status.type.state === "post" || game.status.type.state === "pre") {
      updateStatus(game.status.type.shortDetail);
    } else {
      updateStatus(
        `${game.status.displayClock} left in the ${game.status.period}`
      );
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div>
      <div className="align-center my-4 flex flex-row justify-between rounded border-2 border-gray-200 px-2 py-2">
        <div className="w-4/5">
          <span className="ml-16 block text-center text-xs">
            {game.broadcasts[0] ? `On ${game.broadcasts[0].names}` : ""}
          </span>
          <div className="flex flex-row py-1 text-base">
            <img src={homeTeam.team.logo} className="mr-2 h-6 w-6" />
            <span>{homeTeam.team.name}</span>
            <span className="ml-auto mr-3">{homeTeam.score}</span>
          </div>
          <div className="flex flex-row py-1 text-base">
            <img src={awayTeam.team.logo} className="mr-2 h-6 w-6" />
            <span>{awayTeam.team.name}</span>
            <span className="ml-auto mr-3">{awayTeam.score}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-green-500 w-16 border-l pl-2 text-center text-base">
            <span className="text-xs">{computedStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

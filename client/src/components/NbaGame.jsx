import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

const Game = (props) => {
  const [computedStatus, updateStatus] = useState("");

  const game = props.competitions[0];
  const homeTeam = game.competitors[0];
  const awayTeam = game.competitors[1];

  console.log(game);
  const getStatus = () => {
    if (game.status.type.state === "final") {
      updateStatus(game.status.type.shortDetail);
    }
    if (game.status.type.state === "post") {
      updateStatus(game.status.type.shortDetail);
    }
    if (game.status.type.state === "pre") {
      updateStatus(dayjs(game.date).fromNow());
    } else {
      updateStatus(`${game.status.type.shortDetail.replace("-", "in the")}`);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div>
      <div className="align-center my-4 flex flex-row justify-between rounded border-2 border-gray-200 px-2 py-2">
        <div className="w-11/12">
          <div className="flex flex-row py-1 text-base">
            <img src={homeTeam.team.logo} className="mr-2 h-6 w-6" />
            <span>{homeTeam.team.name}</span>
            <span className="ml-auto block text-center text-xs">
              {game.broadcasts[0] ? `On ${game.broadcasts[0].names}` : ""}
            </span>
            <span className="ml-auto mr-4">{homeTeam.score}</span>
          </div>
          <div className="flex flex-row py-1 text-base">
            <img src={awayTeam.team.logo} className="mr-2 h-6 w-6" />
            <span>{awayTeam.team.name}</span>
            <span className="ml-auto mr-4">{awayTeam.score}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-green-500 w-16 border-l pl-2 text-center text-base">
            <p className="text-xs">{computedStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

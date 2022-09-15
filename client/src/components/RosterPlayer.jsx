import React from "react";

const RosterPlayer = (props) => {
  return (
    <li
      className="align-center flex justify-between border border-gray-200 px-3"
      key={props.playerName}
    >
      <img className="w-20" src={props.headshot} alt={props.playerName} />
      <div className="self-center text-right">
        <h3>{props.playerName}</h3>
        <p className="text-xs">{props.position}</p>
      </div>
    </li>
  );
};

export default RosterPlayer;

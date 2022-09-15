import React from "react";

const Leader = (props) => {
  return (
    <div>
      <h3>{props.statName}</h3>
      <p>{props.stat}</p>
      <h2>{props.name}</h2>
      <img className="m-auto" src={props.headshot} alt={props.name} />
    </div>
  );
};

export default Leader;

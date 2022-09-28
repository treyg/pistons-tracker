import React from "react";

const Leader = (props) => {
  return (
    <div className="mb-8">
      <h3 className="mb-6 text-lg font-semibold">{props.statName}</h3>
      <p className="mb-2 text-4xl font-semibold">{props.stat}</p>
      <h2>{props.name}</h2>
      <img
        className="m-auto w-2/3 border-b-2 border-gray-200 pb-3"
        src={props.headshot}
        alt={"Headshot of " + props.name}
      />
    </div>
  );
};

export default Leader;

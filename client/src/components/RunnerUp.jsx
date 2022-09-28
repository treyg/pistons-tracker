import React from "react";

const RunnerUp = (props) => {
  return (
    <div>
      <h4 className="font-semibold">{props.stat}</h4>
      <h5 className="text-sm">
        {props.name.split(" ")[0][0] + "." + props.name.split(" ")[1]}
      </h5>
      <img src={props.headshot} alt={props.name} />
    </div>
  );
};

export default RunnerUp;

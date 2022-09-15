import React from "react";

const RunnerUp = (props) => {
  return (
    <div>
      <h4 className="text-sm">
        {props.name.split(" ")[0][0] + "." + props.name.split(" ")[1]}
      </h4>
      <h5>{props.stat}</h5>
      <img src={props.headshot} alt={props.name} />
    </div>
  );
};

export default RunnerUp;

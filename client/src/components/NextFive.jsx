import React from "react";
//import StonsGame from "./StonsGame";

const NextFive = (props) => {
  console.log(props.nextFive);
  return (
    <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
      <h2 className="font-bold">Next Five Games</h2>
    </section>
  );
};

export default NextFive;

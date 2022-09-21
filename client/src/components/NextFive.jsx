import React from "react";
import StonsGame from "./StonsGame";

const NextFive = (props) => {
  const { nextFive } = props;

  const date = nextFive.date;
  //   const status = nextFive;
  //   const homeTeam = nextFive.competitions[0].competitors[0].team;
  //   const awayTeam = nextFive.competitions[0].competitors[1].team;

  return (
    <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
      <h2 className="font-bold">Next Five Games</h2>
    </section>
  );
};

export default NextFive;

import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import NbaGame from "./NbaGame";
import getLeagueGames from "../api/getLeagueGames";

const NbaGames = () => {
  //getLeagueGames is a function that calls the api
  const { data, isLoading, error } = useQuery(["nbaGames"], getLeagueGames);

  if (isLoading) return <Loader />;
  if (error) return <p>`An error has occurred: ${error.message}`</p>;
  if (data) {
    console.log(data);
    return (
      <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
        <h2 className="text-2xl font-bold">Games Today</h2>
        {data.events.map((game) => (
          <NbaGame key={game.id} {...game} />
        ))}
      </section>
    );
  } else {
    return (
      <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
        <h2 className="text-2xl font-bold">Upcoming Games</h2>
        <p className="mt-5">No games today</p>
      </section>
    );
  }
};

export default NbaGames;

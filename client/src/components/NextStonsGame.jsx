import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import getStonsData from "../api/getStonsData";
import StonsGame from "./StonsGame";

const NextStonsGame = () => {
  const { data, isLoading, error } = useQuery(["stonsData"], getStonsData);

  if (isLoading) return <Loader />;
  if (error) return <p>`An error has occurred: ${error.message}`</p>;
  if (data) {
    return (
      <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
        <StonsGame {...data} />
      </section>
    );
  }
};

export default NextStonsGame;

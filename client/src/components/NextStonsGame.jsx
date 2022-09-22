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
    const event = data.team;
    const date = event.nextEvent[0].date;
    const game = event.nextEvent[0];
    const homeTeam = event.nextEvent[0].competitions[0].competitors[0].team;
    const awayTeam = event.nextEvent[0].competitions[0].competitors[1].team;
    const broadcast =
      event.nextEvent[0].competitions[0].broadcasts[0].media.shortName;
    const liveStatus = game.competitions[0].status.type.state;
    return (
      <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
        <StonsGame
          homeLogo={homeTeam.logos[0].href}
          awayLogo={awayTeam.logos[0].href}
          homeName={homeTeam.name}
          awayName={awayTeam.name}
          homeShortName={homeTeam.shortDisplayName}
          awayShortname={awayTeam.shortDisplayName}
          venue={game.competitions[0].venue.fullName}
          liveStatus={liveStatus}
          broadcast={broadcast}
          date={date}
        />
      </section>
    );
  }
};

export default NextStonsGame;

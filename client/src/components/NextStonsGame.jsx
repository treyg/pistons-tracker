import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import getStonsData from "../api/getStonsData";
import getLeagueGames from "../api/getLeagueGames";
import StonsGame from "./StonsGame";

const NextStonsGame = () => {
  const { data, isLoading, error } = useQuery(["stonsData"], getStonsData);
  const {
    data: leagueData,
    isLoading: leagueLoading,
    error: leagueError,
  } = useQuery(["leagueGames"], getLeagueGames);

  if (isLoading || leagueLoading) return <Loader />;
  if (error || leagueError)
    return <p>`An error has occurred: ${error.message}`</p>;
  if (data && leagueData) {
    const liveStonsGame = leagueData.events.filter((game) =>
      game.shortName.includes("DET")
    );

    const event = data.team;
    const date = event.nextEvent[0].date;
    const game = event.nextEvent[0];
    const homeTeam = event.nextEvent[0].competitions[0].competitors[0].team;
    const awayTeam = event.nextEvent[0].competitions[0].competitors[1].team;
    const broadcast =
      event.nextEvent[0].competitions[0]?.broadcasts[0]?.media.shortName;
    const liveStatus = game.competitions[0].status.type.state;
    //const ticketLink =
    //event.nextEvent[0].competitions[0]?.tickets[0].links[0].href;
    return (
      <section className="mx-3 my-4 flex flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black">
        <StonsGame
          homeLogo={homeTeam.logos[0].href}
          awayLogo={awayTeam.logos[0].href}
          homeName={homeTeam.name}
          awayName={awayTeam.name}
          homeShortName={homeTeam.shortDisplayName}
          awayShortname={awayTeam.shortDisplayName}
          homeScore={liveStonsGame[0]?.competitions[0].competitors[0].score}
          awayScore={liveStonsGame[0]?.competitions[0].competitors[1].score}
          venue={game.competitions[0].venue.fullName}
          status={game.competitions[0].status.displayClock}
          period={game.competitions[0].status.period}
          shortDetail={game.competitions[0].status.type.shortDetail}
          liveStatus={liveStatus}
          broadcast={broadcast}
          //ticketLink={ticketLink}
          date={date}
        />
      </section>
    );
  }
};

export default NextStonsGame;

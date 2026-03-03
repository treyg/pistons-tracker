import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import getStonsData from "../api/getStonsData";
import getLeagueGames from "../api/getLeagueGames";
import StonsGame from "./StonsGame";

const fetchTeamRecord = async (teamId) => {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}`
  );
  const data = await response.json();
  return data.team?.record?.items?.find((r) => r.type === "total")?.summary ?? null;
};

const NextStonsGame = () => {
  const { data, isLoading, error } = useQuery(["stonsData"], getStonsData);
  const {
    data: leagueData,
    isLoading: leagueLoading,
    error: leagueError,
  } = useQuery(["leagueGames"], getLeagueGames);

  // Get opponent team ID from nextEvent to fetch their record
  const opponentId = data?.team?.nextEvent?.[0]?.competitions?.[0]?.competitors
    ?.find((c) => c.team.abbreviation !== "DET")?.id;

  const { data: opponentRecord } = useQuery(
    ["opponentRecord", opponentId],
    () => fetchTeamRecord(opponentId),
    { enabled: !!opponentId }
  );

  if (isLoading || leagueLoading) return <Loader />;
  if (error || leagueError)
    return <p>`An error has occurred: ${error.message}`</p>;
  if (data && leagueData) {
    const liveStonsGame = leagueData.events?.filter((game) =>
      game.shortName.includes("DET")
    ) ?? [];

    const event = data.team;
    const nextEvent = event?.nextEvent?.[0];
    if (!nextEvent) {
      return (
        <section className="mx-3 my-4 flex flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black">
          <p className="text-gray-500">No upcoming games scheduled.</p>
        </section>
      );
    }
    const competition = nextEvent.competitions[0];
    const date = nextEvent.date;
    const homeTeam = competition.competitors[0].team;
    const awayTeam = competition.competitors[1].team;
    const broadcast = competition?.broadcasts?.[0]?.media?.shortName;
    const liveStatus = competition.status.type.state;

    // Use live scoreboard data if available, otherwise fall back to team API data
    const liveGame = liveStonsGame[0];
    const homeScore = liveGame?.competitions[0]?.competitors[0]?.score
      ?? competition.competitors[0]?.score?.value
      ?? null;
    const awayScore = liveGame?.competitions[0]?.competitors[1]?.score
      ?? competition.competitors[1]?.score?.value
      ?? null;

    const pistonsRecord = data.team?.record?.items?.find(r => r.type === "total")?.summary ?? null;
    const isPistonsHome = homeTeam.abbreviation === "DET";
    const homeRecord = isPistonsHome ? pistonsRecord : (opponentRecord ?? null);
    const awayRecord = isPistonsHome ? (opponentRecord ?? null) : pistonsRecord;

    return (
      <section className="mx-3 my-4 flex flex-col rounded bg-white py-4 px-4 shadow-md dark:bg-stons-black">
        <StonsGame
          homeLogo={homeTeam.logos[0].href}
          awayLogo={awayTeam.logos[0].href}
          homeName={homeTeam.name}
          awayName={awayTeam.name}
          homeShortName={homeTeam.shortDisplayName}
          awayShortname={awayTeam.shortDisplayName}
          homeScore={homeScore}
          awayScore={awayScore}
          homeRecord={homeRecord}
          awayRecord={awayRecord}
          venue={competition.venue.fullName}
          status={competition.status.displayClock}
          period={competition.status.period}
          shortDetail={competition.status.type.shortDetail}
          liveStatus={liveStatus}
          broadcast={broadcast}
          date={date}
        />
      </section>
    );
  }
};

export default NextStonsGame;

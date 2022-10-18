import React from "react";

const LastFive = (props) => {
  const lastFive = props.lastFive;

  const checkWinner = (game) => {
    //check the name for both home and away team
    const homeTeam = game.home_team.name;
    const awayTeam = game.visitor_team.name;
    //check the score for both home and away team
    const homeScore = game.home_team_score;
    const awayScore = game.visitor_team_score;
    switch (true) {
      case homeScore > awayScore && homeTeam === "Pistons":
        return <p className="text-green">W</p>;
      case homeScore < awayScore && homeTeam === "Pistons":
        return <p className="text-red">L</p>;
      case homeScore < awayScore && awayTeam === "Pistons":
        return <p className="text-green">W</p>;
      case homeScore > awayScore && awayTeam === "Pistons":
        return <p className="text-red">L</p>;
    }
  };

  return (
    <section className="mx-3 my-4 flex flex-col rounded py-4 px-4 shadow-md">
      <h2 className="font-bold">Last Five Games</h2>

      <div className="mt-5">
        {lastFive.length === 0 ? (
          <span className="text-gray-500">Not enough games played yet</span>
        ) : (
          lastFive.map((event) => (
            <div key={event.id}>
              <div className="grid grid-flow-col grid-cols-3 items-center gap-4 border-b p-2">
                <div className="col-span-2">
                  <p
                    className={
                      event.home_team_score > event.visitor_team_score
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {event.home_team.name}
                  </p>
                  <p
                    className={
                      event.home_team_score < event.visitor_team_score
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {event.visitor_team.name}
                  </p>
                </div>
                <div className="scores justify-self-end border-r pr-4">
                  <p
                    className={
                      event.home_team_score > event.visitor_team_score
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {event.home_team_score}
                  </p>
                  <p
                    className={
                      event.home_team_score < event.visitor_team_score
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {event.visitor_team_score}
                  </p>
                </div>
                <div className="w-4">{checkWinner(event)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default LastFive;

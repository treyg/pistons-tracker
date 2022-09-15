import React from "react";
import dayjs from "dayjs";
const StonsGame = (props) => {
  const event = props.team;
  const date = event.nextEvent[0].date;
  const status = event.nextEvent[0];
  const homeTeam = event.nextEvent[0].competitions[0].competitors[0].team;
  const awayTeam = event.nextEvent[0].competitions[0].competitors[1].team;
  return (
    <section>
      <h2 className="font-bold">
        {dayjs(date).format("dddd MMM D")} at {dayjs(date).format("h:mm A")}
      </h2>
      <div className="grid grid-cols-4 gap-x-7">
        <div className="flex flex-col items-center">
          <img
            style={{ maxWidth: "5rem" }}
            src={homeTeam.logos[0].href}
            alt={homeTeam.name}
          />
          <p>{homeTeam.shortDisplayName}</p>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-2 self-center text-center">
          <p className="text-sm">{status.competitions[0].venue.fullName}</p>
          <a
            className="hover:bg-green-600 cursor-pointer rounded border bg-green p-2 text-base text-white"
            href=""
          >
            Get Tickets
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            style={{ maxWidth: "5rem" }}
            src={awayTeam.logos[0].href}
            alt={awayTeam.name}
          />
          <p>{awayTeam.shortDisplayName}</p>
        </div>
      </div>
    </section>
  );
};

export default StonsGame;

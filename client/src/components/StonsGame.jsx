import React from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);
const StonsGame = (props) => {
  const checkIfToday = () => {
    const formattedToday = dayjs(new Date().toDateString()).format(
      "YYYY-MM-DD"
    );
    const formattedGameDate = dayjs(props.date).format("YYYY-MM-DD");
    switch (true) {
      case props.liveStatus === "in":
        return <span className="font-semibold text-green">LIVE</span>;
      case props.liveStatus === "post":
        return "Final";
      case formattedGameDate === formattedToday && props.status !== "in":
        return `Today, at ${dayjs(props.date).format("h:mm A")}`;
      default:
        return `${dayjs(props.date).format("dddd MMM D")} at
        ${dayjs(props.date).format("h:mm A")}`;
    }
  };

  return (
    <section>
      <h2 className="mb-3 font-bold">{checkIfToday()}</h2>
      <div className="grid grid-cols-4 gap-x-7">
        <div className="flex flex-col items-center">
          <img
            style={{ maxWidth: "5rem" }}
            src={props.homeLogo}
            alt={props.homeName}
          />
          <p>{props.homeShortName}</p>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-1 self-center text-center">
          <p>{props.broadcast ? props.broadcast : ""}</p>
          {props.liveStatus !== "in" ? (
            <>
              <p className="text-sm">{props.venue}</p>
              <div className="status-center mt-4">
                <a
                  className="hover:bg-green-600 cursor-pointer rounded bg-green p-2 text-base text-white"
                  href={props?.ticketLink}
                >
                  Get Tickets
                </a>
              </div>
            </>
          ) : (
            <>
              <div id="liveTimeLeft" className="flex flex-col items-center">
                <p className="text-md flex flex-row">{props.shortDetail}</p>
              </div>
              <section className="flex gap-20">
                <p className="text-3xl">{props.homeScore}</p>
                <p className="text-3xl">{props.awayScore}</p>
              </section>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          <img
            style={{ maxWidth: "5rem" }}
            src={props.awayLogo}
            alt={props.awayTeam}
          />
          <p>{props.awayShortname}</p>
        </div>
      </div>
    </section>
  );
};

export default StonsGame;
